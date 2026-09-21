import React, { useState, useEffect } from 'react';
import { 
  AlertOctagon, 
  X, 
  MapPin, 
  Flame, 
  Car, 
  HeartPulse, 
  ShieldAlert,
  Compass, 
  HelpCircle,
  Check,
  ChevronRight,
  ChevronLeft,
  Info
} from 'lucide-react';
import { useEmergency } from '../../context/EmergencyContext';
import { EmergencyCategory } from '../../types';
import { soundManager } from '../../utils/audio';
import { HoldButton } from '../common/HoldButton';

export const EmergencyModal: React.FC = () => {
  const { 
    emergencyModalOpen, 
    setEmergencyModalOpen, 
    contacts, 
    triggerEmergency 
  } = useEmergency();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedCategory, setSelectedCategory] = useState<EmergencyCategory>('accident');
  const [locationName, setLocationName] = useState('Mumbai Metro Corridor, Sector 4');
  const [selectedContactIds, setSelectedContactIds] = useState<string[]>([]);

  // Sync contact selection whenever modal opens or contacts list changes
  useEffect(() => {
    if (emergencyModalOpen) {
      setSelectedContactIds(contacts.map(c => c.id));
      setStep(1);
    }
  }, [emergencyModalOpen, contacts]);

  if (!emergencyModalOpen) return null;

  const categories: { id: EmergencyCategory; label: string; desc: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'accident', label: 'Accident', desc: 'Vehicle collision, roadway crash, or physical impact', icon: Car },
    { id: 'medical', label: 'Medical', desc: 'Cardiac, respiratory, severe injury, or unconsciousness', icon: HeartPulse },
    { id: 'fire', label: 'Fire', desc: 'Active blaze, smoke inhalation, structural threat', icon: Flame },
    { id: 'crime', label: 'Crime / Safety', desc: 'Physical threat, burglary, harassment, assault', icon: ShieldAlert },
    { id: 'lost', label: 'Lost / Stranded', desc: 'Disoriented, extreme weather, trapped, vehicle breakdown', icon: Compass },
    { id: 'other', label: 'Other Urgent', desc: 'General priority distress requiring assistance', icon: HelpCircle },
  ];

  const handleClose = () => {
    soundManager.playClick();
    setEmergencyModalOpen(false);
    setStep(1);
  };

  const handleNext = () => {
    soundManager.playClick();
    if (step < 4) setStep((step + 1) as any);
  };

  const handleBack = () => {
    soundManager.playClick();
    if (step > 1) setStep((step - 1) as any);
  };

  const handleToggleContact = (id: string) => {
    soundManager.playClick();
    setSelectedContactIds(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const handleFinalActivation = () => {
    triggerEmergency(selectedCategory, locationName, selectedContactIds);
    setStep(1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl rounded-3xl bg-[#0B101B] border border-alert/40 shadow-glow-alert-lg overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-5 border-b border-white/10 bg-red-950/30">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-alert/20 text-alert border border-alert/30">
              <AlertOctagon className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h2 className="text-base font-display font-bold text-white tracking-wide uppercase">
                Emergency Activation Protocol
              </h2>
              <p className="text-[11px] font-mono text-slate-400">
                Step {step} of 4 • {step === 1 ? 'Incident Classification' : step === 2 ? 'Location Pin' : step === 3 ? 'Contacts Tier' : 'Final Verification'}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="w-full h-1 bg-surface-100">
          <div
            className="h-full bg-gradient-to-r from-cyan to-alert transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh] space-y-5">
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-display font-bold text-white mb-1">
                  What happened?
                </h3>
                <p className="text-xs text-slate-400">
                  Select the emergency category to calibrate AI response and responder dispatch.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {categories.map(cat => {
                  const Icon = cat.icon;
                  const isSelected = selectedCategory === cat.id;

                  return (
                    <div
                      key={cat.id}
                      onClick={() => {
                        soundManager.playClick();
                        setSelectedCategory(cat.id);
                      }}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all text-left ${
                        isSelected
                          ? 'bg-red-950/60 border-alert text-white shadow-glow-alert'
                          : 'bg-surface-100/60 border-white/5 text-slate-300 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-1.5">
                        <div className={`p-2 rounded-xl ${
                          isSelected ? 'bg-alert text-white' : 'bg-surface-50 text-slate-400'
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="font-display font-bold text-sm tracking-wide text-white">
                          {cat.label}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        {cat.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-display font-bold text-white mb-1">
                  Where are you?
                </h3>
                <p className="text-xs text-slate-400">
                  LifeLine has automatically pinned your high-precision coordinates.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-surface-100/70 border border-cyan/30 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-cyan/15 text-cyan border border-cyan/30">
                    <MapPin className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider text-cyan">
                      Detected GPS Telemetry
                    </div>
                    <div className="text-sm font-semibold text-white">
                      19.0760° N, 72.8777° E (±3m)
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
                    Landmark / Location Note
                  </label>
                  <input
                    type="text"
                    value={locationName}
                    onChange={e => setLocationName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface-50 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan"
                    placeholder="e.g. Near Main Street Crossing or Apartment 4B"
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center gap-2 text-xs text-slate-300">
                <Info className="w-4 h-4 text-cyan shrink-0" />
                <span>Nearby emergency facilities are automatically mapped within 2.5km.</span>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-display font-bold text-white mb-1">
                  Who should be alerted?
                </h3>
                <p className="text-xs text-slate-400">
                  Select which trusted contacts receive high-priority SOS notifications with live GPS.
                </p>
              </div>

              <div className="space-y-2">
                {contacts.map(contact => {
                  const isChecked = selectedContactIds.includes(contact.id);

                  return (
                    <div
                      key={contact.id}
                      onClick={() => handleToggleContact(contact.id)}
                      className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                        isChecked
                          ? 'bg-cyan/10 border-cyan/40 text-white'
                          : 'bg-surface-100/50 border-white/5 text-slate-400'
                      }`}
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
                            {contact.relationship} • {contact.phone}
                          </div>
                        </div>
                      </div>

                      <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                        isChecked ? 'bg-cyan border-cyan text-black' : 'border-white/20'
                      }`}>
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-5 text-center">
              <div>
                <h3 className="text-xl font-display font-bold text-white mb-1">
                  Ready to Initiate Protocol
                </h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  To prevent accidental activations, press and hold the button below for 2 seconds.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-surface-100/80 border border-white/10 text-left space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Incident Category:</span>
                  <span className="font-bold text-alert uppercase">{selectedCategory}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Target Location:</span>
                  <span className="text-slate-200 truncate max-w-[240px]">{locationName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Contacts Alerted:</span>
                  <span className="text-cyan font-mono">{selectedContactIds.length} Selected</span>
                </div>
              </div>

              <HoldButton
                onComplete={handleFinalActivation}
                holdDurationMs={2000}
                label="HOLD FOR 2 SECONDS TO ACTIVATE"
                sublabel="Continuous press required to verify intentional activation"
              />

              <div className="p-3 rounded-xl bg-amber-950/40 border border-warning/40 text-amber-300 text-xs font-mono leading-relaxed">
                <span className="font-bold">DEMO SIMULATION:</span> No real 911/112 emergency services will be contacted. This is a competition simulation test.
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between p-4 border-t border-white/10 bg-[#070A10]">
          {step > 1 ? (
            <button
              onClick={handleBack}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white bg-surface-100 hover:bg-surface-50 border border-white/10 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              onClick={handleNext}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-display font-bold uppercase tracking-wider text-black bg-cyan hover:bg-cyan-glow shadow-glow-cyan transition-all"
            >
              Continue <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleFinalActivation}
              className="text-xs text-slate-400 hover:text-slate-200 underline font-mono"
            >
              Instant Demo Activate (Skip Hold)
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
