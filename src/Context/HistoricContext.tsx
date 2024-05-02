import axios from 'axios';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useData } from './DataContext';
import { start } from 'repl';
import { useNavigate } from 'react-router-dom';

interface historicRecordsProps {
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

interface userInfoProps {
  name: string,
  insurance: string,
  policy: string,
  prefix: string,
  facility: string,
  dob: string,
}

interface UserFinancialProps {
  Balance: number,
  Charge_code: string,
  Charged: number
  Claim_ID: string,
  Date: string,
  FU_Note: string | null,
  Facility: string,
  Insurance: string,
  Paid: number,
  Patient_ID: string,
  Patient_birthday: string,
  Policy_ID: string,
  Primary_pay_amount: number,
  Status: string,
}

interface UserCareProps {
  admission_date: string,
  case_id: string,
  discharge_date: string,
  dob: string,
  facility: string,
  insurance_company: string,
  level_of_care: string,
  name: string,
  policy_id: string,
  prefix: string,
  ssn: string
}

interface HistoricContextType {
  prefixRecords: historicRecordsProps[] | null;
  selectedUserInfo: userInfoProps | null;
  selectedUserCare: UserCareProps[] | null;
  selectedUserFinancial: UserFinancialProps[] | null;
  grabPrefixRecords: (selectedPrefix: string, selectedNetwork: string) => void;
  grabUserRecords: (selectedPolicy: string) => void;
}

const HistoricContext = createContext<HistoricContextType>({
  prefixRecords: null,
  selectedUserInfo: null,
  selectedUserCare: null,
  selectedUserFinancial: null,
  grabPrefixRecords: () => {},
  grabUserRecords: () => {}
});

export function useHistoric() {
  return useContext(HistoricContext);
}

interface AppProviderProps {
  children: ReactNode;
}

export const HistoricProvider: React.FC<AppProviderProps> = ({ children }) => {

  const [prefixRecords, setPrefixRecords] = useState<historicRecordsProps[] | null>(null)
  const [selectedUserInfo, setSelectedUserInfo] = useState<userInfoProps | null>(null)
  const [selectedUserCare, setSelectedUserCare] = useState<UserCareProps[] | null>(null)
  const [selectedUserFinancial, setSelectedUserFinancial] = useState<UserFinancialProps[] | null>(null)

  const grabPrefixRecords = (selectedPrefix: string, selectedNetwork: string) => {
    console.log(`parameters: ${selectedNetwork} & ${selectedPrefix}`)
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://intellasurebackend-docker.onrender.com/level2/${selectedPrefix}_${selectedNetwork}`,
      headers: { }
    };
    axios.request(config)
    .then((response) => {
      setPrefixRecords(response.data)
    })
    .catch((error) => {
      console.log(error);
    });
  }

  const grabUserRecords = (selectedPolicy: string) => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://intellasurebackend-docker.onrender.com/level1/${selectedPolicy}`,
      headers: { }
    };
    axios.request(config)
    .then((response) => {
      console.log('level 1 data: ', response.data)
      let newUserDate = {
        name: response.data.patient_info[0].name || '',
        insurance: response.data.patient_info[0].insurance_company || '',
        policy: response.data.patient_info[0].policy_id || '',
        prefix: response.data.patient_info[0].prefix || '',
        facility: response.data.patient_info[0].facility || '',
        dob: response.data.patient_info[0].dob || '',
        // name: string,
        // insurance: string,
        // policy: string,
        // prefix: string,
        // facility: string,
        // dob: string,
      }
      setSelectedUserInfo(newUserDate)
      setSelectedUserFinancial(response.data.billing)
      setSelectedUserCare(response.data.patient_info)
    })
    .catch((error) => {
      console.log(error);
    });
  }

  const contextValue: HistoricContextType = {
    prefixRecords,
    selectedUserInfo,
    selectedUserCare,
    selectedUserFinancial,
    grabPrefixRecords,
    grabUserRecords
  };

  return (
    <HistoricContext.Provider value={contextValue}>
      {children}
    </HistoricContext.Provider>
  );
};
