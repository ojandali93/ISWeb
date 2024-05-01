import axios from 'axios';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useData } from './DataContext';

interface FollowupContextType {
  selectedFollowup: string[];
  pushingToFollowup: boolean;
  allFollowup: boolean;
  followupTab: string;
  submuttingData: boolean;
  updateSelectedFollowup: (text: string) => void;
  addBatchToFavorites: () => void;
  selectAllFollowup: (records: any) => void;
  unselectAllFollowup: () => void;
  updateFollowupTab: (text: string) => void;
  updateCoordinatorFollwup: (claim_id: string, coordinator: string) => void;
  submitBatchToCollab: () => void
}

const FollowupContext = createContext<FollowupContextType>({
  selectedFollowup: [],
  allFollowup: false,
  pushingToFollowup: false,
  followupTab: 'ALL',
  submuttingData: false,
  updateSelectedFollowup: () => {},
  addBatchToFavorites: () => {},
  selectAllFollowup: () => {},
  unselectAllFollowup: () => {},
  updateFollowupTab: () => {},
  updateCoordinatorFollwup: () => {},
  submitBatchToCollab: () => {}
});

export function useFollowup() {
  return useContext(FollowupContext);
}

interface AppProviderProps {
  children: ReactNode;
}

export const FollowupProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [selectedFollowup, setSelectedFollowup] = useState<string[]>([])
  const [pushingToFollowup, setPushingToFollowup] = useState<boolean>(false)
  const [allFollowup, setAllFollowup] = useState<boolean>(false)
  const [followupTab, setFollowupTab] = useState<string>('ALL')
  const [submuttingData, setSubmittingData] = useState<boolean>(false)

  const { getClaimsFollowup } = useData()

  const updateFollowupTab = (text: string) => {
    console.log('update follow up tab: ', text)
    setFollowupTab(text)
  }

  const updateSelectedFollowup = (text: string) => {
    console.log('new added item: ', text)
    setSelectedFollowup(prevSelectedFollowup => {
      if (prevSelectedFollowup.includes(text)) {
        return prevSelectedFollowup.filter(item => item !== text);
      } else {
        return [...prevSelectedFollowup, text];
      }
    });
  }

  const selectAllFollowup = (records: any) => {
    setAllFollowup(true)
    let recordList: any = []
    records.map((record: any) => {
      recordList.push(record.claim_id)
    })
    setSelectedFollowup(recordList)
  }

  const unselectAllFollowup = () => {
    setAllFollowup(false)
    setSelectedFollowup([])
  }

  function arrayToIndexedObject(arr: string[]) {
    return arr.reduce((acc: { [key: number]: string }, val, index) => {
      acc[index + 1] = val.toString();
      return acc;
    }, {});
  }

  const addBatchToFavorites = () => {
    setPushingToFollowup(true)
    let newData = arrayToIndexedObject(selectedFollowup)
    let config = {
      method: 'patch',
      maxBodyLength: Infinity,
      url: 'https://intellasurebackend-docker.onrender.com/Followup/add_favorite_collab',
      headers: {
        'Content-Type': 'application/json'
      },
      data: newData
    };
    axios.request(config)
    .then((response) => {
      setPushingToFollowup(false)
      setSelectedFollowup([])
    })
    .catch((error) => {
      console.log(error);
      setPushingToFollowup(false)
    });
  }

  const updateCoordinatorFollwup = (claim_id: string, coordinator: string) => {
    let data = {
      "claim_id": claim_id,
      "coordinator": coordinator
    };
    let config = {
      method: 'patch',
      maxBodyLength: Infinity,
      url: 'https://intellasurebackend-docker.onrender.com/claims/favorites/update_coordinator',
      headers: {
        'Content-Type': 'application/json'
      },
      data : data
    };
    axios.request(config)
    .then((response) => {
      getClaimsFollowup()
    })
    .catch((error) => {
      console.log(error);
    });
  };

  const submitBatchToCollab = () => {
    setSubmittingData(true)
    const data = {
      "claim_ids": selectedFollowup
    }
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://intellasurebackend-docker.onrender.com/submit_claim_ids',
      headers: {
        'Content-Type': 'application/json'
      },
      data : data
    };
    axios.request(config)
      .then((response) => {
        getClaimsFollowup()
        setSubmittingData(false)
      })
      .catch((error) => {
        console.log(error);
        setSubmittingData(false)
      });
  }

  const contextValue: FollowupContextType = {
    selectedFollowup,
    pushingToFollowup,
    allFollowup,
    followupTab,
    submuttingData,
    updateSelectedFollowup,
    addBatchToFavorites,
    selectAllFollowup,
    unselectAllFollowup,
    updateFollowupTab,
    updateCoordinatorFollwup,
    submitBatchToCollab
  };

  return (
    <FollowupContext.Provider value={contextValue}>
      {children}
    </FollowupContext.Provider>
  );
};
