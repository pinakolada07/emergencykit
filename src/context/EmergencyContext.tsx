import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { 
  ActiveTab, 
  EmergencyCategory, 
  Incident, 
  TrustedContact, 
  Facility, 
  UserProfile, 
  NotificationItem, 
  TimelineStep 
} from '../types';
import { initialProfile, initialContacts, initialFacilities, initialIncidents, initialNotifications } from '../data/mockData';
import { soundManager } from '../utils/audio';
import confetti from 'canvas-confetti';

interface EmergencyContextType {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  isEmergencyActive: boolean;
  activeIncident: Incident | null;
  incidents: Incident[];
  contacts: TrustedContact[];
  facilities: Facility[];
  profile: UserProfile;
  notifications: NotificationItem[];
  commandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;
  emergencyModalOpen: boolean;
  setEmergencyModalOpen: (open: boolean) => void;
  selectedIncidentId: string | null;
  setSelectedIncidentId: (id: string | null) => void;
  selectedFacility: Facility | null;
  setSelectedFacility: (facility: Facility | null) => void;
  soundEnabled: boolean;
  toggleSound: () => void;
  timeElapsed: number;
  triggerEmergency: (category: EmergencyCategory, locationNote?: string, selectedContactIds?: string[]) => void;
  resolveEmergency: () => void;
  cancelEmergency: () => void;
  alertContact: (id: string) => void;
  callContact: (id: string) => void;
  messageContact: (id: string, text: string) => void;
  addContact: (contact: Omit<TrustedContact, 'id'>) => void;
  updateProfile: (updated: Partial<UserProfile>) => void;
  markNotificationRead: (id: string) => void;
  clearNotifications: () => void;
  addNotification: (title: string, message: string, type: 'alert' | 'success' | 'info' | 'warning', linkPage?: string) => void;
  runShowcaseScenario: () => void;
  isDemoRunning: boolean;
  demoStepMessage: string;
  landingMode: boolean;
  setLandingMode: (mode: boolean) => void;
  showCallModal: boolean;
  activeCallContact: TrustedContact | null;
  closeCallModal: () => void;
}

const EmergencyContext = createContext<EmergencyContextType | undefined>(undefined);

