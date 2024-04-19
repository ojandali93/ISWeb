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

interface IntakeProps {
  active: boolean;
  booked: string;
  checked_in: string;
  coordinator: string;
  created_date: string;
  date: string;
  date_of_birth: string;
  in_network_oop: number;
  inn_deductable: number;
  insurance: string;
  name: string;
  onn_deducatible: number;
  out_network_oop: number;
  payer_id: string;
  policy_id: string;
  prefix: string;
  source: string;
  summary_out: string;
}

interface DataContextType {
  allUsers: ProfileProps[] | null;
  intakeUsers: ProfileProps[] | null;
  adminUsers: ProfileProps[] | null;
  billingUsers: ProfileProps[] | null;
  devUsers: ProfileProps[] | null;
  intakeRecords: IntakeProps[] | null;
  collectAllData: () => void;
  grabAllProfiles: () => void;
}

const DataContext = createContext<DataContextType>({
  allUsers: null,
  intakeUsers: null,
  adminUsers: null,
  billingUsers: null,
  devUsers: null,
  intakeRecords: null,
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

  const [intakeRecords, setIntakeRecords] = useState<IntakeProps[] | null>(null)

  const collectAllData = () => {
    grabAllProfiles()
    getIntakeRecords()
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
  
  const getIntakeRecords = () => {
    let data = JSON.stringify({
      "status": "success",
      "method": "GET"
    });
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://intellasurebackend-docker.onrender.com/intake/',
      headers: {
        'Content-Type': 'application/json'
      },
      data : data
    };
    axios.request(config)
    .then((response) => {
      console.log(response.data.data[0])
      setIntakeRecords(sortRecordsByDateDesc(response.data.data))
    })
    .catch((error) => {
      console.log(error);
    });
  }

  function sortRecordsByDateDesc(records: IntakeProps[]) {
    records.forEach((record: any) => {
        record.date = new Date(record.date);
    });

    records.sort((a: any, b: any) => b.date - a.date);

    return records;
  }

  const contextValue: DataContextType = {
    allUsers,
    intakeUsers,
    adminUsers,
    billingUsers,
    devUsers,
    intakeRecords,
    collectAllData,
    grabAllProfiles
  };

  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
};
