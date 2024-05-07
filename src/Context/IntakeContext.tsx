import axios from 'axios';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useData } from './DataContext';
import { start } from 'repl';

interface IntakeContextType {
  timespan: string;
  showPrefix: boolean;
  prefixDataDashboard: PrefixDataProps[] | null;
  updateTimespan: (text: string) => void;
  showPrefixPopup: () => void;
  hidePrefixPopup: () => void;
  grabPrefixRecordsFromDashboard: (prefixId: string) => void;

}

const IntakeContext = createContext<IntakeContextType>({
  showPrefix: false,
  timespan: '1 Month',
  prefixDataDashboard: null,
  updateTimespan: () => {},
  showPrefixPopup: () => {},
  hidePrefixPopup: () => {},
  grabPrefixRecordsFromDashboard: () => {},
});

export function useIntake() {
  return useContext(IntakeContext);
}

interface AppProviderProps {
  children: ReactNode;
}

interface PrefixDataProps {
  average_charge: string,
  average_paid: string,
  balance: string,
  facility: string,
  insurance: string,
  last_updated: string,
  name: string, 
  network: string,
  payout: number,
  ploicy_id: string,
  prefix: string
}

export const IntakeProvider: React.FC<AppProviderProps> = ({ children }) => {

  const [timespan, setTimespan] = useState<string>('1 Month')
  const [showPrefix, setShowPrefix] = useState<boolean>(false);
  const [prefixDataDashboard, setPrefixDataDashboard] = useState<PrefixDataProps[] | null>(null)

  const updateTimespan = (text: string) => {
    setTimespan(text)
  }

  const showPrefixPopup = () => {

    setShowPrefix(true);
  }

  const grabPrefixRecordsFromDashboard = (selectedPrefix: string) => {
    const selectedNetwork1 = "in-network";
    const selectedNetwork2 = "out-of-network";

    let config1 = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://intellasurebackend-docker.onrender.com/level2/${selectedPrefix}_${selectedNetwork1}`,
      headers: { }
    };

    let config2 = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://intellasurebackend-docker.onrender.com/level2/${selectedPrefix}_${selectedNetwork2}`,
      headers: { }
    };
    
    axios.request(config1)
    .then((response: any) => {
      if (response.data.length) {
        const data = response.data.map((item: any) => {
          if (item.payout === Infinity) {
            return {
              ...item,
              payout: 0
            };
          }
          return item;
        })
        console.log("in network response", data) 
        setPrefixDataDashboard(data);
      }
      else {
        axios.request(config2)
        .then((response: any) => {
          const data = response.data.map((item: any) => {
            if (item.payout === Infinity) {
              return {
                ...item,
                payout: 0
              };
            }
            return item;
          })
          console.log("out of network response", data)
          setPrefixDataDashboard(data);
        })
        .catch((error: any) => console.error("Inside of GrabPrefixRecordsFromDashboard", error))
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

  const hidePrefixPopup = () => {
    setShowPrefix(false);
  }

  const contextValue: IntakeContextType = {
    timespan,
    updateTimespan,
    showPrefixPopup,
    showPrefix,
    hidePrefixPopup,
    grabPrefixRecordsFromDashboard,
    prefixDataDashboard
  };

  return (
    <IntakeContext.Provider value={contextValue}>
      {children}
    </IntakeContext.Provider>
  );
};
