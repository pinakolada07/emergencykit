import React, { useState } from 'react';
import { 
  Bot, 
  Sparkles, 
  Send, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldAlert, 
  Copy, 
  ArrowRight, 
  Clock, 
  MapPin, 
  Radio, 
  FileText,
  AlertOctagon,
  HelpCircle
} from 'lucide-react';
import { useEmergency } from '../../context/EmergencyContext';
import { AITriageResult } from '../../types';
import { soundManager } from '../../utils/audio';

export const AIAssistant: React.FC = () => {
  const { 
    setEmergencyModalOpen, 
    addNotification 
  } = useEmergency();

  const [inputPrompt, setInputPrompt] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [triageResult, setTriageResult] = useState<AITriageResult | null>({
    incidentType: 'Roadway Accident & Collision',
    urgency: 'High',
    detectedLocation: 'Mumbai Metro Corridor, Sector 4 (lat 19.0760, lng 72.8777)',
    keyInformation: [
      'Two vehicles involved in intersection collision',
      'One driver conscious but experiencing neck stiffness',
      'Airbags deployed, hazardous debris scattered across 2 lanes',
      'No immediate fire or fuel vapor detected'
    ],
    recommendedSteps: [
      'Exit vehicle only if safe to reach the elevated pedestrian barrier',
      'Switch on hazard blinkers to warn approaching traffic',
      'Do not move anyone with suspected spinal or neck injury unless immediate fire danger arises',
      'Transmit LifeLine beacon with high-precision GPS coordinates'
    ],
    responderScript: 'LifeLine Triage Brief: Alex Rivera reporting 2-vehicle collision at Mumbai Sector 4 intersection. 1 adult occupant complaining of neck pain, conscious. Fluid on roadway. Requesting traffic patrol and paramedic unit.',
    medicalDisclaimer: 'Notice: LifeLine AI provides informational guidance to assist communication with first responders. It is not a substitute for certified emergency medical technicians or physician diagnosis.',
    timestamp: 'Just now'
  });

  const presets = [
    {
      label: '🏍️ Motorcycle Crash',
      text: 'Motorcycle collision with a sedan on highway. Rider thrown onto shoulder, conscious but cannot stand, severe leg pain and road rash. Heavy passing traffic.',
    },
    {
      label: '❤️ Chest Pain & Dyspnea',
      text: 'Experiencing sudden crushing chest tightness radiating down left shoulder, cold sweat, shortness of breath, and feeling dizzy while sitting down.',
    },
    {
      label: '🔥 Apartment Kitchen Fire',
      text: 'Stove grease fire ignited kitchen curtains, spreading quickly to upper cabinets. Thick dark smoke filling hallway, smoke alarm blaring.',
    },
    {
      label: '🧭 Lost Hiker in Storm',
      text: 'Stranded off-trail on mountain pass in sudden torrential rainfall and falling temperatures. Phone battery 14%, losing daylight, zero trail visibility.',
    },
  ];

  const handleAnalyze = (textToAnalyze?: string) => {
    const prompt = textToAnalyze || inputPrompt;
    if (!prompt.trim()) return;

    soundManager.playSonar();
    setIsAnalyzing(true);
    setTriageResult(null);

    // Simulate AI neural reasoning
    setTimeout(() => {
      let type = 'Emergency Situation';
      let urgency: 'Critical' | 'High' | 'Medium' | 'Low' = 'High';
      let keyInfo: string[] = [];
      let steps: string[] = [];
      let script = '';

      const lower = prompt.toLowerCase();
      if (lower.includes('chest') || lower.includes('breath') || lower.includes('heart') || lower.includes('dizzy')) {
        type = 'Acute Cardiac / Medical Distress';
        urgency = 'Critical';
        keyInfo = [
          'Symptoms consistent with acute cardiac or respiratory distress',
          'Accompanied by dizziness and cold diaphoresis',
          'Urgent medical triage required'
        ];
        steps = [
          'Sit down in comfortable upright position with back supported',
          'Loosen any tight clothing around neck and chest',
          'Do NOT exert physical energy or walk around',
          'Alert nearby people or call emergency medical dispatch immediately'
        ];
        script = 'LifeLine Emergency Medical Triage: Patient Alex Rivera experiencing acute crushing chest pressure and dyspnea at Sector 4. High cardiac alert. Emergency ambulance requested.';
      } else if (lower.includes('fire') || lower.includes('smoke') || lower.includes('flame')) {
        type = 'Structural Fire & Smoke Hazard';
        urgency = 'Critical';
        keyInfo = [
          'Active thermal fire spreading to flammable materials',
          'Toxic smoke accumulation in enclosed space',
          'Risk of rapid vertical spread'
        ];
        steps = [
          'Evacuate structure immediately — do not stop to gather belongings',
          'Stay low under smoke layer while exiting',
          'Close doors behind you to slow fire progression',
          'Assemble at designated outdoor safe zone and do not re-enter'
        ];
        script = 'LifeLine Thermal Alert: Structure fire active with heavy smoke at Sector 4. Building evacuation underway. Fire rescue and engine company requested.';
      } else if (lower.includes('lost') || lower.includes('hiker') || lower.includes('storm')) {
        type = 'Search & Rescue / Stranded Hiker';
        urgency = 'High';
        keyInfo = [
          'Disoriented in remote terrain with adverse weather',
          'Low battery critical telemetry limitation',
          'Hypothermia hazard due to precipitation'
        ];
        steps = [
          'Remain stationary in current location to preserve search coordinates',
          'Seek natural shelter from rain and wind',
          'Switch phone to ultra-battery saver; conserve screen light',
          'LifeLine satellite beacon coordinates locked'
        ];
        script = 'LifeLine Search & Rescue Alert: Stranded individual in mountain pass. Low battery (14%), wet weather, hypothermia risk. GPS lock transmitting at lat 19.0760, lng 72.8777.';
      } else {
        type = 'Physical Accident / Roadway Hazard';
        urgency = 'High';
        keyInfo = [
          'Impact collision resulting in physical trauma',
          'Risk of secondary collisions from approaching vehicles',
          'Patient conscious with acute mobility restriction'
        ];
        steps = [
          'Secure scene perimeter or move beyond guardrail if feasible',
          'Do not attempt to move injured persons unless immediate hazard exists',
          'Keep patient warm and still to minimize shock',
          'Prepare to state exact intersection landmarks to first responders'
        ];
        script = `LifeLine Incident Brief: Reporting urgent ${prompt.substring(0, 80)}... at Mumbai Metro Sector 4. Priority dispatch requested.`;
      }

      setTriageResult({
        incidentType: type,
        urgency,
        detectedLocation: 'Mumbai Metro Corridor, Sector 4 (lat 19.0760, lng 72.8777)',
        keyInformation: keyInfo,
        recommendedSteps: steps,
        responderScript: script,
        medicalDisclaimer: 'Important: LifeLine AI provides informational guidance to assist communication with first responders. It does not replace professional medical personnel or emergency dispatchers.',
        timestamp: 'Just now'
      });

      setIsAnalyzing(false);
      soundManager.playResolution();
    }, 1200);
  };

  const handleCopyScript = () => {
    if (triageResult?.responderScript) {
      navigator.clipboard.writeText(triageResult.responderScript);
      setCopied(true);
      soundManager.playClick();
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-6xl mx-auto animate-fadeIn pb-24 lg:pb-8">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-purple-950/70 via-[#120B24]/80 to-surface border border-purple-500/30 p-6 lg:p-8 shadow-glow-purple">
        <div className="flex items-center gap-4 mb-3">
          <div className="p-3 rounded-2xl bg-purple-500/20 text-purple-400 border border-purple-500/40 shadow-glow-purple">
            <Bot className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-display font-black text-white uppercase tracking-wider">
                LIFELINE AI
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[10px] font-mono font-bold">
                NEURAL TRIAGE 2.4
              </span>
            </div>
            <p className="text-xs sm:text-sm text-purple-200/80 mt-1">
              Turn what happened into clear, structured information responders can instantly use.
            </p>
          </div>
        </div>
      </div>

      {/* Input Section */}
      <div className="rounded-3xl bg-[#0B101B]/90 backdrop-blur-xl border border-white/10 p-6 shadow-glass-panel space-y-4">
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
            Describe What Happened
          </label>
          <div className="relative">
            <textarea
              rows={4}
              value={inputPrompt}
              onChange={e => setInputPrompt(e.target.value)}
              placeholder="e.g. There was a motorcycle accident near the main road. One person appears injured with leg trauma. Traffic is backing up..."
              className="w-full p-4 rounded-2xl bg-surface-100/60 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-400 leading-relaxed font-sans"
            />
            <div className="absolute bottom-3 right-3 text-[10px] font-mono text-slate-500">
              {inputPrompt.length} chars
            </div>
          </div>
        </div>

        {/* Quick Presets */}
        <div>
          <span className="text-[11px] font-mono uppercase text-slate-400 tracking-wider block mb-2">
            Quick Scenario Presets (Click to Test)
          </span>
          <div className="flex flex-wrap gap-2">
            {presets.map((preset, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  setInputPrompt(preset.text);
                  handleAnalyze(preset.text);
                }}
                className="px-3 py-1.5 rounded-xl bg-surface-50 hover:bg-surface-100 border border-white/10 hover:border-purple-400/40 text-xs text-slate-300 hover:text-white transition-all"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-2">
          <button
            onClick={() => handleAnalyze()}
            disabled={isAnalyzing || !inputPrompt.trim()}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-display font-bold text-xs uppercase tracking-wider shadow-glow-purple disabled:opacity-50 transition-all flex items-center gap-2"
          >
            {isAnalyzing ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin" />
                <span>Analyzing Telemetry...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate Emergency Triage</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Structured Triage Output */}
      {triageResult && (
        <div className="rounded-3xl bg-[#0B101B]/95 backdrop-blur-xl border border-purple-500/30 p-6 lg:p-8 shadow-glass-panel space-y-6 animate-scaleUp">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400 block mb-1">
                Structured Triage Assessment
              </span>
              <h2 className="text-xl sm:text-2xl font-display font-bold text-white">
                {triageResult.incidentType}
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <div className={`px-4 py-1.5 rounded-full font-mono text-xs font-bold uppercase tracking-wider border ${
                triageResult.urgency === 'Critical'
                  ? 'bg-red-500/20 text-red-400 border-red-500/40 shadow-glow-alert'
                  : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
              }`}>
                URGENCY: {triageResult.urgency}
              </div>

              <button
                onClick={() => {
                  soundManager.playEmergencyAlert();
                  setEmergencyModalOpen(true);
                }}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-display font-bold text-xs uppercase tracking-wider shadow-glow-alert transition-all flex items-center gap-2"
              >
                <AlertOctagon className="w-4 h-4" />
                <span>Deploy SOS Mode</span>
              </button>
            </div>
          </div>

          {/* Location & Hazard factors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-surface-100/60 border border-white/5 space-y-2">
              <span className="text-[10px] font-mono uppercase text-slate-400 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-cyan" /> Pinned Location Coordinates
              </span>
              <p className="text-xs font-medium text-white">
                {triageResult.detectedLocation}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-surface-100/60 border border-white/5 space-y-2">
              <span className="text-[10px] font-mono uppercase text-slate-400 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-purple-400" /> Triage Timestamp
              </span>
              <p className="text-xs font-medium text-white">
                Real-time generated • Protocol Revision 1.0
              </p>
            </div>
          </div>

          {/* Key Information & Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Key Info */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono uppercase text-slate-300 tracking-wider flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>Key Information for Responders</span>
              </h3>
              <div className="space-y-2">
                {triageResult.keyInformation.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-surface-50 border border-white/5 text-xs text-slate-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan mt-1.5 shrink-0" />
                    <span className="leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Steps */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono uppercase text-slate-300 tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Recommended Immediate Actions</span>
              </h3>
              <div className="space-y-2">
                {triageResult.recommendedSteps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-surface-50 border border-white/5 text-xs text-slate-200">
                    <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Dispatcher Verbal Script */}
          <div className="rounded-2xl bg-purple-950/40 border border-purple-500/30 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-purple-300 tracking-wider flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-purple-400" />
                <span>First Responder Verbal Briefing Script</span>
              </span>
              <button
                onClick={handleCopyScript}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-200 text-xs font-mono transition-colors"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copied ? 'Copied' : 'Copy Script'}</span>
              </button>
            </div>
            <div className="p-3.5 rounded-xl bg-black/50 border border-purple-500/20 font-mono text-xs text-purple-100 leading-relaxed">
              "{triageResult.responderScript}"
            </div>
          </div>

          {/* Medical & Safety Disclaimer */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 flex items-start gap-3 text-xs text-slate-400">
            <HelpCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">{triageResult.medicalDisclaimer}</p>
          </div>
        </div>
      )}
    </div>
  );
};
