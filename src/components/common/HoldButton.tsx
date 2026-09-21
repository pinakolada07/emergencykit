import React, { useState, useRef, useEffect } from 'react';
import { soundManager } from '../../utils/audio';

interface HoldButtonProps {
  onComplete: () => void;
  holdDurationMs?: number;
  label?: string;
  sublabel?: string;
  className?: string;
}

export const HoldButton: React.FC<HoldButtonProps> = ({
  onComplete,
  holdDurationMs = 2000,
  label = 'HOLD FOR 2 SECONDS TO ACTIVATE',
  sublabel = 'Press and keep holding to trigger emergency protocol',
  className = '',
}) => {
  const [isHolding, setIsHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const requestRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const startHold = () => {
    setIsHolding(true);
    startTimeRef.current = Date.now();
    soundManager.playClick();
  };

  const cancelHold = () => {
    setIsHolding(false);
    setProgress(0);
    startTimeRef.current = null;
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
      requestRef.current = null;
    }
  };

  useEffect(() => {
    if (!isHolding) return;

    const tick = () => {
      if (!startTimeRef.current) return;
      const elapsed = Date.now() - startTimeRef.current;
      const percentage = Math.min((elapsed / holdDurationMs) * 100, 100);
      setProgress(percentage);

      if (percentage >= 100) {
        setIsHolding(false);
        setProgress(100);
        soundManager.playEmergencyAlert();
        onComplete();
      } else {
        requestRef.current = requestAnimationFrame(tick);
      }
    };

    requestRef.current = requestAnimationFrame(tick);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isHolding, holdDurationMs, onComplete]);

  return (
    <div className={`relative select-none ${className}`}>
      <button
        type="button"
        onMouseDown={startHold}
        onMouseUp={cancelHold}
        onMouseLeave={cancelHold}
        onTouchStart={startHold}
        onTouchEnd={cancelHold}
        onTouchCancel={cancelHold}
        className={`w-full relative overflow-hidden py-4 px-6 rounded-xl font-display font-bold text-white text-base tracking-wider transition-all duration-300 border ${
          isHolding
            ? 'border-alert bg-red-950/80 scale-[0.99] shadow-glow-alert-lg'
            : 'border-alert/50 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 shadow-glow-alert'
        }`}
      >
        <div
          className="absolute inset-0 bg-red-500 transition-all duration-75 ease-linear pointer-events-none"
          style={{ width: `${progress}%`, opacity: 0.85 }}
        />

        <div className="relative z-10 flex flex-col items-center justify-center gap-1 text-center">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
            <span className="uppercase">{isHolding ? `HOLDING... ${Math.round(progress)}%` : label}</span>
          </div>
          {sublabel && (
            <span className="text-[11px] font-sans font-normal text-red-100/80 tracking-normal">
              {sublabel}
            </span>
          )}
        </div>
      </button>

      {isHolding && (
        <div className="absolute -bottom-2 left-0 right-0 h-1 bg-red-950/60 rounded-full overflow-hidden">
          <div
            className="h-full bg-cyan transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
};
