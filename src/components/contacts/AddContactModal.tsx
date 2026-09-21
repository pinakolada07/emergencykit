import React, { useState } from 'react';
import { X, UserPlus, ShieldCheck } from 'lucide-react';
import { TrustedContact } from '../../types';
import { soundManager } from '../../utils/audio';

interface AddContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (contact: Omit<TrustedContact, 'id'>) => void;
}

export const AddContactModal: React.FC<AddContactModalProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState('Emergency Contact');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [isPrimary, setIsPrimary] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    onAdd({
      name,
      relationship,
      phone,
      email: email || `${name.toLowerCase().replace(/\s+/g, '')}@lifenet.org`,
      avatar: `https://images.unsplash.com/photo-${1534528741775 + Math.floor(Math.random() * 500)}?w=150&auto=format&fit=crop&q=80`,
      status: 'available',
      lastAlertStatus: 'none',
      isPrimary,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md rounded-3xl bg-[#0B101B] border border-cyan/30 shadow-2xl p-6 overflow-hidden">
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
          <div className="flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-cyan" />
            <h3 className="text-base font-display font-bold text-white uppercase tracking-wide">
              Add Trusted Contact
            </h3>
          </div>
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-mono uppercase text-slate-400 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Maya Lin"
              className="w-full px-3.5 py-2.5 rounded-xl bg-surface-100 border border-white/10 text-white focus:outline-none focus:border-cyan"
            />
          </div>

          <div>
            <label className="block font-mono uppercase text-slate-400 mb-1">
              Relationship / Role
            </label>
            <input
              type="text"
              value={relationship}
              onChange={e => setRelationship(e.target.value)}
              placeholder="e.g. Sister, Roommate, Colleague"
              className="w-full px-3.5 py-2.5 rounded-xl bg-surface-100 border border-white/10 text-white focus:outline-none focus:border-cyan"
            />
          </div>

          <div>
            <label className="block font-mono uppercase text-slate-400 mb-1">
              Phone Number *
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="+1 (555) 000-0000"
              className="w-full px-3.5 py-2.5 rounded-xl bg-surface-100 border border-white/10 text-white focus:outline-none focus:border-cyan font-mono"
            />
          </div>

          <div>
            <label className="block font-mono uppercase text-slate-400 mb-1">
              Encrypted Email (Optional)
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="maya@network.org"
              className="w-full px-3.5 py-2.5 rounded-xl bg-surface-100 border border-white/10 text-white focus:outline-none focus:border-cyan"
            />
          </div>

          <label className="flex items-center gap-2.5 p-3 rounded-xl bg-surface-50 border border-white/5 cursor-pointer">
            <input
              type="checkbox"
              checked={isPrimary}
              onChange={e => setIsPrimary(e.target.checked)}
              className="w-4 h-4 rounded text-cyan focus:ring-0"
            />
            <span className="text-slate-300">
              Designate as Primary Priority Contact (first contacted in SOS)
            </span>
          </label>

          <div className="flex items-center gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl bg-surface-100 hover:bg-surface-50 text-white font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-cyan hover:bg-cyan-glow text-black font-display font-bold uppercase tracking-wider shadow-glow-cyan transition-all"
            >
              Save Contact
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
