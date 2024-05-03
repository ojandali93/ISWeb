import React, { useEffect } from 'react';
import CellComponent from './CellComponent';
import { useClaims } from '../../Context/ClaimsContext';
import { useNavigation } from '../../Context/NavigationContext';
import { useFollowup } from '../../Context/FollowupContext';
import { useAuth } from '../../Context/AuthContext';

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

interface UserData {
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

interface RecordData {
  [key: string]: any;
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

interface TableProps {
  columns: ColumnData[];
  records: any;
  users: UserData[] | null;
  table: string
}

const TableComponent: React.FC<TableProps> = (props) => {
  const { columns, records, users, table} = props;

  const { currentSidebarTab } = useNavigation()
  const { selectedClaims, selectedClaimsAvea, allClaims, 
    allClaimsAvea, unselectAllClaims, selectAllClaims,
    unselectAllClaimsAvea, selectAllClaimsAvea } = useClaims()
  const { selectAllFollowup, unselectAllFollowup, allFollowup } = useFollowup()
  const {currentProfile} = useAuth()

  useEffect(() => {
    console.log('records length: ', records?.length)
  }, [records])

  return (
    <div className='max-w-full max-h-full'>
      <table className='w-full border-collapse'>
        <thead className='bg-primary sticky top-0 h-14'>
          <tr className="">
            {columns?.map((column, index) => {
              const width = `min-w-${column.width}`
              return(
                <th key={index} className={width}>
                  {
                    column.type === 'checkbox'
                      ? currentSidebarTab === 'Claims' 
                          ? <input
                              type="checkbox"
                              checked={table === 'Claims' ? allClaims : table === 'Avea Claims' ? allClaimsAvea : false}
                              onChange={() => {
                                if(table === 'Claims'){
                                  if(allClaims){
                                    unselectAllClaims()
                                  } else {
                                    selectAllClaims(records)
                                  }
                                }
                                if(table === 'Avea Claims'){
                                  if(allClaimsAvea){
                                    unselectAllClaimsAvea()
                                  } else {
                                    selectAllClaimsAvea(records)
                                  }
                                }
                              }}
                            />
                          : <input
                              type="checkbox"
                              checked={allFollowup}
                              onChange={() => {
                                if(allFollowup){
                                  unselectAllFollowup()
                                } else {
                                  selectAllFollowup(records)
                                }
                              }}
                            />
                      : <p className='text-lg text-white'>{column.label}</p>
                  } 
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {records != null ? ( records.map((record: any, rowIndex: number) => (
            table === 'intake' && currentProfile.department === 'intake' && currentProfile.privileges === 'staff'
              ? currentProfile.userid === record.coordinator
                  ? <tr key={rowIndex} className={`text-center min-h-14 h-16 text-white ${rowIndex % 2 === 0 ? 'bg-stone-900' : 'bg-stone-800'}`}>
                      <CellComponent table={table} columns={columns} record={record} selectedClaims={null}/>
                    </tr>
                  :  null
              :  <tr key={rowIndex} className={`text-center min-h-14 h-16 text-white ${rowIndex % 2 === 0 ? 'bg-stone-900' : 'bg-stone-800'}`}>
                  <CellComponent table={table} columns={columns} record={record} selectedClaims={table === 'Claims' ? selectedClaims : table === 'Avea Claims' ? selectedClaimsAvea : null}/>
                </tr>
          ))) : (null)}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
