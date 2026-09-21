import React from 'react';
import { 
  X, 
  MapPin, 
  Phone, 
  Navigation, 
  Shield, 
  HeartPulse, 
  Flame, 
  Pill, 
  Building, 
  Clock, 
  Star,
  CheckCircle2
} from 'lucide-react';
import { Facility } from '../../types';
import { soundManager } from '../../utils/audio';
import { useEmergency } from '../../context/EmergencyContext';

interface FacilityDetailModalProps {
  facility: Facility | null;
  onClose: () => void;
}

export const FacilityDetailModal: React.FC<FacilityDetailModalProps> = ({
  facility,
  onClose,
}) => {
  const { addNotification } = useEmergency();

  if (!facility) return null;

  const getIcon = () => {
    switch (facility.type) {
      case 'hospital': return <HeartPulse className="w-6 h-6 text-red-400" />;
      case 'police': return <Shield className="w-6 h-6 text-cyan" />;
      case 'fire_station': return <Flame className="w-6 h-6 text-amber-400" />;
      case 'pharmacy': return <Pill className="w-6 h-6 text-emerald-400" />;
      default: return <Building className="w-6 h-6 text-purple-400" />;
    }
  };

  const handleSimulateDispatch = () => {
    soundManager.playSonar();
    addNotification(
      `Telemetry Dispatched to ${facility.name}`,
      `ETA: ${facility.etaMinutes} mins. Responder coordination channel synchronized.`,
      'success',
      'map'
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#0B101B] border border-cyan/30 shadow-2xl overflow-hidden flex flex-col">
        <div className="flex items-start justify-between p-6 border-b border-white/10 bg-surface-100/50">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-surface-50 border border-white/10">
              {getIcon()}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-cyan/15 text-cyan border border-cyan/30">
                  {facility.type.replace('_', ' ')}
                </span>
                <span className="flex items-center gap-1 text-[11px] font-mono text-amber-400">
                  <Star className="w-3 h-3 fill-amber-400" /> {facility.rating}
                </span>
              </div>
              <h3 className="text-lg font-display font-bold text-white leading-snug">
                {facility.name}
              </h3>
            </div>
          </div>
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5 overflow-y-auto max-h-[60vh]">
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-surface-100/60 border border-white/5">
              <div className="text-[10px] font-mono text-slate-400 uppercase mb-1 flex items-center gap-1.5">
                <Clock className="w-3 h-3 text-cyan" /> Response Time
              </div>
              <div className="text-xl font-mono font-bold text-cyan">
                {facility.etaMinutes} mins ETA
              </div>
              <div className="text-[11px] text-slate-400">{facility.distanceKm} km away</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-surface-100/60 border border-white/5">
              <div className="text-[10px] font-mono text-slate-400 uppercase mb-1 flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Status
              </div>
              <div className="text-xl font-mono font-bold text-emerald-400">
                ACTIVE
              </div>
              <div className="text-[11px] text-slate-400 truncate">{facility.emergencyCapacity}</div>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-surface-100/40 border border-white/5">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <span className="text-slate-300">{facility.address}</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-100/40 border border-white/5">
              <Phone className="w-4 h-4 text-slate-400 shrink-0" />
              <span className="text-slate-300 font-mono">{facility.phone}</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider mb-2.5">
              Specialized Units & Facilities
            </h4>
            <div className="flex flex-wrap gap-2">
              {facility.specialties.map((spec, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg bg-surface-100 border border-white/10 text-slate-300 text-xs font-medium"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 border-t border-white/10 bg-[#070A10]">
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="flex-1 py-3 px-4 rounded-xl bg-surface-100 hover:bg-surface-50 border border-white/10 text-white text-xs font-semibold transition-colors"
          >
            Close
          </button>
          <button
            onClick={handleSimulateDispatch}
            className="flex-1 py-3 px-4 rounded-xl bg-cyan hover:bg-cyan-glow text-black font-display font-bold text-xs uppercase tracking-wider shadow-glow-cyan transition-all flex items-center justify-center gap-2"
          >
            <Navigation className="w-4 h-4" />
            <span>Route to Facility</span>
          </button>
        </div>
      </div>
    </div>
  );
};