export const EmergencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [isEmergencyActive, setIsEmergencyActive] = useState<boolean>(false);
  const [activeIncident, setActiveIncident] = useState<Incident | null>(null);
  const [incidents, setIncidents] = useState<Incident[]>(() => {
    const saved = localStorage.getItem('lifeline_incidents');
    return saved ? JSON.parse(saved) : initialIncidents;
  });
  const [contacts, setContacts] = useState<TrustedContact[]>(() => {
    const saved = localStorage.getItem('lifeline_contacts');
    return saved ? JSON.parse(saved) : initialContacts;
  });
  const [facilities] = useState<Facility[]>(initialFacilities);
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('lifeline_profile');
    return saved ? JSON.parse(saved) : initialProfile;
  });
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('lifeline_notifications');
    return saved ? JSON.parse(saved) : initialNotifications;
  });

  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [emergencyModalOpen, setEmergencyModalOpen] = useState(false);
  const [selectedIncidentId, setSelectedIncidentId] = useState<string | null>(null);
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isDemoRunning, setIsDemoRunning] = useState(false);
  const [demoStepMessage, setDemoStepMessage] = useState('');
  const [landingMode, setLandingMode] = useState(false);
  
  const [showCallModal, setShowCallModal] = useState(false);
  const [activeCallContact, setActiveCallContact] = useState<TrustedContact | null>(null);

  useEffect(() => {
    localStorage.setItem('lifeline_incidents', JSON.stringify(incidents));
  }, [incidents]);

  useEffect(() => {
    localStorage.setItem('lifeline_contacts', JSON.stringify(contacts));
  }, [contacts]);

  useEffect(() => {
    localStorage.setItem('lifeline_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('lifeline_notifications', JSON.stringify(notifications));
  }, [notifications]);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundManager.setSoundEnabled(next);
    if (next) soundManager.playClick();
  };

  useEffect(() => {
    let interval: any;
    if (isEmergencyActive) {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    } else {
      setTimeElapsed(0);
    }
    return () => clearInterval(interval);
  }, [isEmergencyActive]);

  const addNotification = useCallback((title: string, message: string, type: 'alert' | 'success' | 'info' | 'warning', linkPage?: string) => {
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title,
      message,
      timestamp: 'Just now',
      type,
      read: false,
      linkPage
    };
    setNotifications(prev => [newNotif, ...prev.slice(0, 19)]);
  }, []);

  const alertContact = useCallback((id: string) => {
    soundManager.playClick();
    setContacts(prev => prev.map(c => {
      if (c.id === id) {
        return { ...c, lastAlertStatus: 'alerted', lastAlertTime: 'Just now' };
      }
      return c;
    }));

    const contact = contacts.find(c => c.id === id);
    const contactName = contact?.name || 'Contact';

    addNotification(
      `Alert Sent: ${contactName}`,
      `Simulated high-priority push alert broadcasted to ${contactName}.`,
      'info',
      'contacts'
    );

    setTimeout(() => {
      setContacts(prev => prev.map(c => {
        if (c.id === id) {
          return { ...c, lastAlertStatus: 'acknowledged' };
        }
        return c;
      }));
      soundManager.playSonar();
      addNotification(
        `Acknowledged: ${contactName}`,
        `${contactName} acknowledged your emergency status and is monitoring your live telemetry.`,
        'success',
        'contacts'
      );
    }, 4500);
  }, [contacts, addNotification]);

  const callContact = useCallback((id: string) => {
    const c = contacts.find(item => item.id === id);
    if (c) {
      setActiveCallContact(c);
      setShowCallModal(true);
      soundManager.playSonar();
    }
  }, [contacts]);

  const closeCallModal = () => {
    setShowCallModal(false);
    setActiveCallContact(null);
  };

  const messageContact = useCallback((id: string, text: string) => {
    const c = contacts.find(item => item.id === id);
    const name = c?.name || 'Contact';
    soundManager.playClick();
    addNotification(
      `Message Dispatched to ${name}`,
      `"${text.substring(0, 45)}..." sent via encrypted satellite channel.`,
      'info',
      'contacts'
    );
  }, [contacts, addNotification]);

  const addContact = (contactData: Omit<TrustedContact, 'id'>) => {
    const newContact: TrustedContact = {
      ...contactData,
      id: `tc-${Date.now()}`,
    };
    setContacts(prev => [newContact, ...prev]);
    soundManager.playClick();
    addNotification('Contact Added', `${newContact.name} added to your trusted emergency tier.`, 'success', 'contacts');
  };

  const updateProfile = (updated: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...updated }));
    soundManager.playClick();
    addNotification('Profile Updated', 'Emergency medical and ICE directives saved securely.', 'success', 'profile');
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const triggerEmergency = useCallback((category: EmergencyCategory, locationNote?: string, selectedContactIds?: string[]) => {
    const incidentId = `LF-${Math.floor(1000 + Math.random() * 9000)}`;
    const categoryTitles: Record<EmergencyCategory, string> = {
      medical: 'Acute Medical Crisis & Triage Required',
      accident: 'Vehicle Collision & Roadway Emergency',
      fire: 'Thermal Hazard & Fire Extrication',
      crime: 'Threat to Personal Safety / Critical Alert',
      lost: 'Stranded / Disoriented in Hazardous Conditions',
      other: 'Priority SOS Alert — Rapid Response'
    };

    const targetContacts = contacts.filter(c => 
      selectedContactIds && selectedContactIds.length > 0 
        ? selectedContactIds.includes(c.id) 
        : c.isPrimary || c.relationship === 'Mother'
    );

    const initialTimeline: TimelineStep[] = [
      { id: 1, label: 'Incident Detected', status: 'completed', timestamp: 'Just now', detail: 'High-urgency manual SOS protocol triggered' },
      { id: 2, label: 'Location Captured', status: 'completed', timestamp: 'Just now', detail: 'High-accuracy GPS telemetry pinned' },
      { id: 3, label: 'Help Requested', status: 'completed', timestamp: 'Just now', detail: 'Dispatched to simulated emergency dispatch' },
      { id: 4, label: 'Trusted Contacts Alerted', status: 'in_progress', timestamp: 'Just now', detail: `Notifying ${targetContacts.map(c => c.name).join(', ')}` },
      { id: 5, label: 'Assistance Coordinating', status: 'pending', detail: 'Assigning nearest emergency trauma facility' },
      { id: 6, label: 'Resolved', status: 'pending', detail: 'Standby for safety verification' },
    ];

    const newIncident: Incident = {
      id: incidentId,
      title: categoryTitles[category],
      type: category,
      status: 'help_requested',
      priority: 'critical',
      location: {
        name: locationNote || 'Mumbai Metro Corridor (High Precision Pin)',
        lat: 19.0760 + (Math.random() - 0.5) * 0.005,
        lng: 72.8777 + (Math.random() - 0.5) * 0.005,
        accuracyMeters: 3,
      },
      createdAt: 'Just now',
      description: `Emergency ${category.toUpperCase()} protocol initiated. Immediate tactical coordination underway.`,
      timeline: initialTimeline,
      contactsAlerted: targetContacts.map(c => c.name),
      assignedFacility: facilities[0],
      aiAnalysis: {
        urgency: 'Critical Priority (Alpha)',
        hazardFactors: ['Potential time-sensitive vital signs risk', 'Uncontrolled surrounding environment', 'Immediate responder access required'],
        recommendedSteps: [
          'Stay calm and remain in a safe shelter or behind safety barrier',
          'Keep your device screen on — LifeLine beacon is transmitting coordinates',
          'Prepare to state your exact location and visible landmarks to responders',
          'Keep personal medical ID card visible'
        ],
        responderScript: `LifeLine Emergency Beacon #${incidentId}: Alex Rivera reporting priority ${category} situation near ${locationNote || 'Metro Sector 4'}. Lat: 19.0760, Lng: 72.8777. Direct assistance requested.`
      },
      eventLogs: [
        { id: `el-${Date.now()}-1`, time: 'Just now', message: `SOS Protocol initiated: ${category.toUpperCase()}.`, type: 'system' },
        { id: `el-${Date.now()}-2`, time: 'Just now', message: 'High-precision telemetry coordinates pinned.', type: 'system' },
        { id: `el-${Date.now()}-3`, time: 'Just now', message: 'Encrypted push alerts dispatched to trusted tier.', type: 'contact' },
      ]
    };

    setActiveIncident(newIncident);
    setIncidents(prev => [newIncident, ...prev]);
    setIsEmergencyActive(true);
    setEmergencyModalOpen(false);
    setActiveTab('emergency');
    soundManager.playEmergencyAlert();

    addNotification(
      `EMERGENCY MODE ACTIVE: ${incidentId}`,
      `Dispatched emergency beacon for ${category.toUpperCase()}. Telemetry streaming.`,
      'alert',
      'emergency'
    );

    setTimeout(() => {
      setActiveIncident(prev => {
        if (!prev) return null;
        const updatedTimeline = prev.timeline.map(step => {
          if (step.id === 4) return { ...step, status: 'completed' as const, timestamp: '1m ago' };
          if (step.id === 5) return { ...step, status: 'in_progress' as const, timestamp: 'Just now', detail: 'City General Hospital trauma team en-route' };
          return step;
        });
        return {
          ...prev,
          status: 'coordinating',
          timeline: updatedTimeline,
          eventLogs: [
            ...prev.eventLogs,
            { id: `el-${Date.now()}-4`, time: '1m ago', message: 'All primary contacts confirmed receipt of alert.', type: 'contact' },
            { id: `el-${Date.now()}-5`, time: 'Just now', message: 'City General Hospital unit assigned. ETA: 3 minutes.', type: 'facility' },
          ]
        };
      });
      soundManager.playSonar();
    }, 4500);

  }, [contacts, facilities, addNotification]);

  const resolveEmergency = useCallback(() => {
    soundManager.playResolution();
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00E599', '#00F0FF', '#38BDF8']
      });
    } catch {
      // Confetti fallback
    }

    if (activeIncident) {
      const resolvedIncident: Incident = {
        ...activeIncident,
        status: 'resolved',
        resolvedAt: 'Just now',
        timeline: activeIncident.timeline.map(step => ({ ...step, status: 'completed' as const })),
        eventLogs: [
          ...activeIncident.eventLogs,
          { id: `el-${Date.now()}-res`, time: 'Just now', message: 'Emergency marked safely resolved by user.', type: 'system' }
        ]
      };

      setIncidents(prev => prev.map(inc => inc.id === activeIncident.id ? resolvedIncident : inc));
      setActiveIncident(resolvedIncident);
    }

    setIsEmergencyActive(false);
    addNotification(
      'Emergency Resolved Safely',
      'Incident marked resolved. Live beacon transmission concluded.',
      'success',
      'incidents'
    );
  }, [activeIncident, addNotification]);

  const cancelEmergency = useCallback(() => {
    soundManager.playClick();
    if (activeIncident) {
      const cancelled: Incident = {
        ...activeIncident,
        status: 'cancelled',
        resolvedAt: 'Cancelled (1m)',
        timeline: activeIncident.timeline.map(step => step.id <= 3 ? step : { ...step, status: 'pending' as const })
      };
      setIncidents(prev => prev.map(inc => inc.id === activeIncident.id ? cancelled : inc));
      setActiveIncident(null);
    }
    setIsEmergencyActive(false);
    addNotification('Emergency Cancelled', 'Alert was cancelled. Telemetry returned to passive.', 'info', 'overview');
  }, [activeIncident, addNotification]);

  const runShowcaseScenario = useCallback(() => {
    setIsDemoRunning(true);
    setDemoStepMessage('Starting Showcase Scenario: Simulating accident detection...');
    soundManager.playSonar();

    setActiveTab('overview');
    setLandingMode(false);

    setTimeout(() => {
      setDemoStepMessage('Opening Emergency Wizard — Selecting Road Accident...');
      setEmergencyModalOpen(true);
    }, 1800);

    setTimeout(() => {
      setDemoStepMessage('Triggering SOS Telemetry with 2-Second Verification...');
      triggerEmergency('accident', 'Highway 10 North Corridor (Live Demo)');
    }, 3800);

    setTimeout(() => {
      setDemoStepMessage('AI Intelligence generating instant responder briefing...');
      setActiveTab('ai');
    }, 6500);

    setTimeout(() => {
      setDemoStepMessage('Inspecting Tactical Map: Hospitals, Police, and Rescue units...');
      setActiveTab('map');
    }, 10000);

    setTimeout(() => {
      setDemoStepMessage('Assistance coordinating: Contacts acknowledged, Hospital dispatched.');
      setActiveTab('emergency');
    }, 13500);

    setTimeout(() => {
      setDemoStepMessage('Incident stabilized — Marking safely resolved!');
      resolveEmergency();
      setIsDemoRunning(false);
      setDemoStepMessage('');
    }, 17500);

  }, [triggerEmergency, resolveEmergency]);

  return (
    <EmergencyContext.Provider
      value={{
        activeTab,
        setActiveTab,
        isEmergencyActive,
        activeIncident,
        incidents,
        contacts,
        facilities,
        profile,
        notifications,
        commandPaletteOpen,
        setCommandPaletteOpen,
        emergencyModalOpen,
        setEmergencyModalOpen,
        selectedIncidentId,
        setSelectedIncidentId,
        selectedFacility,
        setSelectedFacility,
        soundEnabled,
        toggleSound,
        timeElapsed,
        triggerEmergency,
        resolveEmergency,
        cancelEmergency,
        alertContact,
        callContact,
        messageContact,
        addContact,
        updateProfile,
        markNotificationRead,
        clearNotifications,
        addNotification,
        runShowcaseScenario,
        isDemoRunning,
        demoStepMessage,
        landingMode,
        setLandingMode,
        showCallModal,
        activeCallContact,
        closeCallModal,
      }}
    >
      {children}
    </EmergencyContext.Provider>
  );
};

export const useEmergency = () => {
  const context = useContext(EmergencyContext);
  if (!context) {
    throw new Error('useEmergency must be used within an EmergencyProvider');
  }
  return context;
};
