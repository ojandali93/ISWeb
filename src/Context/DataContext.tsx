import axios from 'axios';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useIntake } from './IntakeContext';
import { useNavigate } from 'react-router-dom';
import ClaimsAveaScreen from "../Screens/Claims/ClaimsAveaScreen";

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

interface BillingAnalyticsProps {
  claim_id: string,
  paid_total: number,
  start_date: string
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

interface FolloupProps {
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

interface ExternalDataProps {
  allowedPercent: string;
  avgDailyRate: string;
  lastPaid: string;
  levelOfCare: string;
  paidPercent: string;
  prefix: string;
  totalUnits: string;
}

interface NotesProps {
  date: string;
  intake_id: string;
  notes: string;
  name: string;
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
  loadingNewTicket: boolean;
  addRecord: boolean;
  billingDetails: HistoricProps[] | null;
  claimsRecords: ClaimsProps[] | null;
  aveaClaimsRecords: ClaimsProps[] | null;
  availityData: any;
  loadingAvailityData: boolean;
  followupRecords: FolloupProps[] | null;
  pendingRecords: FolloupProps[] | null;
  successfullRecords: FolloupProps[] | null;
  failedRecords: FolloupProps[] | null;
  externalData: ExternalDataProps[] | null;
  currentNotes: NotesProps[] | null;
  currentIntakeId: any;
  followupAveaRecords: ClaimsProps[] | null;
  pendingAveaRecords: ClaimsProps[] | null;
  successfullAveaRecords: ClaimsProps[] | null;
  failedAveaRecords: ClaimsProps[] | null;
  billingAnalytics: BillingAnalyticsProps[] | null;
  claimsSearch: string;
  activeClaimSearch: boolean;
  collectAllData: () => void;
  grabAllProfiles: () => void;
  grabClaims: () => void;
  grabAveaClaims: () => void;
  grabRefreshClaims: (
    startDate: Date, 
    endDate: Date, 
    minPercent: number, 
    maxPercent: number, 
    page: number, 
    facility: string, 
    status: string,
  ) => void;
  grabRefreshAveaClaims:(
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
  addSupportTicket: (data:any) => void;
  grabAvailityData: (claim_id: any) => void;
  grabAveaAvailityData: (claim_id: any) => void;
  getClaimsFollowup: () => void;
  grabExternalData: () => void;
  getNotes: (intake_id: string, coordinator: string) => void;
  sendNewNotes: (notesData: any) => void;
  searchHistoricRecords: (text: string) => void;
  searchExternalData: (search: string) => void;
  handleClaimsSearchChange: (text: string) => void;
  grabSearchByNameClaims: (name: string) => void;
  handleAcriveClaimSearchChange: () => void;
  clearActiveClaimSearch: () => void
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
  loadingNewTicket: false,
  addRecord: false, 
  billingDetails: null,
  claimsRecords: null,
  aveaClaimsRecords: null,
  availityData: null,
  loadingAvailityData: false,
  followupRecords: null,
  pendingRecords: null,
  successfullRecords: null,
  failedRecords: null,
  externalData: null,
  currentNotes: null,
  currentIntakeId: null,
  followupAveaRecords: null,
  pendingAveaRecords: null,
  successfullAveaRecords: null,
  failedAveaRecords: null,
  billingAnalytics: null,
  claimsSearch: '',
  activeClaimSearch: false,
  collectAllData: () => {},
  grabAllProfiles: () => {},
  grabClaims: () => {},
  grabAveaClaims: () => {},
  grabRefreshClaims: () => {},
  grabRefreshAveaClaims:() =>{},
  addIntakeRecord: () => {},
  handleAddRecord: () => {},
  getIntakeRecords: () => {},
  searchIntakeRecords: () => {},
  addSupportTicket: () => {},
  grabAvailityData: () => {},
  grabAveaAvailityData: () => {},
  getClaimsFollowup: () => {},
  grabExternalData: () => {},
  getNotes: () => {},
  sendNewNotes: () => {},
  searchHistoricRecords: () => {},
  searchExternalData: () => {},
  handleClaimsSearchChange: () => {},
  grabSearchByNameClaims: () => {},
  handleAcriveClaimSearchChange: () => {},
  clearActiveClaimSearch: () => {}
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

  const [loadingNewTicket, setLoadingNewTicket] = useState<boolean>(false);

  const [billingDetails, setBillingDetails] = useState<HistoricProps[] | null>(null)

  const [claimsRecords, setClaimsRcords] = useState<ClaimsProps[] | null>(null)
  const [aveaClaimsRecords, setAveaClaimsRecords] = useState<ClaimsProps[] | null>(null)

  const [followupRecords, setFollowupClaims] = useState<ClaimsProps[] | null>(null)
  const [pendingRecords, setPendingRecords] = useState<ClaimsProps[] | null>(null)
  const [successfullRecords, setSuccessfulRecords] = useState<ClaimsProps[] | null>(null)
  const [failedRecords, setFailedRecords] = useState<ClaimsProps[] | null>(null)

  const [followupAveaRecords, setFollowupAveaClaims] = useState<ClaimsProps[] | null>(null)
  const [pendingAveaRecords, setPendingAveaRecords] = useState<ClaimsProps[] | null>(null)
  const [successfullAveaRecords, setSuccessfulAveaRecords] = useState<ClaimsProps[] | null>(null)
  const [failedAveaRecords, setFailedAveaRecords] = useState<ClaimsProps[] | null>(null)

  const [availityData, setAvailityData] = useState<any>(null)
  const [loadingAvailityData, setLoadingAvailityData] = useState<boolean>(false)

  const [currentNotes, setCurrentNotes] = useState<NotesProps[] | null>(null)
  const [currentIntakeId, setCurrentIntakeId] = useState<any>(null)

  const [externalData, setExternalData] = useState<ExternalDataProps[] | null>(null)

  const [startDate, setStartDate] = useState(new Date(Date.UTC(2018, 1, 1)));
  const [endDate, setEndDate] = useState(new Date())

  const [minPercent, setMinPercent] = useState(0);
  const [maxPercent, setMaxPercent] = useState(100)

  const [billingAnalytics, setBillingAnalytics] = useState<BillingAnalyticsProps[] | null>([])

  const [claimsSearch, setClaimsSearch] = useState<string>('')
  const [activeClaimSearch, setActiveClaimSearch] = useState<boolean>(false)

  const navigate = useNavigate()

  let counter = 0

  const collectAllData = () => {
    grabAllProfiles()
    getIntakeRecords()
    grabInsuranceOptions()
    grabRecords()
    grabRecords()
    grabClaims()
    grabAveaClaims()
    getClaimsFollowup()
    grabExternalData()
    getAveaFollowup()
    grabBillingAnalytics()
  }

  const handleClaimsSearchChange = (text: string) => {
    text === ''
      ? setActiveClaimSearch(false)
      : setActiveClaimSearch(true)
    setClaimsSearch(text)
  }

  const handleAcriveClaimSearchChange = () => {
    setActiveClaimSearch(!activeClaimSearch)
  }

  const clearActiveClaimSearch = () => {
    setClaimsSearch('')
    setActiveClaimSearch(false)
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

  const grabBillingAnalytics = () => {
    const url = 'https://intellasurebackend-docker.onrender.com/billing/'
    axios.get(url)
    .then((response) => {
      let data = response.data.slice(0, 30)
      data.reverse()
      data.map((record: any) => {
        if (!(record.start_date instanceof Date)) {
          record.start_date = new Date(record.start_date);
        }
        record.start_date = convertDate(record.start_date)
      })
      setBillingAnalytics(data)
    })
    .catch((error) => {
      console.log(error);
    });
  }

  const convertDate = (date: Date) => {
    const mm = String(date.getMonth() + 1).padStart(2, '0'); // Local month
    const dd = String(date.getDate()).padStart(2, '0'); // Local date
    return `${mm}/${dd}`;
  };

  const grabSearchByNameClaims = ( name:string ) => {

    let formattedName = name.replace(/\s+/g, '_').replace(/_+$/, '');
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://intellasurebackend-docker.onrender.com/claims/search_name/${formattedName}`,
      headers: {
        'Content-Type': 'application/json'
      }};
  
      axios.request(config)
          .then((response: any) => {
            setClaimsRcords(response.data)
          })
          .catch((error) => {
            console.log(error);
          });
  }

  const searchHistoricRecords = (search: string) => {
    let searchResults:any = []
    if(search === ''){
      grabRecords()
    } else {
      billingDetails?.map((record: any) => {
        const reference = record.prefix.toLowerCase()
        if(reference.includes(search.toLowerCase())){
          searchResults.push(record)
        }
      })
      setBillingDetails(searchResults)
    }
    
  }

  function formatDate(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  }
  const grabAveaClaims = () => {
    let data = {
      'start_date': formatDate(new Date(Date.UTC(2018, 1, 1))),
      'end_date': formatDate(endDate),
      "min_percent": 0.0,
      "max_percent": 1.0,
      "page": 1,
      "facilities":"ALL",
      "status": "ALL"}
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://intellasurebackend-docker.onrender.com/claims/avea',
      headers: {
        'Content-Type': 'application/json'
      },
      data : data
    };
    axios.request(config)
        .then((response) => {
          setAveaClaimsRecords(response.data)
        })
        .catch((error) => {
          console.log(error);
        });
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
  const grabRefreshAveaClaims = (
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
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://intellasurebackend-docker.onrender.com/claims/avea',
      headers: {
        'Content-Type': 'application/json'
      },
      data : data
    };
    axios.request(config)
        .then((response) => {
          setAveaClaimsRecords(response.data)
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
      const reference = record.name.toLowerCase()
      if(reference.includes(search.toLowerCase())){
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

  const generateFiveDigitNumber = () => {
    const min = 10000;
    const max = 99999;
    const number = Math.floor(Math.random() * (max - min + 1)) + min;
    return number.toString();
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
      console.log('initial dob: ', JSON.stringify(intakeData))
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

  const getClaimsFollowup = () => {
    let pendingRecords: any = []
    let successfulRecords: any = []
    let rejectedRecords: any = []
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://intellasurebackend-docker.onrender.com/claims/favorites',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    axios.request(config)
    .then((response) => {
      response.data.map((record: any) => {
        record.claim_status === 'Successful'
          ? successfulRecords.push(record)
          : record.claim_status === 'pending'
              ? pendingRecords.push(record)
              : record.claim_status == 'Failed'
                  ? rejectedRecords.push(record)
                  : pendingRecords.push(record)
      })
      setFailedRecords(rejectedRecords)
      setSuccessfulRecords(successfulRecords)
      setPendingRecords(pendingRecords)
      setFollowupClaims(response.data)
    })
    .catch((error) => {
      console.log(error);
    });
  }

  const getAveaFollowup = () => {
    let pendingRecords: any = []
    let successfulRecords: any = []
    let rejectedRecords: any = []
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://intellasurebackend-docker.onrender.com/claims/avea_favorites',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    axios.request(config)
    .then((response) => {
      response.data.map((record: any) => {
        record.claim_status === 'Successful'
          ? successfulRecords.push(record)
          : record.claim_status === 'pending'
              ? pendingRecords.push(record)
              : record.claim_status == 'Failed'
                  ? rejectedRecords.push(record)
                  : pendingRecords.push(record)
      })
      setFailedAveaRecords(rejectedRecords)
      setSuccessfulAveaRecords(successfulRecords)
      setPendingAveaRecords(pendingRecords)
      setFollowupAveaClaims(response.data)
    })
    .catch((error) => {
      console.log(error);
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
    setLoadingAvailityData(true);
    const url = `https://intellasurebackend-docker.onrender.com/availity/${claim_id}`;
    axios.get(url)
        .then((response: any) => {
          const existingClaimNumbers = new Set();
          const newDataArray = response.data.claimStatuses.reduce((acc: any[], claimStatus: any) => {
            if (!existingClaimNumbers.has(claimStatus.claimControlNumber)) {
              existingClaimNumbers.add(claimStatus.claimControlNumber);
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
                percent_payout: Number(claimStatus.statusDetails[0].paymentAmount)/Number(claimStatus.statusDetails[0].claimAmount),
                remittanceDate: claimStatus.statusDetails[0].remittanceDate,
                status: claimStatus.statusDetails[0].status,
                statusCode: claimStatus.statusDetails[0].statusCode,
                traceId: claimStatus.traceId,
              };
              acc.push(newData);
            }
            return acc;
          }, []);

          setAvailityData(newDataArray);
          navigate('/availityScreen');
          setLoadingAvailityData(false);

        })
        .catch((err: any) => {
          // existing code
          setLoadingAvailityData(false);
          // check if the coutner number <3
          if(counter < 3){
            counter = counter + 1;
            grabAvailityData(claim_id)
          }else{
            alert("Claim was not found in Availity");
            console.error(err);
            counter = 3;
          }
          // increment the counter
          // call the same funciton repass the claim id

        });
  }

  const grabAveaAvailityData = (claim_id: any) => {
    setLoadingAvailityData(true);
    const url = `https://intellasurebackend-docker.onrender.com/availity/avea/${claim_id}`;
    axios.get(url)
        .then((response: any) => {
          // existing code
          console.log(response)
          const existingClaimNumbers = new Set();
          const newDataArray = response.data.claimStatuses.reduce((acc: any[], claimStatus: any) => {
            if (!existingClaimNumbers.has(claimStatus.claimControlNumber)) {
              existingClaimNumbers.add(claimStatus.claimControlNumber);
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
              };
              acc.push(newData);
            }
            return acc;
          }, []);

          setAvailityData(newDataArray);
          navigate('/availityScreen');
          setLoadingAvailityData(false);

        })
        .catch((err: any) => {
          // existing code
          setLoadingAvailityData(false);
          // check if the coutner number <3
          if(counter < 3){
            counter = counter + 1;
            grabAvailityData(claim_id)
          }else{
            alert("Claim was not found in Availity");
            console.error(err);
            counter = 3;
          }
          // increment the counter
          // call the same funciton repass the claim id

        });
  }
  
  const searchExternalData = (search: string) => {
    if(search === ''){
      grabExternalData()
    } else {
      let searchResults:any = []
      externalData?.map((record) => {
        const reference = record.prefix.toLowerCase()
        if(reference.includes(search.toLowerCase())){
          searchResults.push(record)
        }
      })
      setExternalData(searchResults)
    }
  }

  const grabExternalData = () => {
    const url = 'https://intellasurebackend-docker.onrender.com/external/getData';
    axios.get(url)
    .then((response:any) => {
      setExternalData(response.data)
    })
    .catch((err: any) => {
      console.error("Failed to fetch External Data!")
    })
  }

  const getNotes = (intake_id: string, coordinator: string) => {
    setCurrentIntakeId(intake_id)
    const url = `https://intellasurebackend-docker.onrender.com/intake/get_intake_note/${intake_id}`
    axios.get(url)
    .then((response: any) => {
      if (response){
        const newData = response.data
        const secondUrl = `https://intellasurebackend-docker.onrender.com/users/${coordinator}`
        axios.get(secondUrl)
        .then((response2: any) => {
          const newData2 = newData.map((note: any) => {
            note.name = response2.data.data.name
            return note
          })
          setCurrentNotes(newData2)
        })
      }
    })
    .catch((err: any) => {
      console.error("Error fetching notes.", err)
    })
  }

  const sendNewNotes = (notesData: any) => {
    const url = 'https://intellasurebackend-docker.onrender.com/intake/update_intake_note'
    axios.post(url, notesData)
    .then((response: any) => {
      getNotes(currentIntakeId, notesData.coordinator)
    })
    .catch((err: any) => {
      console.error("Error sending new notes.", err)
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

  const addSupportTicket = (data: any) => {
    setLoadingNewTicket(true);

    const ticket_id = generateFiveDigitNumber();
    const ticket_data = { data: {
      email: data.email,
      message: data.message,
      name: data.name,
      status: data.status,
      subject: data.subject,
      ticket_id: ticket_id
    }

    }

    const url = 'https://intellasurebackend-docker.onrender.com/support/submit_ticket'
    

    axios.post(url, ticket_data.data)
    .then((response) => {
      setLoadingNewTicket(false);
      alert('Your ticket request has been sent to our team. We will try to fix the issue and get back to your regarding this issue.')
    })

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
    aveaClaimsRecords,
    followupRecords,
    pendingRecords,
    successfullRecords,
    failedRecords,
    followupAveaRecords,
    pendingAveaRecords,
    successfullAveaRecords,
    failedAveaRecords,
    billingAnalytics,
    claimsSearch,
    activeClaimSearch,
    collectAllData,
    grabClaims,
    grabAveaClaims,
    grabAllProfiles,
    addIntakeRecord,
    handleAddRecord,
    getIntakeRecords,
    searchIntakeRecords,
    addSupportTicket,
    loadingNewTicket,
    grabRefreshClaims,
    grabRefreshAveaClaims,
    grabAvailityData,
    grabAveaAvailityData,
    availityData,
    loadingAvailityData,
    getClaimsFollowup,
    grabExternalData,
    externalData,
    getNotes,
    currentNotes,
    sendNewNotes,
    currentIntakeId,
    searchHistoricRecords,
    searchExternalData,
    handleClaimsSearchChange,
    grabSearchByNameClaims,
    handleAcriveClaimSearchChange,
    clearActiveClaimSearch
  };

  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
};


// const [followupAveaRecords, setFollowupAveaClaims] = useState<ClaimsProps[] | null>(null)
  // const [pendingAveaRecords, setPendingAveaRecords] = useState<ClaimsProps[] | null>(null)
  // const [successfullAveaRecords, setSuccessfulAveaRecords] = useState<ClaimsProps[] | null>(null)
  // const [failedAveaRecords, setFailedAveaRecords] = useState<ClaimsProps[] | null>(null)