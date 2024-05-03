import React, { createContext, useContext, ReactNode, useState } from 'react';

interface NavigationSubTab {
  label: string;
  icon: string;
  route: string;
  page: string;
}

interface NavigationTab {
  label: string;
  icon: string;
  route: string;
  page: string;
  subTabs: NavigationSubTab[] | null;
  department: string[],
  privileges: string[]
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
      page: 'table',
      subTabs: null,
      department: [
        'intake',
        'billing',
        'administration',
        'dev'
      ],
      privileges: [
        'staff',
        'manager',
        'admin',
        'dev',
        'owner'
      ]
    },
    {
      label: 'Intake Analytics',
      icon: 'trending-up',
      route: '/intake-analytics',
      page: 'table',
      subTabs: null,
      department: [
        'intake',
        'administration',
        'dev'
      ],
      privileges: [
        'manager',
        'admin',
        'dev',
        'owner'
      ]
    },
    {
      label: 'Historic',
      icon: 'list',
      route: '/historic',
      page: 'table',
      subTabs: null,
      department: [
        'administration',
        'dev'
      ],
      privileges: [
        'admin',
        'dev',
        'owner'
      ]
    },
    {
      label: 'External',
      icon: 'download',
      route: '/external',
      page: 'table',
      subTabs: null,
      department: [
        'administration',
        'dev'
      ],
      privileges: [
        'admin',
        'dev',
        'owner'
      ]
    },
    {
      label: 'Claims',
      icon: 'file-text',
      route: '/claims/collab',
      page: 'table',
      subTabs: [
        {
          label: 'Collab Md',
          icon: 'download',
          route: '/claims/collab',
          page: 'table',
        },
        {
          label: 'Avea',
          icon: 'download',
          route: '/claims/avea',
          page: 'table',
        },
      ],
      department: [
        'administration',
        'dev'
      ],
      privileges: [
        'admin',
        'dev',
        'owner'
      ]
    },
    {
      label: 'Follow Up',
      icon: 'repeat',
      route: '/follow-up/collab',
      page: 'table',
      subTabs: [
        {
          label: 'Collab Md',
          icon: 'download',
          route: '/follow-up/collab',
          page: 'table',
        },
        {
          label: 'Avea',
          icon: 'download',
          route: '/follow-up/avea',
          page: 'table',
        },
      ],
      department: [
        'administration',
        'dev'
      ],
      privileges: [
        'admin',
        'dev',
        'owner'
      ]
    },
    {
      label: 'Accounts',
      icon: 'users',
      route: '/accounts',
      page: 'table',
      subTabs: null,
      department: [
        'administration',
        'dev'
      ],
      privileges: [
        'admin',
        'dev',
        'owner'
      ]
    },
    {
      label: 'Intellachat AI',
      icon: 'zap',
      route: '/intellachat',
      page: 'static',
      subTabs: null,
      department: [
        'administration',
        'dev'
      ],
      privileges: [
        'admin',
        'dev',
        'owner'
      ]
    },
  ];

  const topNavigation = [
    {
      label: '',
      icon: 'help-circle',
      route: '/help',
      page: 'static',
      subTabs: null,
      department: [
        'intake',
        'billing',
        'administration',
        'dev'
      ],
      privileges: [
        'staff',
        'manager',
        'admin',
        'dev',
        'owner'
      ]
    },
    {
      label: '',
      icon: 'settings',
      route: '/settings',
      page: 'static',
      subTabs: null,
      department: [
        'intake',
        'billing',
        'administration',
        'dev'
      ],
      privileges: [
        'staff',
        'manager',
        'admin',
        'dev',
        'owner'
      ]
      
    },
    {
      label: '',
      icon: 'log-out',
      route: '/auth/logout',
      page: 'status',
      subTabs: null,
      department: [
        'intake',
        'billing',
        'administration',
        'dev'
      ],
      privileges: [
        'staff',
        'manager',
        'admin',
        'dev',
        'owner'
      ]
    },
  ];

  const [currentSidebarTab, setCurrentSidebarTab] = useState<string>('Dashboard')
  const [currentSidebarType, setCurrentSidebarType] = useState<string>('table')
  const [currentSidebarSubTab, setCurrentSidebarSubTab] = useState<string>('Collab Md')
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