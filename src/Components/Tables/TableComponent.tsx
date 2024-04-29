import React, { useEffect } from 'react';
import CellComponent from './CellComponent';
import { useClaims } from '../../Context/ClaimsContext';

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

  const { selectedClaims } = useClaims()

  useEffect(() => {
    console.log(selectedClaims)
  }, [selectedClaims])

  return (
    <div className='max-w-full max-h-full'>
      <table className='w-full border-collapse'>
        <thead className='bg-sky-800 sticky top-0 h-14'>
          <tr className="">
            {columns?.map((column, index) => {
              const width = `min-w-${column.width}`
              return(
                <th key={index} className={width}>
                  <p className='text-lg text-white'>{column.label}</p>
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {records != null ? ( records.map((record: any, rowIndex: number) => (
            <tr key={rowIndex} className={`text-center min-h-14 h-16 text-white ${rowIndex % 2 === 0 ? 'bg-stone-900' : 'bg-stone-800'}`}>
              <CellComponent table={table} columns={columns} record={record} selectedClaims={table === 'Claims' ? selectedClaims : null}/>
            </tr>
          ))) : (null)}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
