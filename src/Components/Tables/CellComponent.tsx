import React, { useEffect, useState } from 'react'
import SelectOptionComponent from './SelectOptionComponent';
import CalendarSelectComponent from '../Inputs/CalendarSelectComponent';
import SelectPeopleComponent from './SelectPeopleComponent';
import { useData } from '../../Context/DataContext';
import axios from 'axios';
import { Check, Edit, X } from 'react-feather';
import { setRef } from '@mui/material';
import DateChangeComponent from '../Inputs/DateChangeComponent';
import InsuranceSelectComponent from './InsuranceSelectComponent';
import EditPolicyComponent from './EditPolicyComponent';
import DateSelectionComponent from '../Inputs/DateSelectionComponent';
import NotesForm from '../Forms/NotesForm';
import { useClaims } from '../../Context/ClaimsContext';
import { useNavigation } from '../../Context/NavigationContext';
import { useFollowup } from '../../Context/FollowupContext';
import ButtonComponent from '../Inputs/ButtonComponent';
import { useNavigate, useLocation } from 'react-router-dom';
import { useHistoric } from '../../Context/HistoricContext';
import SingleClickTabComponent from '../Navigation/SingleClickTabComponent';
import SingleSelectClickComponent from './SingleSelectClickComponent';
import { useAuth } from '../../Context/AuthContext';
import { useIntake } from '../../Context/IntakeContext';

interface PeopleOptions {
  name: string;
  userId: string;
}

interface ColumnData {
  label: string;
  type: string;
  recordName: string;
  options?: string[];
  dependent?: string;
  dependentResults?: string[];
  people?: PeopleOptions[];
  width?: string;
}

interface RecordData {
  [key: string]: any;
}

interface CellProps {
  columns: ColumnData[],
  record: RecordData,
  table: string,
  selectedClaims?: string[] | null
}

