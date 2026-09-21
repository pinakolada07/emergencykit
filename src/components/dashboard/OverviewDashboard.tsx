import React from 'react';
import { 
  AlertOctagon, 
  MapPin, 
  Hospital, 
  Users, 
  Bot, 
  FileText, 
  ShieldCheck, 
  Share2, 
  ArrowRight, 
  Radio, 
  Clock, 
  ChevronRight,
  Sparkles,
  HeartPulse,
  Flame,
  Pill,
  Shield
} from 'lucide-react';
import { useEmergency } from '../../context/EmergencyContext';
import { soundManager } from '../../utils/audio';
import { LiveMap } from '../map/LiveMap';

export const OverviewDashboard: React.FC = () => {
  const { 
    isEmergencyActive, 
    setEmergencyModalOpen, 
    setActiveTab, 
    profile, 
    facilities, 
    contacts, 
    incidents, 
    alertContact,
    addNotification,
    setSelectedFacility,
    setSelectedIncidentId,
    runShowcaseScenario
  } = useEmergency();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const handleShareLocation = () => {
    soundManager.playSonar();
    addNotification(
      'Live Location Broadcasted',
      'High-precision telemetry coordinates pinned and broadcast to trusted contacts.',
      'info',
      'map'
    );
  };

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-7xl mx-auto animate-fadeIn pb-24 lg:pb-8">
      {/* Top Welcome Header & Safety Status */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan">
              Station APEX-1 • Mumbai Operations Deck
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight">
            {getGreeting()}, {profile.name.split(' ')[0]}.
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Your personal emergency command center is active and monitoring telemetry.
          </p>
        </div>

        {/* Global Safety State Pill */}
        <div className="self-start md:self-auto">
          {isEmergencyActive ? (
            <div 
              onClick={() => setActiveTab('emergency')}
              className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-red-950/80 border-2 border-alert text-alert shadow-glow-alert animate-alert-flash cursor-pointer"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-alert opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-alert" />
              </span>
              <div className="text-left">
                <div className="text-xs font-display font-black uppercase tracking-wider">
                  EMERGENCY MODE ACTIVE
                </div>
                <div className="text-[10px] font-mono text-red-200">
                  Tap to view live response center
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-emerald-950/40 border border-safe/30 text-emerald-400 shadow-glow-safe">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-safe opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-safe" />
              </span>
              <div className="text-left">
                <div className="text-xs font-display font-bold uppercase tracking-wider text-white flex items-center gap-2">
                  <span>YOU ARE SAFE</span>
                  <span className="text-[10px] font-mono text-emerald-400 font-semibold">• SHIELD 100%</span>
                </div>
                <div className="text-[10px] font-mono text-slate-400">
                  Telemetry locked • 4 contacts linked
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━ EMERGENCY ACTION PANEL ━━━━━━━━━━━━━━━━━━━━ */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-950/80 via-[#190C11] to-[#0D121F] border border-alert/50 shadow-glow-alert p-6 lg:p-8">
        {/* Glow ambient circle */}
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-alert/20 text-alert border border-alert/30 text-[10px] font-mono font-bold uppercase tracking-widest">
              <AlertOctagon className="w-3.5 h-3.5" /> Immediate Response Tier
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight uppercase">
              Need Immediate Help?
            </h2>
            <p className="text-xs sm:text-sm text-red-100/80 leading-relaxed">
              Activate LifeLine Emergency Protocol to lock high-precision GPS telemetry, alert your trusted contacts circle, dispatch nearest facilities, and start AI assistance.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => {
                soundManager.playEmergencyAlert();
                setEmergencyModalOpen(true);
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-red-600 via-red-500 to-red-600 hover:from-red-500 hover:to-red-400 text-white font-display font-black text-sm tracking-wider uppercase shadow-glow-alert hover:scale-105 transition-all flex items-center justify-center gap-3"
            >
              <AlertOctagon className="w-5 h-5 animate-pulse" />
              <span>ACTIVATE EMERGENCY MODE</span>
            </button>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-red-500/20 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-red-200/70">
          <span>Protected by 2-second hold confirmation to prevent accidental triggers.</span>
          <span className="text-amber-300">Simulation Demo Mode Active</span>
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━ QUICK ACTIONS ━━━━━━━━━━━━━━━━━━━━ */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400">
            Quick Emergency Actions
          </h3>
          <span className="text-[10px] font-mono text-cyan">INSTANT ACCESS</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {/* Card 1: Share Location */}
          <div
            onClick={handleShareLocation}
            className="group p-4 rounded-2xl bg-surface-100/70 hover:bg-surface-50 border border-white/10 hover:border-cyan/40 cursor-pointer shadow-glass-panel transition-all hover:-translate-y-1 text-left"
          >
            <div className="p-2.5 rounded-xl bg-cyan/15 text-cyan w-fit mb-3 group-hover:bg-cyan group-hover:text-black transition-colors">
              <MapPin className="w-5 h-5" />
            </div>
            <h4 className="font-display font-bold text-xs sm:text-sm text-white group-hover:text-cyan transition-colors">
              Share Location
            </h4>
            <p className="text-[11px] text-slate-400 mt-1 leading-snug">
              Broadcast GPS lock to contacts
            </p>
          </div>

          {/* Card 2: Find Help */}
          <div
            onClick={() => {
              soundManager.playClick();
              setActiveTab('map');
            }}
            className="group p-4 rounded-2xl bg-surface-100/70 hover:bg-surface-50 border border-white/10 hover:border-red-400/40 cursor-pointer shadow-glass-panel transition-all hover:-translate-y-1 text-left"
          >
            <div className="p-2.5 rounded-xl bg-red-500/15 text-red-400 w-fit mb-3 group-hover:bg-red-500 group-hover:text-white transition-colors">
              <Hospital className="w-5 h-5" />
            </div>
            <h4 className="font-display font-bold text-xs sm:text-sm text-white group-hover:text-red-400 transition-colors">
              Find Help
            </h4>
            <p className="text-[11px] text-slate-400 mt-1 leading-snug">
              Nearby hospitals, police, & fire
            </p>
          </div>

          {/* Card 3: Alert Contact */}
          <div
            onClick={() => {
              soundManager.playClick();
              if (contacts.length > 0) alertContact(contacts[0].id);
              setActiveTab('contacts');
            }}
            className="group p-4 rounded-2xl bg-surface-100/70 hover:bg-surface-50 border border-white/10 hover:border-emerald-400/40 cursor-pointer shadow-glass-panel transition-all hover:-translate-y-1 text-left"
          >
            <div className="p-2.5 rounded-xl bg-emerald-500/15 text-emerald-400 w-fit mb-3 group-hover:bg-emerald-500 group-hover:text-black transition-colors">
              <Users className="w-5 h-5" />
            </div>
            <h4 className="font-display font-bold text-xs sm:text-sm text-white group-hover:text-emerald-400 transition-colors">
              Alert Contact
            </h4>
            <p className="text-[11px] text-slate-400 mt-1 leading-snug">
              Ping primary contact Alex Rivera
            </p>
          </div>

          {/* Card 4: Ask AI */}
          <div
            onClick={() => {
              soundManager.playClick();
              setActiveTab('ai');
            }}
            className="group p-4 rounded-2xl bg-surface-100/70 hover:bg-surface-50 border border-white/10 hover:border-purple-400/40 cursor-pointer shadow-glass-panel transition-all hover:-translate-y-1 text-left"
          >
            <div className="p-2.5 rounded-xl bg-purple-500/15 text-purple-400 w-fit mb-3 group-hover:bg-purple-500 group-hover:text-white transition-colors">
              <Bot className="w-5 h-5" />
            </div>
            <h4 className="font-display font-bold text-xs sm:text-sm text-white group-hover:text-purple-400 transition-colors">
              Ask AI
            </h4>
            <p className="text-[11px] text-slate-400 mt-1 leading-snug">
              Instant situation triage & brief
            </p>
          </div>

          {/* Card 5: Report Incident */}
          <div
            onClick={() => {
              soundManager.playClick();
              setActiveTab('ai');
            }}
            className="group p-4 rounded-2xl bg-surface-100/70 hover:bg-surface-50 border border-white/10 hover:border-cyan/40 cursor-pointer shadow-glass-panel transition-all hover:-translate-y-1 text-left col-span-2 md:col-span-1"
          >
            <div className="p-2.5 rounded-xl bg-cyan/15 text-cyan w-fit mb-3 group-hover:bg-cyan group-hover:text-black transition-colors">
              <FileText className="w-5 h-5" />
            </div>
            <h4 className="font-display font-bold text-xs sm:text-sm text-white group-hover:text-cyan transition-colors">
              Report Incident
            </h4>
            <p className="text-[11px] text-slate-400 mt-1 leading-snug">
              Generate responder dispatch log
            </p>
          </div>
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━ LIVE LOCATION & SURROUNDINGS ━━━━━━━━━━━━━━━━━━━━ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Tactical Map Widget & Telemetry (7 cols) */}
        <div className="lg:col-span-7 rounded-3xl bg-[#0B101B]/90 backdrop-blur-xl border border-white/10 p-6 shadow-glass-panel space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-cyan animate-pulse" />
              <h3 className="font-display font-bold text-sm tracking-wider uppercase text-white">
                Live Location Telemetry
              </h3>
            </div>
            <span className="text-[10px] font-mono text-cyan bg-cyan/10 border border-cyan/30 px-2 py-0.5 rounded-full">
              GPS ACCURACY: ±3 METERS
            </span>
          </div>

          {/* Coordinates Readout */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-surface-100/50 border border-white/5">
              <div className="text-[10px] font-mono uppercase text-slate-400">Current Position</div>
              <div className="font-semibold text-white mt-0.5 truncate">Sector 4, North Corridor</div>
            </div>
            <div className="p-3 rounded-xl bg-surface-100/50 border border-white/5">
              <div className="text-[10px] font-mono uppercase text-slate-400">Coordinates</div>
              <div className="font-mono text-cyan mt-0.5">19.0760° N, 72.8777° E</div>
            </div>
            <div className="p-3 rounded-xl bg-surface-100/50 border border-white/5">
              <div className="text-[10px] font-mono uppercase text-slate-400">Last Synchronized</div>
              <div className="font-mono text-emerald-400 mt-0.5">Just now (Active Lock)</div>
            </div>
          </div>

          {/* Live Map Preview Component */}
          <div className="rounded-2xl overflow-hidden border border-white/10 shadow-inner">
            <LiveMap isWidget={true} />
          </div>

          {/* Nearby Facilities Quick Pills */}
          <div>
            <div className="text-[11px] font-mono uppercase text-slate-400 tracking-wider mb-2">
              Nearby Responders within 2.5km (Click to inspect)
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {facilities.slice(0, 4).map(fac => (
                <div
                  key={fac.id}
                  onClick={() => {
                    soundManager.playClick();
                    setSelectedFacility(fac);
                  }}
                  className="p-2.5 rounded-xl bg-surface-100/60 hover:bg-surface-50 border border-white/5 hover:border-cyan/30 cursor-pointer transition-colors"
                >
                  <div className="text-[10px] font-mono text-cyan uppercase font-semibold truncate">
                    {fac.type === 'hospital' ? '🏥 Hospital' : fac.type === 'police' ? '🚓 Police' : fac.type === 'fire_station' ? '🚒 Fire' : '💊 Pharmacy'}
                  </div>
                  <div className="text-xs font-semibold text-white truncate mt-0.5">
                    {fac.name}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                    {fac.etaMinutes}m ETA • {fac.distanceKm}km
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Emergency Readiness & Recent Operations (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Readiness Score Card */}
          <div className="rounded-3xl bg-[#0B101B]/90 backdrop-blur-xl border border-white/10 p-6 shadow-glass-panel space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="font-display font-bold text-sm tracking-wider uppercase text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Emergency Readiness</span>
              </h3>
              <button
                onClick={() => setActiveTab('profile')}
                className="text-[11px] font-mono text-cyan hover:underline flex items-center gap-1"
              >
                View Audit <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-4xl font-display font-black text-emerald-400">
                  {profile.emergencyReadiness.score}%
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Readiness Score • High Preparedness
                </div>
              </div>

              <div className="w-20 h-20 rounded-full border-4 border-emerald-500/20 border-t-emerald-400 flex items-center justify-center font-mono text-xs text-white font-bold">
                87/100
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-slate-300 pt-2 border-t border-white/5">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-emerald-400">
                  ✓ Location Telemetry Active
                </span>
                <span className="font-mono text-[10px] text-slate-500">READY</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-emerald-400">
                  ✓ 4 Trusted Contacts Verified
                </span>
                <span className="font-mono text-[10px] text-slate-500">READY</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-emerald-400">
                  ✓ Medical ICE Profile Complete
                </span>
                <span className="font-mono text-[10px] text-slate-500">READY</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-amber-400">
                  ⚠ Secondary Hospital Unset
                </span>
                <span className="font-mono text-[10px] text-amber-400/80">PENDING</span>
              </div>
            </div>
          </div>

          {/* Recent Incident Log Snippet */}
          <div className="rounded-3xl bg-[#0B101B]/90 backdrop-blur-xl border border-white/10 p-6 shadow-glass-panel space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <h3 className="font-display font-bold text-sm tracking-wider uppercase text-white">
                Recent Incident Log
              </h3>
              <button
                onClick={() => setActiveTab('incidents')}
                className="text-[11px] font-mono text-cyan hover:underline"
              >
                All History
              </button>
            </div>

            {incidents.slice(0, 2).map(inc => (
              <div
                key={inc.id}
                onClick={() => {
                  soundManager.playClick();
                  setSelectedIncidentId(inc.id);
                  setActiveTab('incidents');
                }}
                className="p-3 rounded-2xl bg-surface-100/50 hover:bg-surface-50 border border-white/5 hover:border-white/20 cursor-pointer transition-all space-y-1"
              >
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-mono text-cyan font-semibold">#{inc.id}</span>
                  <span className={`font-mono uppercase text-[9px] px-2 py-0.5 rounded-full ${
                    inc.status === 'resolved'
                      ? 'bg-emerald-500/15 text-emerald-400'
                      : 'bg-amber-500/15 text-amber-300'
                  }`}>
                    {inc.status}
                  </span>
                </div>
                <div className="text-xs font-semibold text-white truncate">
                  {inc.title}
                </div>
                <div className="text-[10px] text-slate-400">
                  {inc.location.name} • {inc.createdAt}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
