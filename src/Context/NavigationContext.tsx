import React, { createContext, useContext, ReactNode } from 'react';

interface NavigationTab {
  label: string;
  icon: string;
}

interface NavigationContextValue {
  sideNavigation: NavigationTab[];
  topNavigation: NavigationTab[];
}

const NavigationContext = createContext<NavigationContextValue | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const sideNavigation = [
    {
      label: 'Intellachat AI',
      icon: 'zap'
    },
    {
      label: 'Dashboard',
      icon: 'home'
    },
    {
      label: 'Historic',
      icon: 'list' // Corrected typo from 'Sheild' to 'Shield'
    },
    {
      label: 'External',
      icon: 'dollar-sign'
    },
    {
      label: 'Claims',
      icon: 'hash'
    },
    {
      label: 'Follow Up',
      icon: 'rotate-cw'
    },
    {
      label: 'Accounts',
      icon: 'users'
    },
    {
      label: 'Tickets',
      icon: 'layers'
    },
  ];

  const topNavigation = [
    {
      label: '',
      icon: 'help-circle'
    },
    {
      label: '',
      icon: 'sliders'
    },
    {
      label: '',
      icon: 'log-out'
    },
  ];

  const value: NavigationContextValue = { sideNavigation, topNavigation };

  return <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>;
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};