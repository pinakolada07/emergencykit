import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  AlertOctagon, 
  MapPin, 
  Cross, 
  Users, 
  Map, 
  FileText, 
  Bot, 
  History, 
  Settings, 
  X,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useEmergency } from '../../context/EmergencyContext';
import { soundManager } from '../../utils/audio';

interface CommandItem {
  id: string;
  title: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
  shortcut?: string;
  isEmergency?: boolean;
}

export const CommandPalette: React.FC = () => {
  const { 
    commandPaletteOpen, 
    setCommandPaletteOpen, 
    setActiveTab, 
    setEmergencyModalOpen,
    setSelectedFacility,
    facilities,
    contacts,
    alertContact,
    addNotification,
    runShowcaseScenario
  } = useEmergency();

  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        soundManager.playClick();
        setCommandPaletteOpen(!commandPaletteOpen);
      } else if (e.key === 'Escape' && commandPaletteOpen) {
        setCommandPaletteOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [commandPaletteOpen, setCommandPaletteOpen]);

  useEffect(() => {
    if (commandPaletteOpen) {
      setSearch('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [commandPaletteOpen]);

  const commands: CommandItem[] = [
    {
      id: 'cmd-emergency',
      title: 'Activate Emergency Mode',
      category: 'Immediate Action',
      icon: AlertOctagon,
      action: () => {
        setEmergencyModalOpen(true);
      },
      shortcut: 'SOS',
      isEmergency: true,
    },
    {
      id: 'cmd-share-loc',
      title: 'Share My Location',
      category: 'Telemetry',
      icon: MapPin,
      action: () => {
        addNotification('Location Shared', 'Encrypted GPS coordinates shared with primary contacts.', 'info', 'map');
        setActiveTab('map');
      },
      shortcut: 'LOC',
    },
    {
      id: 'cmd-find-hospital',
      title: 'Find Nearby Hospital',
      category: 'Rescue',
      icon: Cross,
      action: () => {
        const hospital = facilities.find(f => f.type === 'hospital') || facilities[0];
        setSelectedFacility(hospital);
        setActiveTab('map');
      },
      shortcut: 'MED',
    },
    {
      id: 'cmd-alert-contact',
      title: 'Alert Trusted Contact',
      category: 'Communications',
      icon: Users,
      action: () => {
        if (contacts.length > 0) {
          alertContact(contacts[0].id);
        }
        setActiveTab('contacts');
      },
      shortcut: 'ICE',
    },
    {
      id: 'cmd-open-map',
      title: 'Open Live Tactical Map',
      category: 'Navigation',
      icon: Map,
      action: () => {
        setActiveTab('map');
      },
      shortcut: 'MAP',
    },
    {
      id: 'cmd-ask-ai',
      title: 'Ask AI Emergency Assistant',
      category: 'Intelligence',
      icon: Bot,
      action: () => {
        setActiveTab('ai');
      },
      shortcut: 'AI',
    },
    {
      id: 'cmd-incident-history',
      title: 'View Incident History & Timeline',
      category: 'Operations',
      icon: History,
      action: () => {
        setActiveTab('incidents');
      },
      shortcut: 'HIST',
    },
    {
      id: 'cmd-report-incident',
      title: 'Start Incident Report',
      category: 'Operations',
      icon: FileText,
      action: () => {
        setActiveTab('ai');
      },
      shortcut: 'LOG',
    },
    {
      id: 'cmd-settings',
      title: 'Open Settings & Medical ID',
      category: 'System',
      icon: Settings,
      action: () => {
        setActiveTab('profile');
      },
      shortcut: 'SET',
    },
    {
      id: 'cmd-demo',
      title: 'Run Showcase Evaluation Scenario',
      category: 'Demo',
      icon: Sparkles,
      action: () => {
        runShowcaseScenario();
      },
      shortcut: 'DEMO',
    },
  ];

  const filtered = commands.filter(cmd => 
    cmd.title.toLowerCase().includes(search.toLowerCase()) ||
    cmd.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleKeyInList = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % (filtered.length || 1));
      soundManager.playClick();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filtered.length) % (filtered.length || 1));
      soundManager.playClick();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        executeCommand(filtered[selectedIndex]);
      }
    }
  };

  const executeCommand = (cmd: CommandItem) => {
    soundManager.playClick();
    setCommandPaletteOpen(false);
    cmd.action();
  };

  if (!commandPaletteOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={() => setCommandPaletteOpen(false)}
    >
      <div 
        className="w-full max-w-xl rounded-2xl bg-[#0B101B]/95 backdrop-blur-2xl border border-white/15 shadow-2xl overflow-hidden animate-scaleUp"
        onClick={e => e.stopPropagation()}
        onKeyDown={handleKeyInList}
      >
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10 bg-surface-100/40">
          <Search className="w-5 h-5 text-cyan shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="What do you need? (e.g., Hospital, Alert, SOS...)"
            value={search}
            onChange={e => {
              setSearch(e.target.value);
              setSelectedIndex(0);
            }}
            className="w-full bg-transparent border-none text-white placeholder-slate-400 text-sm focus:outline-none font-sans"
          />
          {search && (
            <button 
              onClick={() => setSearch('')}
              className="p-1 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-slate-400">
            ESC
          </kbd>
        </div>

        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="text-center py-10 text-xs text-slate-500 font-mono">
              No matching command found. Try searching "hospital", "alert", or "SOS".
            </div>
          ) : (
            filtered.map((cmd, idx) => {
              const Icon = cmd.icon;
              const isSelected = idx === selectedIndex;

              return (
                <div
                  key={cmd.id}
                  onClick={() => executeCommand(cmd)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl cursor-pointer text-xs transition-all ${
                    isSelected
                      ? cmd.isEmergency
                        ? 'bg-red-950/80 text-alert border border-alert/50 shadow-glow-alert'
                        : 'bg-surface-50 text-cyan border border-cyan/30'
                      : 'text-slate-300 hover:bg-white/[0.04] border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-1.5 rounded-lg ${
                      cmd.isEmergency ? 'bg-red-500/20 text-alert' : 'bg-surface-100 text-slate-300'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-medium text-white tracking-wide">
                        {cmd.title}
                      </div>
                      <div className="text-[10px] font-mono text-slate-400">
                        {cmd.category}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {cmd.shortcut && (
                      <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-slate-400 border border-white/10">
                        {cmd.shortcut}
                      </span>
                    )}
                    {isSelected && (
                      <ArrowRight className="w-3.5 h-3.5 text-cyan animate-pulse" />
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="flex items-center justify-between px-4 py-2 border-t border-white/[0.06] bg-[#070A10] text-[10px] font-mono text-slate-400">
          <div className="flex items-center gap-3">
            <span>↑↓ to navigate</span>
            <span>↵ to select</span>
          </div>
          <span className="text-cyan font-semibold">LifeLine OS 2.4</span>
        </div>
      </div>
    </div>
  );
};
