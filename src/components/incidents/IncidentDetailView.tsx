import React from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  AlertOctagon, 
  Hospital, 
  Users, 
  FileText, 
  CheckCircle2, 
  Radio
} from 'lucide-react';
import { Incident } from '../../types';
import { EmergencyTimeline } from '../emergency/EmergencyTimeline';
import { formatCoords } from '../../utils/formatters';
import { soundManager } from '../../utils/audio';

interface IncidentDetailViewProps {
  incident: Incident;
  onBack: () => void;
}

export const IncidentDetailView: React.FC<IncidentDetailViewProps> = ({
  incident,
  onBack,
}) => {
  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Top navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => {
            soundManager.playClick();
            onBack();
          }}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-surface-100 hover:bg-surface-50 border border-white/10 text-xs font-semibold text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Incidents</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-slate-400">
            ID: <strong className="text-white">{incident.id}</strong>
          </span>
          <span className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold uppercase ${
            incident.status === 'resolved'
              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
              : incident.status === 'coordinating'
              ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
              : 'bg-red-500/15 text-red-400 border border-red-500/30'
          }`}>
            {incident.status}
          </span>
        </div>
      </div>

      {/* Main Hero Header */}
      <div className="p-6 lg:p-8 rounded-3xl bg-surface-100/90 border border-white/10 shadow-glass-panel space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-cyan block mb-1">
              {incident.type} Incident Investigation Record
            </span>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-white">
              {incident.title}
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Logged {incident.createdAt} • Priority: <span className="uppercase text-alert font-bold">{incident.priority}</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-4 rounded-2xl bg-surface-50 border border-white/5 text-right">
              <div className="text-[10px] font-mono text-slate-400 uppercase">
                Location Pin
              </div>
              <div className="text-xs font-semibold text-white">
                {incident.location.name}
              </div>
              <div className="text-[10px] font-mono text-cyan">
                {formatCoords(incident.location.lat, incident.location.lng)}
              </div>
            </div>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-2 border-t border-white/5">
          {incident.description}
        </p>
      </div>

      {/* 2-Column Grid: Timeline & Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Timeline Column */}
        <div className="lg:col-span-7 rounded-3xl bg-[#0B101B]/90 backdrop-blur-xl border border-white/10 p-6 shadow-glass-panel space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-white/10">
            <Radio className="w-4 h-4 text-cyan" />
            <h3 className="font-display font-bold text-sm tracking-wider uppercase text-white">
              Incident Response Timeline
            </h3>
          </div>

          <EmergencyTimeline timeline={incident.timeline} />
        </div>

        {/* Logs & Contacts Column */}
        <div className="lg:col-span-5 space-y-6">
          {/* Contacts Alerted in this Incident */}
          <div className="rounded-3xl bg-[#0B101B]/90 backdrop-blur-xl border border-white/10 p-6 shadow-glass-panel space-y-3">
            <h3 className="font-display font-bold text-sm tracking-wider uppercase text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-cyan" />
              <span>Contacts Alerted</span>
            </h3>

            <div className="space-y-2">
              {incident.contactsAlerted.length > 0 ? (
                incident.contactsAlerted.map((name, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-surface-100/50 border border-white/5 text-xs">
                    <span className="font-semibold text-white">{name}</span>
                    <span className="text-[10px] font-mono text-emerald-400">✓ Received SOS</span>
                  </div>
                ))
              ) : (
                <div className="text-xs text-slate-500 font-mono">No external contacts notified</div>
              )}
            </div>
          </div>

          {/* Chronological Event Log */}
          <div className="rounded-3xl bg-[#0B101B]/90 backdrop-blur-xl border border-white/10 p-6 shadow-glass-panel space-y-3">
            <h3 className="font-display font-bold text-sm tracking-wider uppercase text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-purple-400" />
              <span>Telemetry Event Log</span>
            </h3>

            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {incident.eventLogs.map((log) => (
                <div key={log.id} className="p-3 rounded-xl bg-surface-100/40 border border-white/5 text-xs space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="text-cyan uppercase tracking-wider">{log.type}</span>
                    <span className="text-slate-400">{log.time}</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed font-sans">{log.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
