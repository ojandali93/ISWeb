import React, { createContext, useContext, useState, ReactNode } from 'react';

const AppContext = createContext({});

interface AppProviderProps {
  children: ReactNode;
}

export function useApp() {
  return useContext(AppContext);
};

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  

  return (
    <AppContext.Provider value={{}}>
      {children}
    </AppContext.Provider>
  );
};
