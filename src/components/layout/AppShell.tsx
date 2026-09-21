import React from 'react';
import { useEmergency } from '../../context/EmergencyContext';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { MobileNav } from './MobileNav';
import { CommandPalette } from './CommandPalette';
import { EmergencyModal } from '../emergency/EmergencyModal';
import { CallSimulationModal } from '../common/CallSimulationModal';

import { OverviewDashboard } from '../dashboard/OverviewDashboard';
import { EmergencyActiveView } from '../emergency/EmergencyActiveView';
import { LiveMap } from '../map/LiveMap';
import { ContactsView } from '../contacts/ContactsView';
import { IncidentsList } from '../incidents/IncidentsList';
import { AIAssistant } from '../ai/AIAssistant';
import { AnalyticsDashboard } from '../analytics/AnalyticsDashboard';
import { EmergencyProfile } from '../profile/EmergencyProfile';
import { LandingPage } from '../landing/LandingPage';

export const AppShell: React.FC = () => {
  const { activeTab, landingMode } = useEmergency();

  if (landingMode) {
    return <LandingPage />;
  }

  const renderActiveView = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewDashboard />;
      case 'emergency':
        return <EmergencyActiveView />;
      case 'map':
        return <LiveMap />;
      case 'contacts':
        return <ContactsView />;
      case 'incidents':
        return <IncidentsList />;
      case 'ai':
        return <AIAssistant />;
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'profile':
        return <EmergencyProfile />;
      default:
        return <OverviewDashboard />;
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#06080C] bg-tactical-grid bg-radial-vignette text-slate-100 font-sans select-none">
      {/* Desktop Left Sidebar */}
      <Sidebar />

      {/* Main Operations Body */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Command Bar */}
        <TopBar />

        {/* Scrollable Viewport */}
        <main className="flex-1 overflow-y-auto relative z-0">
          {renderActiveView()}
        </main>

        {/* Mobile-first Bottom Navigation */}
        <MobileNav />
      </div>

      {/* Global Modals & Overlays */}
      <CommandPalette />
      <EmergencyModal />
      <CallSimulationModal />
    </div>
  );
};
