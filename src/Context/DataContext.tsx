import axios from 'axios';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

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

interface HistoricProps {
  average_charged: number;
  average_paid: number;
  balance: number;
  insurance: string;
  network: string;
  payout_ratio: number;
  prefix: string
}

interface ClaimsProps {
  balance_total: number,
  charged_total: number,
  claim_id: string,
  claim_status: string,
  coordinator: string,
  end_date: string,
  facility: string,
  favorites: number,
  fu_note: string | null,
  name: string,
  network: string,
  paid_total: number,
  payout_ratio: boolean,
  start_date: string,
  status: string
}

interface InsuranceOptionsProps {
  insurance: string;
  payer_id: number;
}

interface AvailityProps {

}

interface DataContextType {
  allUsers: ProfileProps[] | null;
  intakeUsers: ProfileProps[] | null;
  adminUsers: ProfileProps[] | null;
  billingUsers: ProfileProps[] | null;
  devUsers: ProfileProps[] | null;
  intakeRecords: IntakeProps[] | null;
  insuranceOptions: InsuranceOptionsProps[] | null;
  loadingNewIntake: boolean;
  addRecord: boolean;
  billingDetails: HistoricProps[] | null;
  claimsRecords: ClaimsProps[] | null;
  availityData: any;
  collectAllData: () => void;
  grabAllProfiles: () => void;
  grabClaims: () => void;
  grabRefreshClaims: (
    startDate: Date, 
    endDate: Date, 
    minPercent: number, 
    maxPercent: number, 
    page: number, 
    facility: string, 
    status: string,
  ) => void;
  addIntakeRecord: (data: any) => void;
  handleAddRecord: () => void;
  getIntakeRecords: () => void;
  searchIntakeRecords: (search: string) => void;
  grabAvailityData: (claim_id: any) => void;
}


