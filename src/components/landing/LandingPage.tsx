import React from 'react';
import { 
  Radio, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  MapPin, 
  Users, 
  Bot, 
  AlertOctagon, 
  Activity, 
  Compass, 
  HeartPulse, 
  CheckCircle2, 
  Layers,
  ChevronRight,
  Play
} from 'lucide-react';
import { useEmergency } from '../../context/EmergencyContext';
import { soundManager } from '../../utils/audio';

export const LandingPage: React.FC = () => {
  const { 
    setLandingMode, 
    setActiveTab, 
    runShowcaseScenario, 
    profile, 
    contacts 
  } = useEmergency();

  const handleEnterCommandCenter = () => {
    soundManager.playSonar();
    setLandingMode(false);
    setActiveTab('overview');
  };

  const handleRunDemo = () => {
    soundManager.playSonar();
    runShowcaseScenario();
  };

  const pillars = [
    {
      num: '01',
      title: 'DETECT',
      subtitle: 'Instant GPS & SOS Lock',
      desc: 'High-precision satellite lock accurate to 3 meters. Single-tap or 2-second hold initiates encrypted telemetry broadcast.',
      icon: Compass,
      color: 'text-cyan',
      borderColor: 'border-cyan/30',
      bgColor: 'bg-cyan/10',
    },
    {
      num: '02',
      title: 'UNDERSTAND',
      subtitle: 'Neural AI Emergency Triage',
      desc: 'Converts raw eyewitness panic into structured incident classification, severity ratings, and verbal read-aloud scripts for 911 dispatch.',
      icon: Bot,
      color: 'text-purple-400',
      borderColor: 'border-purple-500/30',
      bgColor: 'bg-purple-500/10',
    },
    {
      num: '03',
      title: 'ALERT',
      subtitle: 'Tier-1 Contact Mesh',
      desc: 'Simultaneous encrypted satellite push broadcasts live location and ICE directives to primary family members with real-time acknowledgment.',
      icon: Users,
      color: 'text-emerald-400',
      borderColor: 'border-emerald-500/30',
      bgColor: 'bg-emerald-500/10',
    },
    {
      num: '04',
      title: 'COORDINATE',
      subtitle: 'Tactical Map & Responders',
      desc: 'Real-time proximity matrix calculates routing, distances, and trauma capacity across nearby hospitals, police precincts, and fire rescue engines.',
      icon: Layers,
      color: 'text-amber-400',
      borderColor: 'border-amber-500/30',
      bgColor: 'bg-amber-500/10',
    },
    {
      num: '05',
      title: 'RESOLVE',
      subtitle: 'Milestone Tracking',
      desc: 'Audited 6-phase response timeline from incident detection to hospital admittance and verified safety resolution.',
      icon: CheckCircle2,
      color: 'text-safe',
      borderColor: 'border-safe/30',
      bgColor: 'bg-safe/10',
    },
  ];

  return (
    <div className="min-h-screen bg-[#06080C] bg-tactical-grid bg-radial-vignette text-white overflow-x-hidden selection:bg-cyan selection:text-black">
      {/* Top Floating Landing Navigation */}
      <header className="sticky top-0 z-50 w-full bg-[#06080C]/80 backdrop-blur-xl border-b border-white/[0.08] px-6 lg:px-12 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan/20 to-blue-600/20 border border-cyan/40 shadow-glow-cyan-sm flex items-center justify-center">
            <Radio className="w-5 h-5 text-cyan animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-black text-xl tracking-wider text-white">
                LIFELINE
              </span>
              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-cyan/15 text-cyan border border-cyan/30">
                OS 2.4
              </span>
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
              Personal Emergency Command Center
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRunDemo}
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-950/50 hover:bg-purple-900/50 border border-purple-500/30 text-purple-200 text-xs font-mono transition-all"
          >
            <Play className="w-3.5 h-3.5 fill-purple-400 text-purple-400" />
            <span>Showcase Demo</span>
          </button>

          <button
            onClick={handleEnterCommandCenter}
            className="px-5 py-2.5 rounded-xl bg-cyan hover:bg-cyan-glow text-black font-display font-bold text-xs uppercase tracking-wider shadow-glow-cyan transition-all flex items-center gap-2"
          >
            <span>Open Command Center</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 lg:px-12 pt-16 pb-24 max-w-7xl mx-auto text-center">
        {/* Glow orb */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan/10 rounded-full blur-3xl pointer-events-none" />

        {/* Live Safety State Banner */}
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#0B101B]/90 border border-white/10 shadow-glass-panel mb-8 animate-fadeIn">
          <span className="w-2.5 h-2.5 rounded-full bg-safe animate-ping" />
          <span className="text-xs font-display font-bold uppercase tracking-wider text-emerald-400">
            Active Telemetry Standby: You Are Safe
          </span>
          <span className="text-slate-600">•</span>
          <span className="text-xs font-mono text-slate-400">
            GPS Lock: Mumbai Sector 4 (±3m)
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black tracking-tight uppercase leading-[1.05] max-w-5xl mx-auto">
          When Every Second Matters,{' '}
          <span className="bg-gradient-to-r from-cyan via-white to-cyan text-transparent bg-clip-text drop-shadow-[0_0_25px_rgba(0,240,255,0.4)]">
            Everything You Need
          </span>{' '}
          Is in One Place.
        </h1>

        <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed font-sans">
          A futuristic, mission-control grade emergency coordination platform uniting live location telemetry, trusted contacts mesh, nearest responder dispatch, AI intelligence triage, and real-time incident resolution.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleEnterCommandCenter}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-cyan hover:bg-cyan-glow text-black font-display font-black text-sm uppercase tracking-wider shadow-glow-cyan hover:scale-105 transition-all flex items-center justify-center gap-3"
          >
            <span>Enter Command Center</span>
            <ArrowRight className="w-4 h-4 stroke-[3]" />
          </button>

          <button
            onClick={handleRunDemo}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-surface-100 hover:bg-surface-50 text-white font-display font-bold text-sm uppercase tracking-wider border border-white/10 hover:border-cyan/40 transition-all flex items-center justify-center gap-3"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>Launch Interactive Demo</span>
          </button>
        </div>

        {/* Telemetry Stat Strip */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
          <div className="p-4 rounded-2xl bg-[#0B101B]/80 border border-white/10">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Current Status</div>
            <div className="text-lg font-display font-bold text-emerald-400 flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-safe" />
              ● YOU ARE SAFE
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#0B101B]/80 border border-white/10">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Telemetry Accuracy</div>
            <div className="text-lg font-mono font-bold text-cyan mt-0.5">
              ±3 Meters (Lock)
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#0B101B]/80 border border-white/10">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Emergency Readiness</div>
            <div className="text-lg font-display font-bold text-white mt-0.5">
              {profile.emergencyReadiness.score}% Prepared
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#0B101B]/80 border border-white/10">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Contacts Mesh</div>
            <div className="text-lg font-display font-bold text-purple-400 mt-0.5">
              {contacts.length} Connected
            </div>
          </div>
        </div>
      </section>

      {/* The 5 Core Pillars Section: DETECT -> UNDERSTAND -> ALERT -> COORDINATE -> RESOLVE */}
      <section className="px-6 lg:px-12 py-20 max-w-7xl mx-auto border-t border-white/[0.08]">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan">
            The LifeLine Protocol
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-white uppercase tracking-tight">
            How LifeLine Safeguards Every Incident
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            From the instant distress is sensed to the final safety resolution, LifeLine executes an orchestrated 5-phase operations pipeline.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {pillars.map(pillar => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.num}
                className={`p-6 rounded-3xl bg-[#0B101B]/90 backdrop-blur-xl border ${pillar.borderColor} shadow-glass-panel space-y-4 text-left transition-all hover:-translate-y-1`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-slate-500 font-bold">
                    {pillar.num}
                  </span>
                  <div className={`p-2.5 rounded-xl ${pillar.bgColor} ${pillar.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <div>
                  <h3 className="font-display font-black text-lg text-white tracking-wide">
                    {pillar.title}
                  </h3>
                  <div className={`text-xs font-mono ${pillar.color} mt-0.5`}>
                    {pillar.subtitle}
                  </div>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Visual Operations Preview Banner */}
      <section className="px-6 lg:px-12 py-16 max-w-7xl mx-auto">
        <div className="rounded-3xl bg-gradient-to-r from-surface-50 via-[#0B101B] to-surface-50 border border-white/10 p-8 lg:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl text-left">
            <span className="px-3 py-1 rounded-full bg-cyan/15 text-cyan border border-cyan/30 text-xs font-mono uppercase tracking-wider">
              High-Fidelity Operations Deck
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-black text-white uppercase">
              Designed to eliminate panic under stress.
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              When emergency strikes, cognitive load peaks. LifeLine’s mission-control dark UI minimizes confusion with large, accessible buttons, automatic GPS locking, and actionable AI guidance.
            </p>
          </div>

          <button
            onClick={handleEnterCommandCenter}
            className="shrink-0 px-8 py-4 rounded-2xl bg-cyan hover:bg-cyan-glow text-black font-display font-bold text-xs uppercase tracking-wider shadow-glow-cyan hover:scale-105 transition-all flex items-center gap-2"
          >
            <span>Launch Command Center</span>
            <ChevronRight className="w-4 h-4 stroke-[3]" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 lg:px-12 py-8 border-t border-white/[0.08] text-center text-xs font-mono text-slate-500">
        LIFELINE Emergency Command Center • Built for High-Stakes Coordination • Demo Simulation Mode
      </footer>
    </div>
  );
};
