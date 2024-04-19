import React, { createContext, useContext, ReactNode, useState } from 'react';

interface NavigationTab {
  label: string;
  icon: string;
  route: string;
}

interface NavigationContextValue {
  sideNavigation: NavigationTab[];
  topNavigation: NavigationTab[];
  currentSidebarTab: string;
  currentSidebarSubTab: string;
  currentContentTab: string;
  handleUpdateCurrentSidebarTab: (text: string) => void;
  handleUpdateCurrentSidebarSubTab: (text: string) => void;
  handleUpdateCurrentContentTab: (text: string) => void;
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

  const [currentSidebarTab, setCurrentSidebarTab] = useState<string>('home')
  const [currentSidebarSubTab, setCurrentSidebarSubTab] = useState<string>('home')
  const [currentContentTab, setCurrentContentTab] = useState<string>('home')

  const handleUpdateCurrentSidebarTab = (text: string) => {
    setCurrentSidebarTab(text)
  }

  const handleUpdateCurrentSidebarSubTab = (text: string) => {
    setCurrentSidebarSubTab(text)
  }

  const handleUpdateCurrentContentTab = (text: string) => {
    setCurrentContentTab(text)
  }


  const value: NavigationContextValue = { 
                                          sideNavigation, 
                                          topNavigation,
                                          currentSidebarTab,
                                          currentSidebarSubTab,
                                          currentContentTab,
                                          handleUpdateCurrentSidebarTab,
                                          handleUpdateCurrentSidebarSubTab,
                                          handleUpdateCurrentContentTab
                                         };

  return <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>;
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};