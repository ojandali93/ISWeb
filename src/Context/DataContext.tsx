import axios from 'axios';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ProfileProps {
  active: boolean;
  company: string;
  department: string;
  email: string;
  first_name: string;
  last_name: string;
  name: string;
  privileges: string;
  userid: string;
}

interface DataContextType {
  allUsers: ProfileProps[] | null;
  intakeUsers: ProfileProps[] | null;
  adminUsers: ProfileProps[] | null;
  billingUsers: ProfileProps[] | null;
  devUsers: ProfileProps[] | null;
  collectAllData: () => void;
  grabAllProfiles: () => void;
}

const DataContext = createContext<DataContextType>({
  allUsers: null,
  intakeUsers: null,
  adminUsers: null,
  billingUsers: null,
  devUsers: null,
  collectAllData: () => {},
  grabAllProfiles: () => {}
});

export function useData() {
  return useContext(DataContext);
}

interface AppProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [allUsers, setAllUsers] = useState<ProfileProps[] | null>(null);
  const [intakeUsers, setIntakeUsers] = useState<ProfileProps[] | null>(null);
  const [adminUsers, setAdminUsers] = useState<ProfileProps[] | null>(null);
  const [billingUsers, setBillingUsers] = useState<ProfileProps[] | null>(null);
  const [devUsers, setDevUsers] = useState<ProfileProps[] | null>(null);

  const collectAllData = () => {
    grabAllProfiles()
  }

  const grabAllProfiles = () => {
    axios.get<ProfileProps[]>('https://intellasurebackend-docker.onrender.com/users/all')
      .then((response) => {
        let intake: any = []
        let billing: any = []
        let admin: any = []
        let dev: any = []
        setAllUsers(response.data);
        response.data.map((singleUser) => {
          if(singleUser.department === 'intake'){
            intake.push(singleUser)
          }
          if(singleUser.department === 'billing'){
            billing.push(singleUser)
          }
          if(singleUser.department === 'admin'){
            admin.push(singleUser)
          }
          if(singleUser.department === 'dev'){
            dev.push(singleUser)
          } 
        })
        setAdminUsers(admin)
        setIntakeUsers(intake)
        setBillingUsers(billing)
        setDevUsers(dev)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const contextValue: DataContextType = {
    allUsers,
    intakeUsers,
    adminUsers,
    billingUsers,
    devUsers,
    collectAllData,
    grabAllProfiles
  };

  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
};