const CellComponent: React.FC<CellProps> = ({columns, record, table, selectedClaims}) => {
  const navigate = useNavigate()
  const {intakeUsers, getIntakeRecords, insuranceOptions, grabAllProfiles, grabAvailityData, grabAveaAvailityData, billingUsers, getNotes} = useData()
  const {updateSelectedClaims, updateSelectedClaimsAvea} = useClaims()
  const {grabPrefixRecords, grabUserRecords} = useHistoric()
  const {currentSidebarTab, currentSidebarSubTab, handleUpdateCurrentSidebarTab} = useNavigation()
  const {selectedFollowup, updateSelectedFollowup, updateCoordinatorFollwup, removeBatchToFavorites} = useFollowup()
  const {currentProfile} = useAuth()
  const {showPrefixPopup, showPrefix, grabPrefixRecordsFromDashboard} = useIntake();
  const location = useLocation()


  const [selectedDate, setSelectedDate] = useState(record.expected_arrival_date ? record.expected_arrival_date : new Date())
  const [dobDate, setDobDate] = useState(record.date_of_birth)

  const [editDate, setEditDate] = useState<boolean>(false)

  const [editInsurance, setEditInsurance] = useState<boolean>(false)
  const [editPolicy, setEditPolicy] = useState<boolean>(false)

  const [columnName, setColumnName] = useState<string>()
  const [singleRecord, setSingleRecord] = useState<any>()
  const [value, setValue] = useState<any>()

  const [showNotes, setShowNotes] = useState<boolean>(false)

  const toggleShowPopup = () => {
    setShowNotes(!showNotes)
  }

  const updateEditDate = (columnName: string, record: any, value: any) => {
    setValue(value)
    setColumnName(columnName)
    setSingleRecord(record)
    setEditDate(!editDate)
  }

  const toggleEditInsurance = (columnName: string, record: any, value: any) => {
    setValue(value)
    setColumnName(columnName)
    setSingleRecord(record)
    setEditInsurance(!editInsurance)
  }

  const toggleEditPolicy = (columnName: string, record: any, value: any) => {
    setValue(value)
    setColumnName(columnName)
    setSingleRecord(record)
    setEditPolicy(!editPolicy)
  }

  const handleDateChange = (date: string) => {
    setValue(date)
  }

  const handleSubitDateChange = () => {
    handleSelectChange(columnName, singleRecord, value)
    setEditDate(!editDate)
  }

  const updateInsuranceName = (newValue: string) => {
    handleSelectChange(columnName, singleRecord, newValue)
    setEditInsurance(!editInsurance)
  }

  const submitPolciy = (newValue: string) => {
    handleSelectChange(columnName, singleRecord, newValue)
    setEditPolicy(!editPolicy)
  }

  const handleDeleteRecord = (intake_id: string) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
        handleDelete(intake_id);  // User clicked OK
    } else {
        console.log("Delete operation was canceled.");  // User clicked cancel or closed the dialog
    }
  }

  const handleDelete = (intake_id: string) => {
    let config = {
      method: 'delete',
      maxBodyLength: Infinity,
      url: `https://intellasurebackend-docker.onrender.com/intake/${intake_id}`,
      headers: { }
    };

    axios.request(config)
    .then((response) => {
      getIntakeRecords()
    })
    .catch((error) => {
      console.log(error);
    });
  }

  useEffect(() => {
    if (record.expected_arrival_date) {
      const parsedDate = new Date(record.expected_arrival_date);
      setSelectedDate(parsedDate);
    } else {
      setSelectedDate(new Date());
    }
  }, [record.expected_arrival_date]);

  function convertDateToMMDDYYYY(dateString: string) {
    const date = new Date(dateString);
    const mm = String(date.getUTCMonth() + 1).padStart(2, '0'); 
    const dd = String(date.getUTCDate()).padStart(2, '0'); 
    const yyyy = date.getUTCFullYear(); 

    return `${mm}/${dd}/${yyyy}`;
  }

  function convertDobDateToMMDDYYYY(dateString: string) {
    const date = new Date(dateString);
    const mm = String(date.getUTCMonth() + 1).padStart(2, '0'); 
    const dd = String(date.getUTCDate()).padStart(2, '0'); 
    const yyyy = date.getUTCFullYear(); 

    return `${mm}/${dd}/${yyyy}`;
  }

  function convertDateToCustomFormatDate(date: Date) {
    const mm = String(date.getUTCMonth() + 1).padStart(2, '0');  // pad with zero if needed
    const dd = String(date.getUTCDate()).padStart(2, '0');  // pad with zero if needed
    const yyyy = date.getUTCFullYear();
    return `${yyyy}-${mm}-${dd}`;
  }

  function convertDateToCustomFormat(dateStr: string) {
    const date = new Date(dateStr);
    const mm = String(date.getUTCMonth() + 1).padStart(2, '0'); 
    const dd = String(date.getUTCDate()).padStart(2, '0'); 
    const yyyy = date.getUTCFullYear(); 
    return `${yyyy}-${mm}-${dd}`;
  }

  function convertDateToCustomFormatDob(dateStr: string) {
    console.log('converting date: ', dateStr)
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
      // Date parsing failed, handle invalid date string
      return "Invalid Date";
  }
    const mm = String(date.getUTCMonth() + 1).padStart(2, '0'); 
    const dd = String(date.getUTCDate() - 1).padStart(2, '0'); 
    const yyyy = date.getUTCFullYear(); 
    return `${yyyy}-${mm}-${dd}`;
  }

  const handleDateSelectedChange = (date: string, column: string) => {
    column === 'DOB'
      ? setDobDate(date)
      : setSelectedDate(date)
  }

  const formatDollarAmount = (str: string) => {
    const num = parseFloat(str);
    return num.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  }

  function truncateString(input: string, maxLength: number = 35): string {
    if (input.length > maxLength) {
      return input.substring(0, maxLength) + '...';
    }
    return input;
  }

  const getCoordinatorName = (userId: string) => {
    const coordinator = billingUsers?.find(user => user.userid === userId);
    return coordinator ? coordinator.name : '';
  };

  const submitUpdate = (data: any) => {
    let config = {
      method: 'patch',
      maxBodyLength: Infinity,
      url: `https://intellasurebackend-docker.onrender.com/intake/${record.intake_id}`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data,
    };
    axios.request(config)
      .then((response) => {
        getIntakeRecords()
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleSelectChange = (columnName: string | undefined, record: any, value: any) => {
    columnName === 'DOB' || columnName === 'Policy' || columnName === 'Insurance'
      ? updateInsuranceInfo(columnName, record, value)
      : updateRecordInfo(columnName, record, value)
  }

  const updateRecordInfo = (columnName: string | undefined, record: any, value: any) => {
    const data = {
      "checked_in": columnName === 'Status' ? value : record.checked_in,
      "booked": columnName === 'Booked' ? value : record.booked,
      "coordinator": columnName === 'Coordinator' ? value : record.coordinator,
      "summary_out": record.summary_out,
      "reason": columnName === 'Reason' ? value : record.reason,
      'facility': columnName === 'Facility' ? value : record.facility,
      "expected_arrival_date": columnName === 'Arriving Date' 
                                ? value
                                : record.expected_arrival_date === null 
                                  ? convertDateToCustomFormatDate(new Date()) 
                                  : convertDateToCustomFormat(record.expected_arrival_date)
    }
    console.log('updating data: ', data)
    console.log('jsonified data: ', JSON.stringify(data))
    let config = {
      method: 'patch',
      maxBodyLength: Infinity,
      url: `https://intellasurebackend-docker.onrender.com/intake/update_non_insurance_info/${record.intake_id}`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data,
    };
    axios.request(config)
      .then((response) => {
        console.log(response.data)
        getIntakeRecords()
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const updateInsuranceInfo = (columnName: string | undefined, record: any, value: any) => {
    console.log('updating dob: ', typeof value)
    console.log('updating dob: ', convertDateToCustomFormat(value))
    const data = {
      "dob": columnName === 'DOB' ? convertDateToCustomFormatDob(value) : convertDateToCustomFormatDob(record.date_of_birth),
      "policy": columnName === 'Policy' ? value : record.policy_id,
      "insurance": columnName === 'Insurance' ? value : record.insurance
    }
    console.log('updating data: ', data)
    console.log('jsonified data: ', JSON.stringify(data))
    let config = {
      method: 'patch',
      maxBodyLength: Infinity,
      url: `https://intellasurebackend-docker.onrender.com/intake/update_insurance_info/${record.intake_id}`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data,
    };
    axios.request(config)
      .then((response) => {
        getIntakeRecords()
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handlePrivilegeChange = (columnName: string | undefined, record: any, value: any) => {
    const data = {
      "department": columnName === 'Department' ? value : record.department,
      "privileges": columnName === 'Privileges' ? value : record.privileges,
      "active": record.active
    };
    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: `https://intellasurebackend-docker.onrender.com/users/update/${record.userid}`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data,
    };
    axios.request(config)
      .then((response: any) => {
        grabAllProfiles();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const formattedBillingUsers = () => {
    let newUsers: any = []
    newUsers.push({
      active: false,
      company: 'PHG',
      department: 'billing',
      email: '-',
      first_name: '-',
      last_name: '-',
      name: 'Select Coodinator',
      privileges: 'staff',
      userid: '-',
    })
    billingUsers?.map((user) => {
      newUsers.push(user)
    })
    return newUsers
  }

  const handleClick = (prefixId: string, network: string) => {
    handleUpdateCurrentSidebarTab('HistoricPrefix', location.pathname)
    grabPrefixRecords(prefixId, network)
    navigate(`/historic/prefix/${prefixId}/${network}`);
  };

  const handleClickHistoric = (policy_id: string) => {
    handleUpdateCurrentSidebarTab('HistoricPolicy', location.pathname)
    grabUserRecords(policy_id)
    navigate(`/historic/user/${policy_id}`);
  }

  return (
    <>
      {columns.map((column, columnIndex) => {
        const cellValue = column.recordName ? record[column.recordName] : '';
        const width = `min-w-${column.width}`
        return (
          <td key={columnIndex}>
            {column.type === 'select' && column.options ? (
              column.type === 'select' && column.dependent && column.dependentResults ? (
                column.dependentResults.includes(record[column.dependent]) ? (
                  <div>
                    <SelectOptionComponent
                      options={column.options}
                      value={cellValue}
                      onChange={(newValue) => {
                        handleSelectChange(column.label, record, newValue)
                      }}
                    />
                  </div>
                ) : (
                  null
                )
              ) : currentSidebarTab === 'Accounts' ? (
                <div>
                  <SelectOptionComponent
                    options={column.options}
                    value={cellValue}
                    onChange={(newValue) => {
                      handlePrivilegeChange(column.label,record, newValue)
                    }}
                  />
                </div>
              ) : (
                <div>
                  <SelectOptionComponent
                    options={column.options}
                    value={cellValue}
                    onChange={(newValue) => {
                      handleSelectChange(column.label, record, newValue)
                    }}
                  />
                </div>
              )
            ) : column.type === 'select-edit' ? (
              <>
                <div className={`flex flex-row justify-center`}>
                  {record[column.recordName]}
                  <Edit height={20} width={20} className='text-sky-500 ml-2'/>
                </div>
              </>
            ) : column.type === 'insurance-edit' ? (
              <>
                <div className='flex flex-row justify-center'>
                  {
                    editInsurance
                      ? <>
                          <div>
                            <InsuranceSelectComponent value={record[column.recordName]} onChange={updateInsuranceName} insuranceOptions={insuranceOptions}/>
                          </div>
                        </>
                      : <>
                          <div className={` flex flex-row`}>
                            {record[column.recordName]}
                            <Edit onClick={() => {toggleEditInsurance(column.label, record, record[column.recordName])}} height={20} width={20} className='text-sky-500 ml-2'/>
                          </div>
                        </>
                  }
                </div>
              </>
            ) : column.type === 'policy-edit' ? (
              <>
                <div className={` flex flex-row justify-center`}>
                  {
                    editPolicy
                      ? <>
                          <div >
                            <EditPolicyComponent value={record[column.recordName]} onSubmit={submitPolciy} type='text' capitalize={true}/>
                          </div>
                        </>
                      : <>
                          <div className={` flex flex-row`}>
                            {record[column.recordName]}
                            <Edit onClick={() => {toggleEditPolicy(column.label, record, record[column.recordName])}} height={20} width={20} className='text-sky-500 ml-2'/>
                          </div>
                        </>
                  }
                </div>
              </>
            ) : column.type === 'boolean' ? (
              <div  className={`flex flex-row justify-center`}>
                <p>{record[column.recordName] === true ? 'Yes' : record[column.recordName] === null ? 'Unknown' : 'No'}</p>
              </div>
            ) : column.type === 'date' ? (
              <>
                <div>
                  <p>{convertDateToMMDDYYYY(record[column.recordName])}</p>
                </div>
              </>
            ) : column.type === 'date-edit' ? (
              <>
                <div className={`flex flex-row justify-center`}>
                  {
                    editDate
                      ? <>
                          <div className='flex flex-row items-center'>
                          <DateChangeComponent selectedDate={dobDate} handleDateChange={(date: string) => {
                            handleDateSelectedChange(date, column.label)
                            handleSelectChange(column.label, record, date)
                          }}/>
                          </div>
                        </>
                      : <>
                          {convertDobDateToMMDDYYYY(record[column.recordName])}
                          <Edit onClick={() => {updateEditDate(column.label, record, record[column.recordName])}} height={20} width={20} className='text-sky-500 ml-2'/>
                        </>
                  }
                </div>
              </>
            ) : column.type === 'select_date' ? (
              column.type === 'select_date' && column.dependent && column.dependentResults ? (
                column.dependentResults.includes(record[column.dependent]) ? (
                  <div>
                    <DateSelectionComponent selectedDate={selectedDate} handleDateChange={(date: string) => {
                      handleDateSelectedChange(date, column.label)
                      handleSelectChange(column.label, record, date)
                    }}/>
                  </div>
                ) : (
                  null
                )
              ) : ( null )
            ) : column.type === 'dollar' ? (
              <div>
                <p>
                  {record[column.recordName] ? formatDollarAmount(record[column.recordName]) : ''}
                </p>
              </div>
            ) : column.type === 'delete' ? (
              currentSidebarTab === 'Follow Up'
                ? currentSidebarSubTab === 'Collab Md'
                    ? <div>
                        {
                          currentProfile.privileges === 'admin' || currentProfile.privileges === 'manager' || currentProfile.privileges === 'dev' || currentProfile.privileges === 'owner'
                            ? <div>
                                <button onClick={() => {removeBatchToFavorites(record.claim_id)}} className={`py-1 px-3 rounded-lg bg-primary hover:bg-secondary`}>Remove</button>
                              </div>
                            : null
                        }
                      </div>
                    : <div>
                        {
                          currentProfile.privileges === 'admin' || currentProfile.privileges === 'manager' || currentProfile.privileges === 'dev' || currentProfile.privileges === 'owner'
                            ? <div>
                                <button onClick={() => {handleDeleteRecord(record.intake_id)}} className={`py-1 px-3 rounded-lg bg-primary hover:bg-secondary`}>Remove</button>
                              </div>
                            : null
                        }
                      </div>
                : <>
                    {
                      currentProfile.privileges === 'admin' || currentProfile.privileges === 'manager' || currentProfile.privileges === 'dev' || currentProfile.privileges === 'owner'
                        ? <div>
                            <button onClick={() => {handleDeleteRecord(record.intake_id)}} className={`py-1 px-3 rounded-lg bg-primary hover:bg-secondary`}>Remove</button>
                          </div>
                        : null
                    }
                  </>
            ) : column.type === 'percent' ? (
              <div>
                <p>{record[column.recordName] === 0 ? '0%' : `${(record[column.recordName] * 100).toFixed(1)}%`}</p>
              </div>
            ) : column.type === 'note' ? (
              <div className='max-w-96 py-2'>
                <p>
                  {record[column.recordName] ? record[column.recordName] : ''}
                </p>
              </div>
            ) : column.type === 'people' ? (
              currentSidebarTab === 'Dashboard'
                ? <div>
                    <SelectPeopleComponent
                      options={intakeUsers}
                      value={cellValue}
                      onChange={(newValue) => {
                        handleSelectChange(column.label, record, newValue)
                      }}
                    />
                  </div>
                : <div>
                    <SelectPeopleComponent
                      options={formattedBillingUsers()}
                      value={cellValue === null ? 'Select Coordinator' : getCoordinatorName(cellValue)}
                      onChange={(newValue) => {
                        updateCoordinatorFollwup(record['claim_id'], newValue)
                      }}
                    />
                  </div>
            ) : column.type === 'popup' ? (
              !showNotes 
              ?
              <div className="" onClick={() => {getNotes(record.intake_id, record.coordinator); toggleShowPopup()}}>
                <button className='text-center px-2 py-1 bg-primary rounded-md font-bold text-white min-w-28 ml-4'>Show Notes</button>
              </div>
              : <div className='fixed inset-0 bg-black bg-opacity-80 z-40 flex justify-center items-center overflow-auto w-full min-w-full mt-18'>
                  <div className='bg-alt-on p-4 rounded-lg shadow-lg z-50 max-h-[75vh] overflow-aut min-w-[75vw]'>
                    <NotesForm />
                    <ButtonComponent label='Close' handler={() => { toggleShowPopup() }}/>
                  </div>
                </div>
            
            ) : column.type === 'checkbox' ? (
              currentSidebarTab === 'Claims'
                ? <>
                    <input
                      type="checkbox"
                      checked={table === 'Claims' ? selectedClaims?.includes(record['claim_id']) : table === 'Avea Claims' ? selectedClaims?.includes(record['claim_id']) : false}
                      onChange={() => {
                        if(table === 'Claims'){
                          updateSelectedClaims(record['claim_id'])
                        }
                        if(table === 'Avea Claims'){
                          updateSelectedClaimsAvea(record['claim_id'])
                        }
                      }}
                    />
                  </>
                : <>
                    <input
                      type="checkbox"
                      checked={table === 'Claims' ? selectedFollowup?.includes(record['claim_id']) : false}
                      onChange={() => {
                        updateSelectedFollowup(record['claim_id'])
                      }}
                    />
                  </>
            ) : column.type === 'text-edit' ? (
              <><div className={`flex flex-row justify-center`}>
                {record[column.recordName]}
                <Edit height={20} width={20} className='text-secondary ml-2'/>
              </div></>
            ) : column.type === 'clickable' ? (
              currentSidebarTab === 'Historic'
                ? <div className='hover:cursor-pointer'>
                    <p className='text-sky-500' onClick={() => {handleClick(record[column.recordName], record['network'])}}>{record[column.recordName]}</p>
                  </div>
                : currentSidebarTab === 'HistoricPrefix'
                    ? <div className='hover:cursor-pointer'>
                        <p className='text-sky-500' onClick={() => {handleClickHistoric(record[column.recordName])}}>{record[column.recordName]}</p>
                      </div>
                    : currentSidebarTab === 'Dashboard'
                        ? column.label === 'Prefix'
                            ?<div className='hover:cursor-pointer' onClick={() => {grabPrefixRecordsFromDashboard(record[column.recordName]);showPrefixPopup()}}>
                                <p className='text-primary'>{record[column.recordName]}</p>
                              </div>
                            : <div>{record[column.recordName] ? record[column.recordName] : ''}</div>
                        
                        : currentSidebarSubTab === 'Avea'  
                          ? <SingleSelectClickComponent value={record[column.recordName]} onChange={grabAveaAvailityData} record={record}/>
                          
                            :<SingleSelectClickComponent value={record[column.recordName]} onChange={grabAvailityData} record={record}/>
            ) : (
              <div>
                <p>
                  {record[column.recordName] ? record[column.recordName] : ''}
                </p>
              </div>
            )}
          </td>
        );
      })}
    </>
  )
}

export default CellComponent
