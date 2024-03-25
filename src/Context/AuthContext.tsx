import React, { createContext, useContext, useState, ReactNode } from 'react';
import { getCurrentUser } from 'aws-amplify/auth';
import axios from 'axios';

interface Account {
  userId: string | null;
  username: string | null;
}

interface Profile {
  company: string | null;
  creation_date: string | null;
  department: string | null;
  email: string | null;
  last_login: string | null;
  first_name: string | null;
  last_name: string | null;
  name: string | null;
  privileges: string | null;
  userid: string | null;
}

interface AuthContextType {
  currentUser: Account;
  currentProfile: Profile;
  authLoading: boolean;
  grabCurrentUser: () => void;
  grabCurrentUserProfile: (userId: string) => void;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: { userId: null, username: null },
  currentProfile: {
    company: null,
    creation_date: null,
    department: null,
    email: null,
    last_login: null,
    first_name: null,
    last_name: null,
    name: null,
    privileges: null,
    userid: null,
  },
  authLoading: false,
  grabCurrentUser: () => {},
  grabCurrentUserProfile: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<Account>({
    userId: null,
    username: null,
  });
  const [currentProfile, setCurrentProfile] = useState<Profile>({
    company: null,
    creation_date: null,
    department: null,
    email: null,
    last_login: null,
    first_name: null,
    last_name: null,
    name: null,
    privileges: null,
    userid: null,
  });
  const [authLoading, setAuthLoading] = useState(false);

  const grabCurrentUser = () => {
    setAuthLoading(true);
    getCurrentUser()
      .then((response) => {
        setCurrentUser(response);
      })
      .catch((error) => {
        console.log(`Error getting user when login: ${error}`);
        setAuthLoading(false);
      });
  };

  const grabCurrentUserProfile = (userId: string) => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://intellasurebackend-docker.onrender.com/users/${userId}`,
      headers: {},
    };
    axios
      .request(config)
      .then((response) => {
        setCurrentProfile(response.data.data);
        setAuthLoading(false);
      })
      .catch((error) => {
        console.log(`Error getting user profile when login: ${error}`);
        setAuthLoading(false);
      });
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        currentProfile,
        authLoading,
        grabCurrentUser,
        grabCurrentUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
