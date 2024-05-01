import axios from 'axios';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useData } from './DataContext';
import { start } from 'repl';

interface IntakeContextType {
  timespan: string;
  updateTimespan: (text: string) => void;
}

const IntakeContext = createContext<IntakeContextType>({
  timespan: '1 Month',
  updateTimespan: () => {}
});

export function useIntake() {
  return useContext(IntakeContext);
}

interface AppProviderProps {
  children: ReactNode;
}

export const IntakeProvider: React.FC<AppProviderProps> = ({ children }) => {

  const [timespan, setTimespan] = useState<string>('1 Month')

  const updateTimespan = (text: string) => {
    setTimespan(text)
  }


  const contextValue: IntakeContextType = {
    timespan,
    updateTimespan
  };

  return (
    <IntakeContext.Provider value={contextValue}>
      {children}
    </IntakeContext.Provider>
  );
};
