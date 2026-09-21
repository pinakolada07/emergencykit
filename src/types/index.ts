export type EmergencyCategory = 
  | 'medical' 
  | 'accident' 
  | 'fire' 
  | 'crime' 
  | 'lost' 
  | 'other';

export type IncidentStatus = 
  | 'detected' 
  | 'location_captured' 
  | 'help_requested' 
  | 'contacts_alerted' 
  | 'coordinating' 
  | 'resolved' 
  | 'cancelled';

export type IncidentPriority = 'critical' | 'high' | 'medium' | 'low';

export interface TimelineStep {
  id: number;
  label: string;
  status: 'completed' | 'in_progress' | 'pending';
  timestamp?: string;
  detail?: string;
}

export interface EventLog {
  id: string;
  time: string;
  message: string;
  type: 'system' | 'ai' | 'contact' | 'facility';
}

export interface Incident {
  id: string;
  title: string;
  type: EmergencyCategory;
  status: IncidentStatus;
  priority: IncidentPriority;
  location: {
    name: string;
    lat: number;
    lng: number;
    accuracyMeters: number;
  };
  createdAt: string;
  resolvedAt?: string;
  description: string;
  timeline: TimelineStep[];
  contactsAlerted: string[];
  assignedFacility?: {
    id: string;
    name: string;
    type: string;
    etaMinutes: number;
    distanceKm: number;
    phone: string;
  };
  aiAnalysis?: {
    urgency: string;
    hazardFactors: string[];
    recommendedSteps: string[];
    responderScript: string;
  };
  eventLogs: EventLog[];
}

export type FacilityType = 'hospital' | 'police' | 'fire_station' | 'pharmacy' | 'safe_zone';

export interface Facility {
  id: string;
  name: string;
  type: FacilityType;
  lat: number;
  lng: number;
  distanceKm: number;
  etaMinutes: number;
  address: string;
  phone: string;
  available: boolean;
  emergencyCapacity: string;
  specialties: string[];
  rating: number;
}

export interface TrustedContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  email: string;
  avatar: string;
  status: 'available' | 'busy' | 'offline';
  lastAlertStatus: 'none' | 'alerted' | 'acknowledged' | 'en_route';
  lastAlertTime?: string;
  isPrimary: boolean;
}

export interface AITriageResult {
  incidentType: string;
  urgency: 'Critical' | 'High' | 'Medium' | 'Low';
  detectedLocation: string;
  keyInformation: string[];
  recommendedSteps: string[];
  responderScript: string;
  medicalDisclaimer: string;
  timestamp: string;
}

export interface UserProfile {
  name: string;
  callSign: string;
  bloodType: string;
  allergies: string[];
  conditions: string[];
  medications: string[];
  emergencyNotes: string;
  preferredLanguage: string;
  accessibilityNeeds: string;
  organDonor: boolean;
  emergencyReadiness: {
    score: number;
    breakdown: {
      locationEnabled: boolean;
      contactsAdded: boolean;
      profileCompleted: boolean;
      medicalCardReady: boolean;
      preferencesConfigured: boolean;
    };
  };
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'alert' | 'success' | 'info' | 'warning';
  read: boolean;
  linkPage?: string;
}

export type ActiveTab = 
  | 'overview' 
  | 'emergency' 
  | 'map' 
  | 'contacts' 
  | 'incidents' 
  | 'ai' 
  | 'analytics' 
  | 'profile';
