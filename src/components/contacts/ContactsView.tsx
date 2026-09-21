import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  Bell, 
  Phone, 
  MessageSquare, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  AlertOctagon, 
  Send,
  X
} from 'lucide-react';
import { useEmergency } from '../../context/EmergencyContext';
import { soundManager } from '../../utils/audio';
import { AddContactModal } from './AddContactModal';

export const ContactsView: React.FC = () => {
  const { 
    contacts, 
    alertContact, 
    callContact, 
    messageContact, 
    addContact,
    addNotification 
  } = useEmergency();

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [activeMessageContactId, setActiveMessageContactId] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');

  const handleAlertAll = () => {
    soundManager.playEmergencyAlert();
    contacts.forEach(c => alertContact(c.id));
    addNotification(
      'Broadcast Alert Dispatched',
      'High-priority emergency status sent to all trusted tier contacts.',
      'alert',
      'contacts'
    );
  };

  const handleSendMessage = (e: React.FormEvent, id: string) => {
    e.preventDefault();
    if (!messageText.trim()) return;
    messageContact(id, messageText);
    setMessageText('');
    setActiveMessageContactId(null);
  };

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-6xl mx-auto animate-fadeIn pb-24 lg:pb-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-surface-100/80 border border-white/10 shadow-glass-panel">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-cyan/15 text-cyan border border-cyan/30 shadow-glow-cyan-sm">
            <Users className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-display font-bold text-white uppercase tracking-wide">
                Trusted Contacts
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-cyan/15 text-cyan border border-cyan/30 text-xs font-mono">
                {contacts.length} Linked
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Your designated tier of emergency contacts who receive automatic telemetry & alerts.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleAlertAll}
            className="px-4 py-2.5 rounded-xl bg-red-950/60 hover:bg-red-900/60 border border-alert/50 hover:border-alert text-alert font-display font-bold text-xs uppercase tracking-wider shadow-sm transition-all flex items-center gap-2"
          >
            <AlertOctagon className="w-4 h-4" />
            <span>Alert All Contacts</span>
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              setAddModalOpen(true);
            }}
            className="px-4 py-2.5 rounded-xl bg-cyan hover:bg-cyan-glow text-black font-display font-bold text-xs uppercase tracking-wider shadow-glow-cyan transition-all flex items-center gap-2"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add Contact</span>
          </button>
        </div>
      </div>

      {/* Contacts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {contacts.map(contact => {
          const isAlerted = contact.lastAlertStatus === 'alerted';
          const isAck = contact.lastAlertStatus === 'acknowledged';

          return (
            <div
              key={contact.id}
              className={`relative rounded-3xl bg-[#0B101B]/90 backdrop-blur-xl border p-5 shadow-glass-panel space-y-4 transition-all ${
                isAlerted
                  ? 'border-alert shadow-glow-alert'
                  : isAck
                  ? 'border-safe shadow-glow-safe'
                  : 'border-white/10 hover:border-white/20'
              }`}
            >
              {/* Primary badge */}
              {contact.isPrimary && (
                <div className="absolute top-4 right-4 text-[9px] font-mono uppercase px-2 py-0.5 rounded-full bg-cyan/15 text-cyan border border-cyan/30 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Primary Contact
                </div>
              )}

              {/* Avatar + Info */}
              <div className="flex items-start gap-4">
                <div className="relative">
                  <img
                    src={contact.avatar}
                    alt={contact.name}
                    className="w-14 h-14 rounded-2xl object-cover border border-white/10"
                  />
                  <span
                    className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-[#0B101B] ${
                      contact.status === 'available' ? 'bg-safe' : 'bg-warning'
                    }`}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-display font-bold text-white truncate">
                      {contact.name}
                    </h3>
                  </div>

                  <div className="text-xs text-slate-300 font-medium">
                    {contact.relationship}
                  </div>

                  <div className="text-[11px] font-mono text-slate-400 mt-1">
                    {contact.phone}
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-surface-50 border border-white/5 text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-safe animate-pulse" />
                      {contact.status}
                    </span>

                    {contact.lastAlertStatus !== 'none' && (
                      <span className={`inline-flex items-center gap-1 text-[10px] font-mono uppercase px-2 py-0.5 rounded ${
                        isAlerted
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                          : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      }`}>
                        {isAlerted ? '● Alerted (Pending)' : '✓ Acknowledged'}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Message Drawer if toggled */}
              {activeMessageContactId === contact.id && (
                <form
                  onSubmit={e => handleSendMessage(e, contact.id)}
                  className="p-3 rounded-2xl bg-surface-50 border border-white/10 space-y-2 animate-fadeIn"
                >
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>Quick Emergency Message</span>
                    <button
                      type="button"
                      onClick={() => setActiveMessageContactId(null)}
                      className="text-slate-400 hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={messageText}
                      onChange={e => setMessageText(e.target.value)}
                      placeholder="e.g. Please check LifeLine telemetry map"
                      className="flex-1 px-3 py-1.5 rounded-xl bg-surface-100 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 rounded-xl bg-cyan text-black text-xs font-semibold hover:bg-cyan-glow transition-colors flex items-center gap-1"
                    >
                      <Send className="w-3 h-3" />
                    </button>
                  </div>
                </form>
              )}

              {/* Action Buttons: Alert, Call, Message */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/5">
                <button
                  onClick={() => alertContact(contact.id)}
                  className={`py-2 px-3 rounded-xl font-display font-semibold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-1.5 border ${
                    isAlerted
                      ? 'bg-alert text-white border-alert shadow-glow-alert animate-pulse'
                      : 'bg-red-950/40 hover:bg-red-900/50 text-red-300 border-red-500/30'
                  }`}
                  title="Simulate Instant High-Priority Alert"
                >
                  <Bell className="w-3.5 h-3.5" />
                  <span>{isAlerted ? 'Alerted' : 'Alert'}</span>
                </button>

                <button
                  onClick={() => callContact(contact.id)}
                  className="py-2 px-3 rounded-xl bg-surface-50 hover:bg-surface-100 text-slate-200 hover:text-white border border-white/10 font-display font-semibold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-1.5"
                  title="Simulate Voice Channel"
                >
                  <Phone className="w-3.5 h-3.5 text-cyan" />
                  <span>Call</span>
                </button>

                <button
                  onClick={() => {
                    soundManager.playClick();
                    setActiveMessageContactId(
                      activeMessageContactId === contact.id ? null : contact.id
                    );
                  }}
                  className="py-2 px-3 rounded-xl bg-surface-50 hover:bg-surface-100 text-slate-200 hover:text-white border border-white/10 font-display font-semibold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-1.5"
                  title="Send Quick SMS"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-purple-400" />
                  <span>Message</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Demo Notice */}
      <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 text-center text-xs text-slate-400 font-mono">
        Simulation Mode: Alerts, calls, and messages run through realistic telemetry simulation without contacting cellular networks.
      </div>

      {/* Add Contact Modal */}
      <AddContactModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAdd={addContact}
      />
    </div>
  );
};
