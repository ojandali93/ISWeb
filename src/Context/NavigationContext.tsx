import React, { createContext, useContext, ReactNode, useState } from 'react';

interface NavigationTab {
  label: string;
  icon: string;
  route: string;
}

interface NavigationContextValue {
  sideNavigation: NavigationTab[];
  topNavigation: NavigationTab[];
}

const NavigationContext = createContext<NavigationContextValue | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const sideNavigation = [
    {
      label: 'Dashboard',
      icon: 'home',
      route: '/'
    },
    {
      label: 'Historic',
      icon: 'list',
      route: '/historic'
    },
    {
      label: 'External',
      icon: 'dollar-sign',
      route: '/external'
    },
    {
      label: 'Claims',
      icon: 'hash',
      route: '/claims'
    },
    {
      label: 'Follow Up',
      icon: 'rotate-cw',
      route: '/follow-up'
    },
    {
      label: 'Accounts',
      icon: 'users',
      route: '/accounts'
    },
    {
      label: 'Tickets',
      icon: 'layers',
      route: '/tickets'
    },
    {
      label: 'Intellachat AI',
      icon: 'zap',
      route: '/intellachat'
    },
  ];

  const topNavigation = [
    {
      label: '',
      icon: 'help-circle',
      route: '/help'
    },
    {
      label: '',
      icon: 'sliders',
      route: '/settings'
    },
    {
      label: '',
      icon: 'log-out',
      route: '/auth/logout'
    },
  ];

  const [selectedNavTab, setSelectedNavTab] = useState('')

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