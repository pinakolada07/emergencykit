import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Bell, 
  Volume2, 
  VolumeX, 
  Radio, 
  MapPin, 
  CheckCircle2, 
  AlertTriangle, 
  Play, 
  Sparkles,
  Trash2,
  Clock
} from 'lucide-react';
import { useEmergency } from '../../context/EmergencyContext';
import { soundManager } from '../../utils/audio';

export const TopBar: React.FC = () => {
  const { 
    isEmergencyActive, 
    setCommandPaletteOpen, 
    notifications, 
    markNotificationRead, 
    clearNotifications,
    soundEnabled, 
    toggleSound,
    profile,
    setActiveTab,
    runShowcaseScenario,
    isDemoRunning,
    demoStepMessage,
    timeElapsed
  } = useEmergency();

  const [currentTime, setCurrentTime] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-30 w-full h-16 bg-[#06080C]/90 backdrop-blur-xl border-b border-white/[0.08] px-4 lg:px-6 flex items-center justify-between gap-3">
      <div className="flex items-center gap-3 lg:gap-6 min-w-0">
        <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-300 bg-surface-100/60 border border-white/[0.06] px-3 py-1.5 rounded-lg">
          <Clock className="w-3.5 h-3.5 text-cyan" />
          <span className="font-semibold text-white tracking-wider">{currentTime}</span>
          <span className="text-[10px] text-slate-400">LOC</span>
        </div>

        <div 
          onClick={() => {
            soundManager.playClick();
            setActiveTab('map');
          }}
          className="hidden md:flex items-center gap-2 text-xs text-slate-300 hover:text-white bg-surface-100/60 hover:bg-surface-50 border border-white/[0.06] hover:border-cyan/30 px-3 py-1.5 rounded-lg cursor-pointer transition-all"
          title="Click to view on tactical map"
        >
          <MapPin className="w-3.5 h-3.5 text-cyan animate-pulse" />
          <span className="truncate max-w-[180px]">Mumbai Metro • 19.0760° N</span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan/10 text-cyan border border-cyan/20">
            ±3m
          </span>
        </div>

        <div>
          {isEmergencyActive ? (
            <div 
              onClick={() => setActiveTab('emergency')}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-950/80 border border-alert text-alert animate-alert-flash cursor-pointer shadow-glow-alert text-xs font-display font-bold tracking-wider"
            >
              <span className="w-2 h-2 rounded-full bg-alert animate-ping" />
              <span>EMERGENCY ACTIVE ({timeElapsed}s)</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/40 border border-safe/30 text-emerald-400 text-xs font-display font-medium tracking-wider">
              <span className="w-2 h-2 rounded-full bg-safe" />
              <span className="hidden sm:inline">YOU ARE SAFE</span>
              <span className="text-[10px] font-mono text-emerald-500/80 hidden lg:inline">• SHIELD 100%</span>
            </div>
          )}
        </div>
      </div>

      {isDemoRunning && (
        <div className="hidden xl:flex items-center gap-2 px-4 py-1 rounded-full bg-purple-950/70 border border-purple-500/40 text-purple-300 text-xs font-mono animate-pulse">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>{demoStepMessage || 'Live Evaluation Scenario Active...'}</span>
        </div>
      )}

      <div className="flex items-center gap-2 sm:gap-3">
        <button
          onClick={runShowcaseScenario}
          disabled={isDemoRunning}
          className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-600/30 to-cyan/20 hover:from-purple-600/50 hover:to-cyan/30 border border-purple-500/40 text-purple-200 text-xs font-medium transition-all shadow-sm group"
          title="Run guided showcase scenario for judges"
        >
          <Play className="w-3 h-3 fill-purple-400 text-purple-400 group-hover:scale-110 transition-transform" />
          <span>Judges Demo</span>
        </button>

        <button
          onClick={() => {
            soundManager.playClick();
            setCommandPaletteOpen(true);
          }}
          className="flex items-center gap-2 bg-surface-100/80 hover:bg-surface-50 border border-white/[0.08] hover:border-cyan/40 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-white transition-all shadow-sm"
          title="Open Command Palette"
        >
          <Search className="w-3.5 h-3.5 text-cyan" />
          <span className="hidden md:inline">Command...</span>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-white/[0.06] border border-white/[0.1] text-[10px] font-mono text-slate-300">
            {isMac ? '⌘K' : 'Ctrl+K'}
          </kbd>
        </button>

        <button
          onClick={toggleSound}
          className={`p-2 rounded-lg border transition-all ${
            soundEnabled 
              ? 'bg-surface-100/60 border-white/[0.06] text-slate-300 hover:text-cyan' 
              : 'bg-red-950/30 border-red-500/20 text-red-400'
          }`}
          title={soundEnabled ? 'Mute Mission Audio' : 'Unmute Mission Audio'}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>

        <div className="relative">
          <button
            onClick={() => {
              soundManager.playClick();
              setShowNotifications(!showNotifications);
            }}
            className="relative p-2 rounded-lg bg-surface-100/60 hover:bg-surface-50 border border-white/[0.06] hover:border-white/20 text-slate-300 hover:text-white transition-all"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-alert text-[9px] font-bold text-white shadow-glow-alert animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 sm:w-96 rounded-2xl bg-[#0B101B]/95 backdrop-blur-2xl border border-white/15 shadow-2xl p-4 z-50 animate-fadeIn">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
                <div className="flex items-center gap-2">
                  <Radio className="w-4 h-4 text-cyan" />
                  <span className="font-display font-semibold text-sm text-white">
                    Mission Broadcasts
                  </span>
                  {unreadCount > 0 && (
                    <span className="px-1.5 py-0.2 rounded-full bg-cyan/20 text-cyan text-[10px] font-mono">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                {notifications.length > 0 && (
                  <button
                    onClick={() => {
                      clearNotifications();
                      soundManager.playClick();
                    }}
                    className="text-[11px] text-slate-400 hover:text-red-400 transition-colors flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" /> Clear
                  </button>
                )}
              </div>

              <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                {notifications.length === 0 ? (
                  <div className="text-center py-8 text-xs text-slate-500 font-mono">
                    No active notifications. System telemetry all quiet.
                  </div>
                ) : (
                  notifications.map(item => (
                    <div
                      key={item.id}
                      onClick={() => {
                        markNotificationRead(item.id);
                        if (item.linkPage) {
                          setActiveTab(item.linkPage as any);
                          setShowNotifications(false);
                        }
                      }}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        item.read 
                          ? 'bg-surface-100/40 border-white/[0.04] opacity-75' 
                          : 'bg-surface-100/90 border-cyan/20 shadow-sm'
                      } hover:border-cyan/40`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <span className="font-display font-medium text-xs text-white flex items-center gap-1.5">
                          {item.type === 'alert' && <AlertTriangle className="w-3.5 h-3.5 text-alert" />}
                          {item.type === 'success' && <CheckCircle2 className="w-3.5 h-3.5 text-safe" />}
                          {item.title}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 whitespace-nowrap">
                          {item.timestamp}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {item.message}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <div
          onClick={() => {
            soundManager.playClick();
            setActiveTab('profile');
          }}
          className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-full bg-surface-100/60 hover:bg-surface-50 border border-white/[0.08] hover:border-cyan/40 cursor-pointer transition-all"
          title="Emergency Profile & Medical ID"
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-dark to-cyan flex items-center justify-center text-xs font-bold text-black shadow-glow-cyan-sm">
            {profile.name.charAt(0)}
          </div>
          <div className="hidden sm:block text-left">
            <div className="text-xs font-semibold text-white leading-none">{profile.name}</div>
            <div className="text-[10px] font-mono text-cyan tracking-wider leading-none mt-1">{profile.callSign}</div>
          </div>
        </div>
      </div>
    </header>
  );
};