const DataContext = createContext<DataContextType>({
  allUsers: null,
  intakeUsers: null,
  adminUsers: null,
  billingUsers: null,
  devUsers: null,
  intakeRecords: null,
  insuranceOptions: null,
  loadingNewIntake: false,
  addRecord: false, 
  billingDetails: null,
  claimsRecords: null,
  availityData: null,
  collectAllData: () => {},
  grabAllProfiles: () => {},
  grabClaims: () => {},
  grabRefreshClaims: () => {},
  addIntakeRecord: () => {},
  handleAddRecord: () => {},
  getIntakeRecords: () => {},
  searchIntakeRecords: () => {},
  grabAvailityData: () => {},
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

  const [insuranceOptions, setInsuranceOptions] = useState<InsuranceOptionsProps[] | null>(null)

  const [loadingNewIntake, setLoadingNewIntake] = useState<boolean>(false)
  const [addRecord, setAddRecord] = useState<boolean>(false)

  const [billingDetails, setBillingDetails] = useState<HistoricProps[] | null>(null)

  const [claimsRecords, setClaimsRcords] = useState<ClaimsProps[] | null>(null)

  const [availityData, setAvailityData] = useState<any>(null)

  const [startDate, setStartDate] = useState(new Date(Date.UTC(2018, 1, 1)));
  const [endDate, setEndDate] = useState(new Date())

  const [minPercent, setMinPercent] = useState(0);
  const [maxPercent, setMaxPercent] = useState(100)

  const navigate = useNavigate()

  const collectAllData = () => {
    grabAllProfiles()
    getIntakeRecords()
    grabInsuranceOptions()
    grabRecords()
    grabRecords()
    grabClaims()
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

  const grabRecords = () => {
    const url = 'https://intellasurebackend-docker.onrender.com/level3'
    axios.get(url)
    .then((response) => {
      setBillingDetails(response.data)
    })
    .catch((error) => {
      console.log(error);
    });
  }

  function formatDate(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  }

  const grabClaims = () => {
    let data = {
      'start_date': formatDate(new Date(Date.UTC(2018, 1, 1))),
      'end_date': formatDate(endDate),
      "min_percent": 0.0,
      "max_percent": 1.0,
      "page": 1,
      "facilities":"ALL",
      "status": "ALL"
    }
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://intellasurebackend-docker.onrender.com/claims/claim_main_page',
      headers: {
        'Content-Type': 'application/json'
      },
      data : data
    };
    axios.request(config)
    .then((response) => {
      console.log('claims records length: ', response.data.length)
      setClaimsRcords(response.data)
    })
    .catch((error) => {
      console.log(error);
    });
  }

  const grabRefreshClaims = (
    startDate: Date, 
    endDate: Date, 
    minPercent: number, 
    maxPercent: number, 
    page: number, 
    facility: string, 
    status: string,
  ) => {
    let data = {
      'start_date': formatDate(startDate),
      'end_date': formatDate(endDate),
      'min_percent': (minPercent / 100),
      'max_percent': (maxPercent / 100),
      'page': page,
      'facilities': facility,
      'status': status
    }
    console.log('refresh claims: ', data)
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://intellasurebackend-docker.onrender.com/claims/claim_main_page',
      headers: {
        'Content-Type': 'application/json'
      },
      data : data
    };
    axios.request(config)
    .then((response) => {
      setClaimsRcords(response.data)
    })
    .catch((error) => {
      console.log(error);
    });
  }
  
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
      setIntakeRecords(sortRecordsByDateDesc(response.data.data))
    })
    .catch((error) => {
      console.log(error);
    });
  }

  const searchIntakeRecords = (search: string) => {
    let searchResults:any = []
    intakeRecords?.map((record) => {
      if(record.name.includes(search)){
        searchResults.push(record)
      }
    })
    setIntakeRecords(searchResults)
  }

  function sortRecordsByDateDesc(records: IntakeProps[]) {
    records.forEach((record: any) => {
        record.date = new Date(record.date);
    });

    records.sort((a: any, b: any) => b.date - a.date);

    return records;
  }

  const generateTenDigitNumber = () => {
    const min = 1000000000;
    const max = 9999999999;
    const number = Math.floor(Math.random() * (max - min + 1)) + min;
    return number.toString()
  }

  const addIntakeRecord = (data: any) => {
      setLoadingNewIntake(true)
      let intakeId = generateTenDigitNumber()
      let intakeData = { data: {
        "intake_id": intakeId,
        "name": data.name,
        "prefix": data.policy.slice(0, 3),
        "policy_id": data.policy,
        "insurance": data.insurance,
        "payer_id": data.payer_id,
        "date_of_birth": data.dob,
        "source": data.source,
        "coordinator": data.userId,
        "summary_out": 'PENDING',
        "booked": "Pending",
        "check_in": "Pending",
        "out_network_details": '',
        "in_network_details": '',
        "notes": data.notes,
        "created_date": getCurrentDateFormatted()
      }}
  
      const url = 'https://intellasurebackend-docker.onrender.com/intake/'
      
      axios.post(url, intakeData)
      .then((response) => {
        setLoadingNewIntake(false)
        handleAddRecord()
        getIntakeRecords()
      })
      .catch((error) => {
        console.log(error);
        setLoadingNewIntake(false)
      });
  }


  function getCurrentDateFormatted() {
    const now = new Date();
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based in JS, add 1
    const day = now.getDate().toString().padStart(2, '0');
    const year = now.getFullYear().toString();
    return `${year}-${month}-${day}`;
  }

  const grabInsuranceOptions = () => {
    const url = 'https://intellasurebackend-docker.onrender.com/verifytx_payers'
    axios.get(url)
      .then((response) => {
        let records = response.data 
        records.sort((a: any, b: any) => {
          const insuranceA = a.insurance.toUpperCase(); // Convert to uppercase for case-insensitive sorting
          const insuranceB = b.insurance.toUpperCase();
        
          if (insuranceA < insuranceB) {
            return -1;
          }
          if (insuranceA > insuranceB) {
            return 1;
          }
          return 0;
        });
        const udpatedRecords = reformatInsurance(records)
        setInsuranceOptions(udpatedRecords)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const grabAvailityData = (claim_id: any) => {
    console.log(claim_id, "this is the claim_id")
    const url = `https://intellasurebackend-docker.onrender.com/availity/${claim_id}`
    console.log(url, "this is the url with params")
    axios.get(url)
      .then((response: any) => {
        // console.log(response.data, "inside of availity data")
        const newDataArray = response.data.claimStatuses.map((claimStatus: any) => {

          const newData = {
            claimControlNumber: claimStatus.claimControlNumber,
            patientControlNumber: claimStatus.patientControlNumber,
            fromDate: claimStatus.fromDate,
            toDate: claimStatus.toDate,
            category: claimStatus.statusDetails[0].category,
            categoryCode: claimStatus.statusDetails[0].categoryCode,
            checkNumber: claimStatus.statusDetails[0].checkNumber,
            claimAmount: claimStatus.statusDetails[0].claimAmount,
            effectiveDate: claimStatus.statusDetails[0].effectiveDate,
            finalizedDate: claimStatus.statusDetails[0].finalizedDate,
            paymentAmount: claimStatus.statusDetails[0].paymentAmount,
            remittanceDate: claimStatus.statusDetails[0].remittanceDate,
            status: claimStatus.statusDetails[0].status,
            statusCode: claimStatus.statusDetails[0].statusCode,
            traceId: claimStatus.traceId,
          }
          console.log(newData)
          return newData
        })
        console.log(newDataArray)
        setAvailityData(newDataArray)
        navigate('/availityScreen')
        // .catch((err) => {
        //   
        // })
      })
  }

  const reformatInsurance = (records: InsuranceOptionsProps[]) => {
    let newRecords: any[] = []
    records.map((record: any) => {
      newRecords.push({label: record.insurance, value: record.payer_id})
    })
    return(newRecords)
  }

  const handleAddRecord = () => {
    setAddRecord(!addRecord)
  }

  const contextValue: DataContextType = {
    allUsers,
    intakeUsers,
    adminUsers,
    billingUsers,
    devUsers,
    intakeRecords,
    insuranceOptions, 
    loadingNewIntake,
    addRecord, 
    billingDetails, 
    claimsRecords,
    collectAllData,
    grabClaims,
    grabAllProfiles,
    addIntakeRecord,
    handleAddRecord,
    getIntakeRecords,
    searchIntakeRecords,
    grabRefreshClaims,
    grabAvailityData,
    availityData
  };

  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
};
