import React, { useState, useEffect } from 'react';
import { Phone, PhoneOff, Mic, MicOff, Volume2, ShieldCheck } from 'lucide-react';
import { useEmergency } from '../../context/EmergencyContext';
import { soundManager } from '../../utils/audio';

export const CallSimulationModal: React.FC = () => {
  const { showCallModal, activeCallContact, closeCallModal } = useEmergency();
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [callState, setCallState] = useState<'connecting' | 'connected'>('connecting');

  useEffect(() => {
    let timer: any;
    if (showCallModal) {
      setCallDuration(0);
      setCallState('connecting');
      const connectTimeout = setTimeout(() => {
        setCallState('connected');
        soundManager.playSonar();
      }, 2000);

      timer = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);

      return () => {
        clearTimeout(connectTimeout);
        clearInterval(timer);
      };
    }
  }, [showCallModal]);

  if (!showCallModal || !activeCallContact) return null;

  const formatDuration = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-sm rounded-3xl bg-[#0B101B] border border-cyan/30 shadow-2xl p-6 text-center overflow-hidden">
        <div className="absolute -top-20 -left-20 w-48 h-48 bg-cyan/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center justify-center gap-1.5 text-[11px] font-mono tracking-widest text-cyan uppercase mb-4">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>LifeLine Encrypted Satellite Link</span>
        </div>

        <div className="relative mx-auto w-24 h-24 mb-4">
          <img
            src={activeCallContact.avatar}
            alt={activeCallContact.name}
            className="w-full h-full rounded-full object-cover border-2 border-cyan/40 shadow-glow-cyan-sm"
          />
          {callState === 'connected' && (
            <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-safe border-2 border-[#0B101B] animate-pulse" />
          )}
        </div>

        <h3 className="text-xl font-display font-bold text-white mb-1">
          {activeCallContact.name}
        </h3>
        <p className="text-xs text-slate-400 mb-2">
          {activeCallContact.relationship} • {activeCallContact.phone}
        </p>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-50 border border-white/10 text-xs font-mono mb-6">
          {callState === 'connecting' ? (
            <span className="flex items-center gap-2 text-amber-400">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              Routing Emergency Satellite Line...
            </span>
          ) : (
            <span className="flex items-center gap-2 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Connected • {formatDuration(callDuration)}
            </span>
          )}
        </div>

        {callState === 'connected' && (
          <div className="flex items-center justify-center gap-1.5 h-10 mb-6 px-4">
            {[40, 70, 90, 60, 100, 75, 45, 85, 95, 60, 80, 40].map((h, i) => (
              <div
                key={i}
                className="w-1 bg-cyan rounded-full animate-pulse"
                style={{
                  height: `${Math.max(20, (h * ((i % 3) + 1)) % 100)}%`,
                  animationDuration: `${0.6 + (i % 4) * 0.2}s`,
                }}
              />
            ))}
          </div>
        )}

        <div className="text-[10px] text-slate-500 font-mono mb-6 uppercase tracking-wider">
          Simulation Mode — Simulated Voice Channel
        </div>

        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`p-3.5 rounded-full border transition-colors ${
              isMuted
                ? 'bg-amber-500/20 border-amber-500/40 text-amber-400'
                : 'bg-surface-50 border-white/10 text-slate-300 hover:text-white hover:border-white/20'
            }`}
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              closeCallModal();
            }}
            className="p-4 rounded-full bg-red-600 hover:bg-red-500 text-white shadow-glow-alert transition-all hover:scale-105"
            title="End Call"
          >
            <PhoneOff className="w-6 h-6" />
          </button>

          <button
            onClick={() => soundManager.playClick()}
            className="p-3.5 rounded-full bg-surface-50 border border-white/10 text-slate-300 hover:text-white hover:border-white/20 transition-colors"
            title="Speaker Active"
          >
            <Volume2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
