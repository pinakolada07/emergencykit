import React, { useState } from 'react';
import { 
  History, 
  Search, 
  Filter, 
  ChevronRight, 
  MapPin, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  AlertOctagon,
  Car,
  HeartPulse,
  Flame,
  Compass
} from 'lucide-react';
import { useEmergency } from '../../context/EmergencyContext';
import { Incident } from '../../types';
import { IncidentDetailView } from './IncidentDetailView';
import { soundManager } from '../../utils/audio';

export const IncidentsList: React.FC = () => {
  const { incidents, selectedIncidentId, setSelectedIncidentId } = useEmergency();
  const [filter, setFilter] = useState<'all' | 'coordinating' | 'resolved' | 'critical'>('all');
  const [search, setSearch] = useState('');

  const selectedIncident = incidents.find(i => i.id === selectedIncidentId);

  if (selectedIncident) {
    return (
      <div className="p-4 lg:p-8 max-w-6xl mx-auto">
        <IncidentDetailView
          incident={selectedIncident}
          onBack={() => setSelectedIncidentId(null)}
        />
      </div>
    );
  }

  const filteredIncidents = incidents.filter(inc => {
    if (filter === 'coordinating' && inc.status !== 'coordinating') return false;
    if (filter === 'resolved' && inc.status !== 'resolved') return false;
    if (filter === 'critical' && inc.priority !== 'critical') return false;

    if (search) {
      const q = search.toLowerCase();
      return (
        inc.id.toLowerCase().includes(q) ||
        inc.title.toLowerCase().includes(q) ||
        inc.type.toLowerCase().includes(q) ||
        inc.location.name.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const getCategoryIcon = (type: string) => {
    switch (type) {
      case 'accident': return <Car className="w-4 h-4 text-alert" />;
      case 'medical': return <HeartPulse className="w-4 h-4 text-red-400" />;
      case 'fire': return <Flame className="w-4 h-4 text-amber-400" />;
      case 'lost': return <Compass className="w-4 h-4 text-cyan" />;
      default: return <AlertOctagon className="w-4 h-4 text-purple-400" />;
    }
  };

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-6xl mx-auto animate-fadeIn pb-24 lg:pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-surface-100/80 border border-white/10 shadow-glass-panel">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-cyan/15 text-cyan border border-cyan/30 shadow-glow-cyan-sm">
            <History className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold text-white uppercase tracking-wide">
              Incident Operations Log
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Historical record of emergency activations, dispatches, and response milestones.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-cyan bg-cyan/10 border border-cyan/20 px-3 py-1.5 rounded-xl">
            {incidents.length} Records Logged
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by ID, location, or type..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-surface-100/80 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {[
            { id: 'all', label: 'All Incidents' },
            { id: 'coordinating', label: 'In Progress' },
            { id: 'resolved', label: 'Resolved' },
            { id: 'critical', label: 'Critical' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                soundManager.playClick();
                setFilter(tab.id as any);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap ${
                filter === tab.id
                  ? 'bg-cyan text-black font-bold shadow-glow-cyan-sm'
                  : 'text-slate-400 hover:text-white bg-surface-100/60 border border-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Incident List */}
      <div className="space-y-3">
        {filteredIncidents.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-surface-100/40 border border-white/5 text-slate-400 font-mono text-xs">
            No incident records match your criteria.
          </div>
        ) : (
          filteredIncidents.map(inc => {
            const isResolved = inc.status === 'resolved';
            const isCoordinating = inc.status === 'coordinating';

            return (
              <div
                key={inc.id}
                onClick={() => {
                  soundManager.playClick();
                  setSelectedIncidentId(inc.id);
                }}
                className="group p-5 rounded-3xl bg-[#0B101B]/90 backdrop-blur-xl border border-white/10 hover:border-cyan/40 shadow-glass-panel cursor-pointer transition-all hover:-translate-y-0.5"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-2xl bg-surface-100 border border-white/10 group-hover:border-cyan/40 transition-colors">
                      {getCategoryIcon(inc.type)}
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="font-mono text-xs text-cyan font-bold">
                          #{inc.id}
                        </span>
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/10">
                          {inc.type}
                        </span>
                        <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full ${
                          isResolved
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : isCoordinating
                            ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20 animate-pulse'
                            : 'bg-red-500/10 text-red-400 border border-red-500/20'
                        }`}>
                          ● {inc.status}
                        </span>
                      </div>

                      <h3 className="text-base font-display font-bold text-white group-hover:text-cyan transition-colors">
                        {inc.title}
                      </h3>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mt-2">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-cyan" />
                          {inc.location.name}
                        </span>
                        <span className="flex items-center gap-1.5 font-mono text-[11px]">
                          <Clock className="w-3.5 h-3.5 text-slate-500" />
                          {inc.createdAt}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 self-end md:self-center">
                    <div className="hidden sm:block text-right">
                      <div className="text-[10px] font-mono uppercase text-slate-500">
                        Priority Level
                      </div>
                      <div className={`text-xs font-mono font-bold uppercase ${
                        inc.priority === 'critical' ? 'text-alert' : 'text-amber-400'
                      }`}>
                        {inc.priority}
                      </div>
                    </div>

                    <div className="p-2 rounded-xl bg-surface-100 group-hover:bg-cyan group-hover:text-black transition-colors text-slate-400">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
