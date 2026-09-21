import React, { useState } from 'react';
import { 
  Home, 
  Map, 
  AlertOctagon, 
  History, 
  Menu, 
  Users, 
  Bot, 
  BarChart3, 
  FileHeart, 
  X,
  Radio
} from 'lucide-react';
import { useEmergency } from '../../context/EmergencyContext';
import { ActiveTab } from '../../types';
import { soundManager } from '../../utils/audio';

export const MobileNav: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    isEmergencyActive, 
    setEmergencyModalOpen 
  } = useEmergency();

  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const handleTab = (tab: ActiveTab) => {
    soundManager.playClick();
    setActiveTab(tab);
    setShowMoreMenu(false);
  };

  return (
    <>
      {showMoreMenu && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col justify-end animate-fadeIn">
          <div className="bg-[#0B101B] border-t border-white/10 rounded-t-3xl p-6 space-y-4 max-h-[70vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="font-display font-bold text-base text-white flex items-center gap-2">
                <Radio className="w-4 h-4 text-cyan" /> Additional Operations
              </span>
              <button 
                onClick={() => setShowMoreMenu(false)}
                className="p-1 rounded-full bg-white/5 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleTab('contacts')}
                className="flex items-center gap-3 p-3.5 rounded-xl bg-surface-100/70 border border-white/5 text-slate-200 hover:border-cyan/30 text-xs font-medium"
              >
                <Users className="w-4 h-4 text-cyan" /> Trusted Contacts
              </button>
              <button
                onClick={() => handleTab('ai')}
                className="flex items-center gap-3 p-3.5 rounded-xl bg-surface-100/70 border border-white/5 text-slate-200 hover:border-purple-400/30 text-xs font-medium"
              >
                <Bot className="w-4 h-4 text-purple-400" /> AI Assistant
              </button>
              <button
                onClick={() => handleTab('analytics')}
                className="flex items-center gap-3 p-3.5 rounded-xl bg-surface-100/70 border border-white/5 text-slate-200 hover:border-cyan/30 text-xs font-medium"
              >
                <BarChart3 className="w-4 h-4 text-emerald-400" /> Analytics
              </button>
              <button
                onClick={() => handleTab('profile')}
                className="flex items-center gap-3 p-3.5 rounded-xl bg-surface-100/70 border border-white/5 text-slate-200 hover:border-cyan/30 text-xs font-medium"
              >
                <FileHeart className="w-4 h-4 text-rose-400" /> Medical Profile
              </button>
            </div>
          </div>
        </div>
      )}

      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#06080C]/95 backdrop-blur-2xl border-t border-white/[0.08] px-3 py-2 flex items-center justify-around">
        <button
          onClick={() => handleTab('overview')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg transition-colors ${
            activeTab === 'overview' ? 'text-cyan font-semibold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] tracking-wide font-display">Home</span>
        </button>

        <button
          onClick={() => handleTab('map')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg transition-colors ${
            activeTab === 'map' ? 'text-cyan font-semibold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Map className="w-5 h-5" />
          <span className="text-[10px] tracking-wide font-display">Map</span>
        </button>

        <div className="relative -top-4">
          <button
            onClick={() => {
              soundManager.playEmergencyAlert();
              setEmergencyModalOpen(true);
            }}
            className={`w-14 h-14 rounded-full flex flex-col items-center justify-center text-white shadow-2xl transition-transform active:scale-95 border-2 ${
              isEmergencyActive
                ? 'bg-alert border-white animate-bounce shadow-glow-alert-lg'
                : 'bg-gradient-to-tr from-red-700 via-red-600 to-red-500 border-red-400 shadow-glow-alert'
            }`}
            title="Trigger Emergency Protocol"
          >
            <AlertOctagon className="w-6 h-6 animate-pulse" />
            <span className="text-[9px] font-black uppercase tracking-tighter mt-0.5">SOS</span>
          </button>
        </div>

        <button
          onClick={() => handleTab('incidents')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg transition-colors ${
            activeTab === 'incidents' ? 'text-cyan font-semibold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <History className="w-5 h-5" />
          <span className="text-[10px] tracking-wide font-display">Incidents</span>
        </button>

        <button
          onClick={() => {
            soundManager.playClick();
            setShowMoreMenu(true);
          }}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg transition-colors ${
            ['contacts', 'ai', 'analytics', 'profile'].includes(activeTab) 
              ? 'text-cyan font-semibold' 
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Menu className="w-5 h-5" />
          <span className="text-[10px] tracking-wide font-display">More</span>
        </button>
      </nav>
    </>
  );
};
