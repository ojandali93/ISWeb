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
import { useClaims } from '../../Context/ClaimsContext';
import { useNavigation } from '../../Context/NavigationContext';
import { useFollowup } from '../../Context/FollowupContext';


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
  
  const {intakeUsers, getIntakeRecords, insuranceOptions, grabAllProfiles, grabAvailityData, loadingAvailityData, billingUsers} = useData()
  const {updateSelectedClaims} = useClaims()
  const {currentSidebarTab} = useNavigation()
  const {selectedFollowup, updateSelectedFollowup, updateCoordinatorFollwup} = useFollowup()


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
    console.log('new date as string: ', date)
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
    console.log(intake_id)
    let config = {
      method: 'delete',
      maxBodyLength: Infinity,
      url: `https://intellasurebackend-docker.onrender.com/intake/${intake_id}`,
      headers: { }
    };

    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
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
    const date = new Date(dateStr);
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
    console.log('column name: ', columnName)
    console.log('value: ', value)
    console.log('record: ', record)
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
                                  : convertDateToCustomFormat(record.expected_arrival_date),
      "dob": columnName === 'DOB' ? value : record.date_of_birth,
      "policy": columnName === 'Policy' ? value : record.policy_id,
      "insurance": columnName === 'Insurance' ? value : record.insurance
    }
    console.log('updated record: ', data)
    submitUpdate(data)
  }

  const handlePrivilegeChange = (columnName: string | undefined, record: any, value: any) => {
    console.log(record)
    const data = {
      "department": columnName === 'Department' ? value : record.department,
      "privileges": columnName === 'Privileges' ? value : record.privileges,
      "active": record.active
    };
    console.log("data object: ", data);
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
        console.log(response)
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
                        console.log('updated select option: ', newValue);
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
                      console.log('updated select option: ', newValue);
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
                            console.log('updated select option: ', date);
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
                      console.log('updated select option: ', date);
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
              <div>
                <button onClick={() => {handleDeleteRecord(record.intake_id)}} className={`py-1 px-3 rounded-lg bg-sky-700 hover:bg-sky-900`}>Remove</button>
              </div>
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
                        console.log('updated select option: ', newValue);
                      }}
                    />
                  </div>
                : <div>
                    <SelectPeopleComponent
                      options={formattedBillingUsers()}
                      value={cellValue === null ? 'Select Coordinator' : getCoordinatorName(cellValue)}
                      onChange={(newValue) => {
                        console.log('default value: ', cellValue)
                        console.log('updated select option: ', newValue);
                        updateCoordinatorFollwup(record['claim_id'], newValue)
                      }}
                    />
                  </div>
            ) : column.type === 'checkbox' ? (
              currentSidebarTab === 'Claims'
                ? <>
                    <input
                      type="checkbox"
                      checked={table === 'Claims' ? selectedClaims?.includes(record['claim_id']) : false}
                      onChange={() => {
                        updateSelectedClaims(record['claim_id'])
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
                <Edit height={20} width={20} className='text-sky-500 ml-2'/>
              </div></>
            ) : column.type === 'clickable' ? (
              loadingAvailityData === false ? (
                <div>
                <p className='text-primary' onClick={() => grabAvailityData(record['claim_id'])}>{record[column.recordName]}</p>
              </div>
              ) :
              <div className='animate-spin'>
                <p className='text-primary'>Loading Availity</p>
              </div>
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
