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
      icon: 'download',
      route: '/external'
    },

    {
      label: 'Claims',
      icon: 'file-text',
      route: '/claims'
    },
    {
      label: 'Follow Up',
      icon: 'repeat',
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
      label: 'Admin',
      icon: 'lock',
      route: '/tickets'
    },
    {
      label: 'Dev',
      icon: 'git-branch',
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
      icon: 'info',
      route: '/about'
    },
    {
      label: '',
      icon: 'life-buoy',
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