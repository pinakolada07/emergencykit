import React, { useState } from 'react';
import { 
  AlertOctagon, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Users, 
  Phone, 
  ShieldCheck, 
  Radio, 
  Send, 
  Bot, 
  Hospital, 
  XOctagon, 
  Copy
} from 'lucide-react';
import { useEmergency } from '../../context/EmergencyContext';
import { formatElapsed, formatCoords } from '../../utils/formatters';
import { EmergencyTimeline } from './EmergencyTimeline';
import { soundManager } from '../../utils/audio';

export const EmergencyActiveView: React.FC = () => {
  const { 
    isEmergencyActive, 
    activeIncident, 
    timeElapsed, 
    resolveEmergency, 
    cancelEmergency,
    contacts,
    callContact,
    facilities,
    setActiveTab,
    addNotification
  } = useEmergency();

  const [copiedScript, setCopiedScript] = useState(false);
  const [quickNote, setQuickNote] = useState('');

  if (!isEmergencyActive || !activeIncident) {
    return (
      <div className="p-6 lg:p-10 flex flex-col items-center justify-center min-h-[70vh] text-center">
        <div className="w-16 h-16 rounded-3xl bg-emerald-950/40 border border-safe/30 flex items-center justify-center text-safe shadow-glow-safe mb-4">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-display font-bold text-white mb-2">
          No Active Emergency
        </h2>
        <p className="text-sm text-slate-400 max-w-md mb-6 leading-relaxed">
          LifeLine is in passive telemetry standby. Your coordinates and contacts are synced and ready for instant activation whenever needed.
        </p>
        <button
          onClick={() => setActiveTab('overview')}
          className="px-5 py-2.5 rounded-xl bg-surface-100 hover:bg-surface-50 border border-white/10 text-white text-xs font-semibold"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  const assignedFacility = facilities[0];

  const handleCopyScript = () => {
    if (activeIncident.aiAnalysis?.responderScript) {
      navigator.clipboard.writeText(activeIncident.aiAnalysis.responderScript);
      setCopiedScript(true);
      soundManager.playClick();
      setTimeout(() => setCopiedScript(false), 2000);
    }
  };

  const handleSendNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickNote.trim()) return;
    addNotification('Incident Note Added', `"${quickNote}" logged to incident telemetry timeline.`, 'info', 'emergency');
    setQuickNote('');
    soundManager.playClick();
  };

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-7xl mx-auto animate-fadeIn pb-24 lg:pb-8">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-950/90 via-[#1C0D12]/95 to-red-950/80 border-2 border-alert shadow-glow-alert p-6 lg:p-8">
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="p-3.5 rounded-2xl bg-alert text-white shadow-glow-alert animate-bounce">
              <AlertOctagon className="w-8 h-8" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded-md bg-alert text-white font-mono text-[10px] font-black uppercase tracking-widest">
                  LIVE SOS BEACON
                </span>
                <span className="px-2.5 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/40 font-mono text-[10px] font-bold">
                  SIMULATION ACTIVE
                </span>
                <span className="font-mono text-xs text-slate-300">
                  ID: {activeIncident.id}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-display font-black tracking-tight text-white uppercase">
                🚨 EMERGENCY MODE ACTIVE
              </h1>
              <p className="text-xs sm:text-sm text-red-200/80 mt-1">
                {activeIncident.title} • Telemetry transmitting at high priority
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 self-start md:self-auto">
            <div className="bg-black/60 border border-red-500/40 px-5 py-3 rounded-2xl text-center shadow-inner">
              <div className="text-[10px] font-mono text-red-300 uppercase tracking-widest flex items-center justify-center gap-1.5 mb-0.5">
                <Clock className="w-3 h-3 text-red-400" /> Elapsed Time
              </div>
              <div className="text-2xl sm:text-3xl font-mono font-black text-white tracking-widest">
                {formatElapsed(timeElapsed)}
              </div>
            </div>

            <button
              onClick={resolveEmergency}
              className="px-5 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-display font-black text-xs uppercase tracking-wider shadow-glow-safe hover:scale-105 transition-all flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4 stroke-[3]" />
              <span>Mark Resolved</span>
            </button>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-red-500/20 flex items-center justify-between text-[11px] font-mono text-red-200/70">
          <span>Demo simulation — no real emergency service has been contacted.</span>
          <button
            onClick={cancelEmergency}
            className="hover:text-white flex items-center gap-1 transition-colors text-red-300"
          >
            <XOctagon className="w-3.5 h-3.5" /> Abort SOS
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-3xl bg-[#0B101B]/90 backdrop-blur-xl border border-white/10 p-6 shadow-glass-panel space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-cyan animate-pulse" />
                <h3 className="font-display font-bold text-sm tracking-wider uppercase text-white">
                  Help Request Initiated
                </h3>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 font-mono text-xs font-semibold">
                ● Assistance Coordinating
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-surface-100/60 border border-white/5 space-y-1">
                <span className="text-[10px] font-mono uppercase text-slate-400 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-cyan" /> Pinned Location
                </span>
                <div className="text-xs font-semibold text-white">
                  {activeIncident.location.name}
                </div>
                <div className="text-[10px] font-mono text-cyan">
                  {formatCoords(activeIncident.location.lat, activeIncident.location.lng)} (±3m)
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-surface-100/60 border border-white/5 space-y-1">
                <span className="text-[10px] font-mono uppercase text-slate-400 flex items-center gap-1">
                  <Hospital className="w-3 h-3 text-red-400" /> Assigned Facility
                </span>
                <div className="text-xs font-semibold text-white">
                  {assignedFacility.name}
                </div>
                <div className="text-[10px] font-mono text-emerald-400">
                  ETA {assignedFacility.etaMinutes} mins • {assignedFacility.distanceKm} km away
                </div>
              </div>
            </div>

            <div className="pt-2">
              <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider mb-4">
                Emergency Response Milestones
              </h4>
              <EmergencyTimeline timeline={activeIncident.timeline} />
            </div>
          </div>

          {activeIncident.aiAnalysis?.responderScript && (
            <div className="rounded-3xl bg-purple-950/30 backdrop-blur-xl border border-purple-500/30 p-6 space-y-3 shadow-glow-purple">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-purple-300 text-xs font-display font-bold uppercase tracking-wider">
                  <Bot className="w-4 h-4 text-purple-400" />
                  <span>Dispatcher / 911 Read-Aloud Script</span>
                </div>
                <button
                  onClick={handleCopyScript}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-200 text-xs font-mono transition-colors"
                >
                  <Copy className="w-3 h-3" />
                  <span>{copiedScript ? 'Copied!' : 'Copy Script'}</span>
                </button>
              </div>

              <div className="p-3.5 rounded-xl bg-black/40 border border-purple-500/20 font-mono text-xs text-purple-100 leading-relaxed">
                "{activeIncident.aiAnalysis.responderScript}"
              </div>
              <p className="text-[11px] text-slate-400">
                You can read this exact message word-for-word if calling telephone emergency dispatch.
              </p>
            </div>
          )}
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl bg-[#0B101B]/90 backdrop-blur-xl border border-white/10 p-6 shadow-glass-panel space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-cyan" />
                <h3 className="font-display font-bold text-sm tracking-wider uppercase text-white">
                  Contacts Notified ({activeIncident.contactsAlerted.length})
                </h3>
              </div>
              <span className="text-[10px] font-mono text-emerald-400">
                ● Live Updates
              </span>
            </div>

            <div className="space-y-2.5">
              {contacts.slice(0, 3).map(contact => (
                <div
                  key={contact.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-surface-100/50 border border-white/5"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={contact.avatar}
                      alt={contact.name}
                      className="w-9 h-9 rounded-full object-cover border border-white/10"
                    />
                    <div>
                      <div className="text-xs font-semibold text-white">
                        {contact.name}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        {contact.relationship}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Acknowledged
                    </span>
                    <button
                      onClick={() => callContact(contact.id)}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                      title="Simulate Call"
                    >
                      <Phone className="w-3.5 h-3.5 text-cyan" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-[#0B101B]/90 backdrop-blur-xl border border-white/10 p-6 shadow-glass-panel space-y-3">
            <h3 className="font-display font-bold text-sm tracking-wider uppercase text-white">
              Transmit Update to Responders
            </h3>
            <p className="text-xs text-slate-400">
              Provide status changes, hazards, or injuries to append to your live beacon.
            </p>

            <form onSubmit={handleSendNote} className="flex gap-2">
              <input
                type="text"
                value={quickNote}
                onChange={e => setQuickNote(e.target.value)}
                placeholder="e.g. Occupant conscious, bleeding controlled"
                className="flex-1 px-3 py-2 rounded-xl bg-surface-50 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan"
              />
              <button
                type="submit"
                className="px-3 py-2 rounded-xl bg-cyan text-black font-semibold text-xs hover:bg-cyan-glow transition-all flex items-center gap-1"
              >
                <Send className="w-3.5 h-3.5" /> Send
              </button>
            </form>
          </div>

          {activeIncident.aiAnalysis?.recommendedSteps && (
            <div className="rounded-3xl bg-[#0B101B]/90 backdrop-blur-xl border border-white/10 p-6 shadow-glass-panel space-y-3">
              <h3 className="font-display font-bold text-sm tracking-wider uppercase text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-safe" />
                <span>Immediate Safety Checklist</span>
              </h3>

              <div className="space-y-2 text-xs text-slate-300">
                {activeIncident.aiAnalysis.recommendedSteps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-2 rounded-lg bg-surface-100/40">
                    <span className="w-4 h-4 rounded-full bg-cyan/15 text-cyan border border-cyan/30 text-[10px] font-mono flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
