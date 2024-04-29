import axios from 'axios';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ClaimsContextType {
  selectedClaims: string[];
  updateSelectedClaims: (text: string) => void;
}

const ClaimsContext = createContext<ClaimsContextType>({
  selectedClaims: ['213046829'],
  updateSelectedClaims: () => {}
});

export function useClaims() {
  return useContext(ClaimsContext);
}

interface AppProviderProps {
  children: ReactNode;
}

export const ClaimsProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [selectedClaims, setSelectedClaims] = useState<string[]>([])

  const updateSelectedClaims = (text: string) => {
    console.log('new added item: ', text)
    setSelectedClaims(prevSelectedClaims => {
      if (prevSelectedClaims.includes(text)) {
        return prevSelectedClaims.filter(item => item !== text);
      } else {
        return [...prevSelectedClaims, text];
      }
    });
  }

  const contextValue: ClaimsContextType = {
    selectedClaims,
    updateSelectedClaims
  };

  return (
    <ClaimsContext.Provider value={contextValue}>
      {children}
    </ClaimsContext.Provider>
  );
};
