import React, { createContext, useContext, ReactNode, useState } from 'react';

interface NavigationTab {
  label: string;
  icon: string;
  route: string;
  page: string;
}

interface NavigationContextValue {
  sideNavigation: NavigationTab[];
  topNavigation: NavigationTab[];
  currentSidebarTab: string;
  currentSidebarType: string;
  currentSidebarSubTab: string;
  currentContentTab: string;
  handleUpdateCurrentSidebarTab: (text: string) => void;
  handleUpdateCurrentSidebarType: (text: string) => void;
  handleUpdateCurrentSidebarSubTab: (text: string) => void;
  handleUpdateCurrentContentTab: (text: string) => void;
}

const NavigationContext = createContext<NavigationContextValue | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const sideNavigation = [
    {
      label: 'Dashboard',
      icon: 'home',
      route: '/',
      page: 'table'
    },
    {
      label: 'Historic',
      icon: 'list',
      route: '/historic',
      page: 'table'
    },
    {
      label: 'External',
      icon: 'download',
      route: '/external',
      page: 'table'
    },

    {
      label: 'Claims',
      icon: 'file-text',
      route: '/claims',
      page: 'table'
    },
    {
      label: 'Follow Up',
      icon: 'repeat',
      route: '/follow-up',
      page: 'table'
    },
    {
      label: 'Accounts',
      icon: 'users',
      route: '/accounts',
      page: 'table'
    },
    {
      label: 'Tickets',
      icon: 'layers',
      route: '/tickets',
      page: 'table'
    },
    {
      label: 'Admin',
      icon: 'lock',
      route: '/admin',
      page: 'static'
    },
    {
      label: 'Dev',
      icon: 'git-branch',
      route: '/dev',
      page: 'static'
    },
    {
      label: 'Intellachat AI',
      icon: 'zap',
      route: '/intellachat',
      page: 'static'
    },
  ];

  const topNavigation = [
    {
      label: '',
      icon: 'help-circle',
      route: '/help',
      page: 'static'
    },
    {
      label: '',
      icon: 'settings',
      route: '/settings',
      page: 'static'
      
    },
    {
      label: '',
      icon: 'log-out',
      route: '/auth/logout',
      page: 'status'
    },
  ];

  const [currentSidebarTab, setCurrentSidebarTab] = useState<string>('home')
  const [currentSidebarType, setCurrentSidebarType] = useState<string>('table')
  const [currentSidebarSubTab, setCurrentSidebarSubTab] = useState<string>('home')
  const [currentContentTab, setCurrentContentTab] = useState<string>('home')

  const handleUpdateCurrentSidebarTab = (text: string) => {
    setCurrentSidebarTab(text)
  }

  const handleUpdateCurrentSidebarType = (text: string) => {
    setCurrentSidebarType(text)
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
                                          currentSidebarType,
                                          currentSidebarSubTab,
                                          currentContentTab,
                                          handleUpdateCurrentSidebarTab,
                                          handleUpdateCurrentSidebarType,
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