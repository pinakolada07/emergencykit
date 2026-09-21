import React from 'react';
import { 
  LayoutDashboard, 
  AlertOctagon, 
  Map, 
  Users, 
  History, 
  Bot, 
  BarChart3, 
  FileHeart, 
  Radio, 
  Activity,
  Compass,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { useEmergency } from '../../context/EmergencyContext';
import { ActiveTab } from '../../types';
import { soundManager } from '../../utils/audio';

export const Sidebar: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    isEmergencyActive, 
    profile, 
    setEmergencyModalOpen,
    setLandingMode
  } = useEmergency();

  const navItems: { id: ActiveTab; num: string; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'overview', num: '01', label: 'Overview', icon: LayoutDashboard },
    { id: 'emergency', num: '02', label: 'Emergency', icon: AlertOctagon },
    { id: 'map', num: '03', label: 'Live Map', icon: Map },
    { id: 'contacts', num: '04', label: 'Trusted Contacts', icon: Users },
    { id: 'incidents', num: '05', label: 'Incidents', icon: History },
    { id: 'ai', num: '06', label: 'AI Assistant', icon: Bot },
    { id: 'analytics', num: '07', label: 'Analytics', icon: BarChart3 },
    { id: 'profile', num: '08', label: 'Profile & Medical', icon: FileHeart },
  ];

  const handleNavClick = (tab: ActiveTab) => {
    soundManager.playClick();
    setActiveTab(tab);
  };

  return (
    <aside className="hidden lg:flex flex-col w-64 xl:w-72 h-screen bg-[#070B12] border-r border-white/[0.08] select-none shrink-0 sticky top-0 z-40">
      <div className="p-6 border-b border-white/[0.08] flex items-center justify-between">
        <div 
          onClick={() => {
            soundManager.playClick();
            setActiveTab('overview');
          }}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan/20 to-blue-600/20 border border-cyan/40 shadow-glow-cyan-sm group-hover:border-cyan transition-colors">
            <Radio className="w-5 h-5 text-cyan animate-pulse" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan animate-ping" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-black text-xl tracking-wider text-white">
                LIFELINE
              </span>
              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-cyan/15 text-cyan border border-cyan/30">
                PRO
              </span>
            </div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
              Command Center
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        <button
          type="button"
          onClick={() => {
            soundManager.playEmergencyAlert();
            setEmergencyModalOpen(true);
          }}
          className={`w-full relative overflow-hidden py-3 px-4 rounded-xl font-display font-bold text-xs tracking-widest uppercase transition-all flex items-center justify-center gap-2 border ${
            isEmergencyActive
              ? 'bg-alert text-white border-red-400 shadow-glow-alert animate-alert-flash'
              : 'bg-red-950/50 hover:bg-red-900/60 text-red-300 border-red-600/50 hover:border-red-500 shadow-sm'
          }`}
        >
          <AlertOctagon className="w-4 h-4 text-white animate-bounce" />
          <span>{isEmergencyActive ? '🚨 SOS ACTIVE' : '⚡ TRIGGER SOS'}</span>
        </button>
      </div>

      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500 px-3 py-2">
          Operations Deck
        </div>
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          const isEmergencyItem = item.id === 'emergency';

          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                isActive
                  ? isEmergencyItem
                    ? 'bg-red-950/60 text-alert border border-alert/40 shadow-glow-alert font-semibold'
                    : 'bg-gradient-to-r from-cyan/15 to-transparent text-cyan border-l-2 border-cyan border-y border-r border-white/[0.04] font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-surface-100/50 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] text-slate-400 group-hover:text-slate-400">
                  {item.num}
                </span>
                <Icon
                  className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                    isActive ? (isEmergencyItem ? 'text-alert' : 'text-cyan') : 'text-slate-400'
                  }`}
                />
                <span className="tracking-wide">{item.label}</span>
              </div>
              {isActive ? (
                <div className={`w-1.5 h-1.5 rounded-full ${isEmergencyItem ? 'bg-alert' : 'bg-cyan'}`} />
              ) : (
                <ChevronRight className="w-3.5 h-3.5 text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
            </button>
          );
        })}

        <button
          onClick={() => {
            soundManager.playClick();
            setLandingMode(true);
          }}
          className="w-full mt-4 flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs text-slate-400 hover:text-cyan hover:bg-surface-100/40 border border-dashed border-white/10 transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          <span>Product Overview / Vision</span>
        </button>
      </nav>

      <div className="p-4 border-t border-white/[0.08] bg-[#05080E] space-y-3">
        <div className="p-3 rounded-xl bg-surface-100/50 border border-white/[0.06] space-y-2">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Activity className="w-3 h-3 text-safe" /> System State
            </span>
            <span className="font-mono text-emerald-400 text-[10px] font-semibold">
              OPERATIONAL
            </span>
          </div>

          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Compass className="w-3 h-3 text-cyan" /> GPS Satellite
            </span>
            <span className="font-mono text-cyan text-[10px]">
              LOCK (9 SATS)
            </span>
          </div>
        </div>

        <div 
          onClick={() => handleNavClick('profile')}
          className="flex items-center gap-3 p-2 rounded-xl hover:bg-surface-100/50 cursor-pointer transition-colors"
        >
          <div className="relative">
            <div className="w-9 h-9 rounded-xl bg-slate-800 border border-white/15 flex items-center justify-center font-bold text-sm text-cyan">
              {profile.name.charAt(0)}
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-safe border-2 border-[#070B12]" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold text-white truncate">{profile.name}</div>
            <div className="text-[10px] font-mono text-slate-400">
              Blood {profile.bloodType.split(' ')[0]} • Readiness {profile.emergencyReadiness.score}%
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
