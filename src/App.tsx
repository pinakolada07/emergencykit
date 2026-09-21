import React from 'react';
import { EmergencyProvider } from './context/EmergencyContext';
import { AppShell } from './components/layout/AppShell';

export const App: React.FC = () => {
  return (
    <EmergencyProvider>
      <AppShell />
    </EmergencyProvider>
  );
};

export default App;
