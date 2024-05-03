import axios from 'axios';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useData } from './DataContext';

interface ClaimsContextType {
  selectedClaims: string[];
  selectedClaimsAvea: string[];
  pushingToFollowup: boolean;
  allClaims: boolean;
  allClaimsAvea: boolean;
  updateSelectedClaims: (text: string) => void;
  updateSelectedClaimsAvea: (text: string) => void;
  addBatchToFavorites: () => void;
  selectAllClaims: (records: any) => void;
  selectAllClaimsAvea: (records: any) => void;
  unselectAllClaims: () => void;
  unselectAllClaimsAvea: () => void;
  addBatchToAveaFavorites: () => void
}

const ClaimsContext = createContext<ClaimsContextType>({
  selectedClaims: [],
  selectedClaimsAvea: [],
  allClaims: false,
  allClaimsAvea: false,
  pushingToFollowup: false,
  updateSelectedClaims: () => {},
  updateSelectedClaimsAvea: () => {},
  addBatchToFavorites: () => {},
  selectAllClaims: () => {},
  selectAllClaimsAvea: () => {},
  unselectAllClaims: () => {},
  unselectAllClaimsAvea: () => {},
  addBatchToAveaFavorites: () => {}
});

export function useClaims() {
  return useContext(ClaimsContext);
}

interface AppProviderProps {
  children: ReactNode;
}

export const ClaimsProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [selectedClaims, setSelectedClaims] = useState<string[]>([])
  const [selectedClaimsAvea, setSelectedClaimsAvea] = useState<string[]>([])
  const [pushingToFollowup, setPushingToFollowup] = useState<boolean>(false)
  const [pushingToFollowupAvea, setPushingToFollowupAvea] = useState<boolean>(false)
  const [allClaims, setAllClaims] = useState<boolean>(false)
  const [allClaimsAvea, setAllClaimsAvea] = useState<boolean>(false)

  const { grabClaims, grabAveaClaims } = useData()

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

  function arrayToIndexedObjectAvea(arr: string[]) {
    return arr.reduce((acc: { [key: number]: string }, val, index) => {
      acc[index + 1] = val.toString();
      return acc;
    }, {});
  }

  const updateSelectedClaimsAvea = (text: string) => {
    console.log('new added item: ', text)
    setSelectedClaimsAvea(prevSelectedClaims => {
      if (prevSelectedClaims.includes(text)) {
        return prevSelectedClaims.filter(item => item !== text);
      } else {
        return [...prevSelectedClaims, text];
      }
    });
  }

  const selectAllClaimsAvea = (records: any) => {
    setAllClaimsAvea(true)
    let recordList: any = []
    records.map((record: any) => {
      recordList.push(record.claim_id)
    })
    setSelectedClaimsAvea(recordList)
  }

  const unselectAllClaimsAvea = () => {
    setAllClaimsAvea(false)
    setSelectedClaimsAvea([])
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

  const addBatchToAveaFavorites = () => {
    setPushingToFollowup(true)
    let newData = arrayToIndexedObjectAvea(selectedClaimsAvea)
    console.log('new avea data: ', newData)
    let config = {
      method: 'patch',
      maxBodyLength: Infinity,
      url: 'https://intellasurebackend-docker.onrender.com/claims/add_favorite_avea/',
      headers: {
        'Content-Type': 'application/json'
      },
      data: newData
    };
    
    axios.request(config)
      .then((response) => {
        setSelectedClaimsAvea([])
        grabAveaClaims()
        setPushingToFollowup(false)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const contextValue: ClaimsContextType = {
    selectedClaims,
    selectedClaimsAvea,
    pushingToFollowup,
    allClaims,
    allClaimsAvea,
    updateSelectedClaims,
    updateSelectedClaimsAvea,
    addBatchToFavorites,
    selectAllClaims,
    selectAllClaimsAvea, 
    unselectAllClaims,
    unselectAllClaimsAvea,
    addBatchToAveaFavorites
  };

  return (
    <ClaimsContext.Provider value={contextValue}>
      {children}
    </ClaimsContext.Provider>
  );
};
