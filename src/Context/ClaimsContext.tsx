import axios from 'axios';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ClaimsContextType {
  selectedClaims: string[];
  updateSelectedClaims: (text: string) => void;
  addBatchToFavorites: () => void;
}

const ClaimsContext = createContext<ClaimsContextType>({
  selectedClaims: ['213046829'],
  updateSelectedClaims: () => {},
  addBatchToFavorites: () => {}
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

  function arrayToIndexedObject(arr: string[]) {
    return arr.reduce((acc: { [key: number]: string }, val, index) => {
      acc[index + 1] = val.toString();
      return acc;
    }, {});
  }

  const addBatchToFavorites = () => {
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
      console.log('batch successful')
    })
    .catch((error) => {
      console.log(error);
    });
  }

  const contextValue: ClaimsContextType = {
    selectedClaims,
    updateSelectedClaims,
    addBatchToFavorites
  };

  return (
    <ClaimsContext.Provider value={contextValue}>
      {children}
    </ClaimsContext.Provider>
  );
};
