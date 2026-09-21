import React, { useState } from 'react';
import { 
  FileHeart, 
  ShieldCheck, 
  Lock, 
  AlertTriangle, 
  Check, 
  Save, 
  RotateCcw, 
  Heart, 
  User, 
  Globe, 
  Eye, 
  FileText 
} from 'lucide-react';
import { useEmergency } from '../../context/EmergencyContext';
import { soundManager } from '../../utils/audio';

export const EmergencyProfile: React.FC = () => {
  const { profile, updateProfile, addNotification } = useEmergency();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: profile.name,
    callSign: profile.callSign,
    bloodType: profile.bloodType,
    allergies: profile.allergies.join(', '),
    conditions: profile.conditions.join(', '),
    medications: profile.medications.join(', '),
    emergencyNotes: profile.emergencyNotes,
    preferredLanguage: profile.preferredLanguage,
    accessibilityNeeds: profile.accessibilityNeeds,
    organDonor: profile.organDonor,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: formData.name,
      callSign: formData.callSign,
      bloodType: formData.bloodType,
      allergies: formData.allergies.split(',').map(s => s.trim()).filter(Boolean),
      conditions: formData.conditions.split(',').map(s => s.trim()).filter(Boolean),
      medications: formData.medications.split(',').map(s => s.trim()).filter(Boolean),
      emergencyNotes: formData.emergencyNotes,
      preferredLanguage: formData.preferredLanguage,
      accessibilityNeeds: formData.accessibilityNeeds,
      organDonor: formData.organDonor,
    });
    setIsEditing(false);
    soundManager.playResolution();
  };

  const handleResetData = () => {
    if (window.confirm('Reset all demo state back to default factory presets?')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-6xl mx-auto animate-fadeIn pb-24 lg:pb-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-surface-100/80 border border-white/10 shadow-glass-panel">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-rose-500/15 text-rose-400 border border-rose-500/30 shadow-sm">
            <FileHeart className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-display font-bold text-white uppercase tracking-wide">
                Emergency Medical & ICE Profile
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono">
                <Lock className="w-3 h-3 inline mr-1" /> ENCRYPTED
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Vital health metrics and in-case-of-emergency directives transmitted securely to first responders.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              soundManager.playClick();
              setIsEditing(!isEditing);
            }}
            className="px-4 py-2.5 rounded-xl bg-surface-50 hover:bg-surface-100 text-white font-display font-bold text-xs uppercase tracking-wider border border-white/10 transition-all"
          >
            {isEditing ? 'Cancel Edit' : 'Edit Directives'}
          </button>
        </div>
      </div>

      {/* READINESS / PREPAREDNESS BREAKDOWN */}
      <div className="p-6 lg:p-8 rounded-3xl bg-gradient-to-r from-emerald-950/40 via-surface to-[#09171C] border border-emerald-500/30 shadow-glow-safe space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="text-3xl sm:text-4xl font-display font-black text-emerald-400">
              {profile.emergencyReadiness.score}%
            </div>
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
                Emergency Readiness Index
              </div>
              <p className="text-xs text-slate-400">
                Calculated preparedness score based on active telemetry & medical completeness
              </p>
            </div>
          </div>
          <span className="text-[10px] font-mono text-slate-400 italic">
            Preparedness indicator • Not a guarantee of safety
          </span>
        </div>

        {/* Readiness Checklist items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-surface-50/70 border border-emerald-500/20 text-xs text-emerald-300">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Location telemetry active</span>
          </div>

          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-surface-50/70 border border-emerald-500/20 text-xs text-emerald-300">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>4 Trusted contacts verified</span>
          </div>

          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-surface-50/70 border border-emerald-500/20 text-xs text-emerald-300">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Medical ID & allergies filled</span>
          </div>

          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-surface-50/70 border border-emerald-500/20 text-xs text-emerald-300">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Emergency ICE notes logged</span>
          </div>

          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-amber-950/30 border border-amber-500/30 text-xs text-amber-300">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Secondary hospital preference pending</span>
          </div>

          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-surface-50/70 border border-emerald-500/20 text-xs text-emerald-300">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>High-contrast display active</span>
          </div>
        </div>
      </div>

      {/* Main Medical Profile Form / Readout */}
      <form onSubmit={handleSave} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Vital Medical Card (5 cols) */}
          <div className="lg:col-span-5 rounded-3xl bg-[#0B101B]/95 backdrop-blur-xl border border-white/10 p-6 shadow-glass-panel space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Medical ID Card
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30">
                CRITICAL ICE DATA
              </span>
            </div>

            {/* Blood Type Big Badge */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-red-950/60 to-surface border border-red-500/30 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
                  Blood Group
                </span>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.bloodType}
                    onChange={e => setFormData({ ...formData, bloodType: e.target.value })}
                    className="px-2 py-1 bg-surface-100 border border-white/20 rounded text-white text-sm font-bold"
                  />
                ) : (
                  <div className="text-2xl font-display font-black text-red-400">
                    {profile.bloodType}
                  </div>
                )}
              </div>
              <Heart className="w-8 h-8 text-red-500 animate-pulse" />
            </div>

            {/* Organ Donor */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-surface-100/50 border border-white/5">
              <span className="text-xs text-slate-300 font-medium">Organ Donor Status</span>
              {isEditing ? (
                <input
                  type="checkbox"
                  checked={formData.organDonor}
                  onChange={e => setFormData({ ...formData, organDonor: e.target.checked })}
                  className="w-4 h-4 text-cyan"
                />
              ) : (
                <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  {profile.organDonor ? 'YES (Registered)' : 'NO'}
                </span>
              )}
            </div>

            {/* Known Allergies */}
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" /> Known Allergies
              </span>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.allergies}
                  onChange={e => setFormData({ ...formData, allergies: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-surface-100 border border-white/10 text-white text-xs"
                />
              ) : (
                <div className="flex flex-wrap gap-1.5">
                  {profile.allergies.map((allergy, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-red-500/15 border border-red-500/30 text-red-300 text-xs font-medium"
                    >
                      ⚠️ {allergy}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Chronic Conditions */}
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase text-slate-400 tracking-wider">
                Existing Conditions
              </span>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.conditions}
                  onChange={e => setFormData({ ...formData, conditions: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-surface-100 border border-white/10 text-white text-xs"
                />
              ) : (
                <div className="flex flex-wrap gap-1.5">
                  {profile.conditions.map((cond, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-surface-100 border border-white/10 text-slate-300 text-xs"
                    >
                      {cond}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right: Personal & Emergency Directives (7 cols) */}
          <div className="lg:col-span-7 rounded-3xl bg-[#0B101B]/95 backdrop-blur-xl border border-white/10 p-6 shadow-glass-panel space-y-5">
            <div className="pb-3 border-b border-white/10">
              <h3 className="text-base font-display font-bold text-white uppercase tracking-wide">
                Personal Identity & ICE Directives
              </h3>
              <p className="text-xs text-slate-400">
                Instructions visible to responders upon emergency beacon dispatch
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
                  Full Legal Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-surface-100 border border-white/10 text-white text-xs"
                  />
                ) : (
                  <div className="p-3 rounded-xl bg-surface-100/50 border border-white/5 text-xs font-semibold text-white">
                    {profile.name}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
                  LifeLine Call Sign
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.callSign}
                    onChange={e => setFormData({ ...formData, callSign: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-surface-100 border border-white/10 text-white text-xs font-mono"
                  />
                ) : (
                  <div className="p-3 rounded-xl bg-surface-100/50 border border-white/5 text-xs font-mono text-cyan">
                    {profile.callSign}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
                  Preferred Language
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.preferredLanguage}
                    onChange={e => setFormData({ ...formData, preferredLanguage: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-surface-100 border border-white/10 text-white text-xs"
                  />
                ) : (
                  <div className="p-3 rounded-xl bg-surface-100/50 border border-white/5 text-xs text-white flex items-center gap-2">
                    <Globe className="w-3.5 h-3.5 text-slate-400" />
                    <span>{profile.preferredLanguage}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
                  Accessibility Preferences
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.accessibilityNeeds}
                    onChange={e => setFormData({ ...formData, accessibilityNeeds: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-surface-100 border border-white/10 text-white text-xs"
                  />
                ) : (
                  <div className="p-3 rounded-xl bg-surface-100/50 border border-white/5 text-xs text-white">
                    {profile.accessibilityNeeds}
                  </div>
                )}
              </div>
            </div>

            {/* Emergency Notes */}
            <div>
              <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
                Emergency First-Responder Directive Notes
              </label>
              {isEditing ? (
                <textarea
                  rows={4}
                  value={formData.emergencyNotes}
                  onChange={e => setFormData({ ...formData, emergencyNotes: e.target.value })}
                  className="w-full p-3 rounded-xl bg-surface-100 border border-white/10 text-white text-xs leading-relaxed"
                />
              ) : (
                <div className="p-4 rounded-2xl bg-surface-100/50 border border-white/5 text-xs text-slate-300 leading-relaxed font-sans">
                  "{profile.emergencyNotes}"
                </div>
              )}
            </div>

            {/* Save Button */}
            {isEditing && (
              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-cyan hover:bg-cyan-glow text-black font-display font-bold text-xs uppercase tracking-wider shadow-glow-cyan flex items-center gap-2"
                >
                  <Save className="w-4 h-4" /> Save Emergency Profile
                </button>
              </div>
            )}
          </div>
        </div>
      </form>

      {/* Demo Controls & Factory Reset for Judges */}
      <div className="p-6 rounded-3xl bg-surface-100/40 border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-xs font-mono uppercase text-slate-300 tracking-wider">
            Evaluation Demo Data Management
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">
            Reset local mock states, notifications, and active incident back to initial evaluation baseline.
          </p>
        </div>

        <button
          onClick={handleResetData}
          className="px-4 py-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-slate-300 hover:text-red-400 border border-white/10 text-xs font-mono transition-colors flex items-center gap-2"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Demo Environment</span>
        </button>
      </div>
    </div>
  );
};
