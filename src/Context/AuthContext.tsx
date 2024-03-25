import React, { createContext, useContext, useState, ReactNode } from 'react';

const AuthContext = createContext({});

interface Account {
  userId: string | null,
  username: string | null
}

interface Profile {
  company: string | null,
  creation_date: string | null,
  department: string | null,
  email: string | null,
  last_login: string | null,
  first_name: string | null,
  last_name: string | null,
  name: string | null,
  privileges: string | null,
  userid: string | null
}

interface AuthProviderProps {
  children: ReactNode;
}

export function useAuth() {
  return useContext(AuthContext);
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<Account>({
    userId: null,
    username: null
  })
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
    userid: null
  })
  const [authLoading, setAuthLoading] = useState(false)

  // const grabCurrentUser = () => {
  //   setAuthLoading(true)
  //   getCurrentUser()
  //     .then(response => {
  //       setCurrentUser(response)
  //     })
  //     .catch(error => {
  //       console.log(`Error getting user when login: ${error}`)
  //       setAuthLoading(false)
  //     })
  // }

  return (
    <AuthContext.Provider value={{currentUser, currentProfile}}>
      {children}
    </AuthContext.Provider>
  );
};
