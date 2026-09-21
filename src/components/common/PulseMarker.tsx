import React from 'react';

interface PulseMarkerProps {
  color?: 'cyan' | 'alert' | 'safe' | 'warning';
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  className?: string;
}

export const PulseMarker: React.FC<PulseMarkerProps> = ({
  color = 'cyan',
  size = 'md',
  label,
  className = '',
}) => {
  const colorMap = {
    cyan: {
      core: 'bg-cyan',
      glow: 'bg-cyan/40',
      border: 'border-cyan',
    },
    alert: {
      core: 'bg-alert',
      glow: 'bg-alert/40',
      border: 'border-alert',
    },
    safe: {
      core: 'bg-safe',
      glow: 'bg-safe/40',
      border: 'border-safe',
    },
    warning: {
      core: 'bg-warning',
      glow: 'bg-warning/40',
      border: 'border-warning',
    }
  };

  const sizeMap = {
    sm: { core: 'w-2 h-2', ring: 'w-6 h-6' },
    md: { core: 'w-3.5 h-3.5', ring: 'w-10 h-10' },
    lg: { core: 'w-5 h-5', ring: 'w-16 h-16' },
  };

  const c = colorMap[color];
  const s = sizeMap[size];

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <span
        className={`absolute rounded-full animate-beacon ${c.glow} ${s.ring}`}
      />
      <span
        className={`absolute rounded-full animate-ping opacity-60 ${c.glow} ${s.ring}`}
        style={{ animationDuration: '2.5s' }}
      />
      <span
        className={`relative z-10 rounded-full shadow-lg border-2 border-white/80 ${c.core} ${s.core}`}
      />
      {label && (
        <span className="ml-3 text-xs font-mono font-medium text-slate-300">
          {label}
        </span>
      )}
    </div>
  );
};
