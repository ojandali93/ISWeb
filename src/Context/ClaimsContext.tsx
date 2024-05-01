import axios from 'axios';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useData } from './DataContext';

interface ClaimsContextType {
  selectedClaims: string[];
  pushingToFollowup: boolean;
  allClaims: boolean;
  updateSelectedClaims: (text: string) => void;
  addBatchToFavorites: () => void;
  selectAllClaims: (records: any) => void;
  unselectAllClaims: () => void
}

const ClaimsContext = createContext<ClaimsContextType>({
  selectedClaims: [],
  allClaims: false,
  pushingToFollowup: false,
  updateSelectedClaims: () => {},
  addBatchToFavorites: () => {},
  selectAllClaims: () => {},
  unselectAllClaims: () => {}
});

export function useClaims() {
  return useContext(ClaimsContext);
}

interface AppProviderProps {
  children: ReactNode;
}

export const ClaimsProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [selectedClaims, setSelectedClaims] = useState<string[]>([])
  const [pushingToFollowup, setPushingToFollowup] = useState<boolean>(false)
  const [allClaims, setAllClaims] = useState<boolean>(false)

  const { grabClaims } = useData()

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

  const selectAllClaims = (records: any) => {
    setAllClaims(true)
    let recordList: any = []
    records.map((record: any) => {
      recordList.push(record.claim_id)
    })
    setSelectedClaims(recordList)
  }

  const unselectAllClaims = () => {
    setAllClaims(false)
    setSelectedClaims([])
  }

  function arrayToIndexedObject(arr: string[]) {
    return arr.reduce((acc: { [key: number]: string }, val, index) => {
      acc[index + 1] = val.toString();
      return acc;
    }, {});
  }

  const addBatchToFavorites = () => {
    setPushingToFollowup(true)
    let newData = arrayToIndexedObject(selectedClaims)
    let config = {
      method: 'patch',
      maxBodyLength: Infinity,
      url: 'https://intellasurebackend-docker.onrender.com/claims/add_favorite_collab',
      headers: {
        'Content-Type': 'application/json'
      },
      data: newData
    };
    axios.request(config)
    .then((response) => {
      setPushingToFollowup(false)
      setSelectedClaims([])
      grabClaims()
    })
    .catch((error) => {
      console.log(error);
      setPushingToFollowup(false)
    });
  }

  const contextValue: ClaimsContextType = {
    selectedClaims,
    pushingToFollowup,
    allClaims,
    updateSelectedClaims,
    addBatchToFavorites,
    selectAllClaims,
    unselectAllClaims
  };

  return (
    <ClaimsContext.Provider value={contextValue}>
      {children}
    </ClaimsContext.Provider>
  );
};
