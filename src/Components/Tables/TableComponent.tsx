import React, { useEffect, useRef, useState } from 'react';
import SelectOptionComponent from './SelectOptionComponent';
import SelectPeopleComponent from './SelectPeopleComponent';
import FormComponent from './FormComponent';
import CalendarSelectComponent from '../Inputs/CalendarSelectComponent';

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

interface TableProps {
  columns: ColumnData[];
  records: RecordData[];
  users: UserData[] | null;
}

const TableComponent: React.FC<TableProps> = (props) => {
  const { columns, records, users } = props;

  const [selectedDate, setSelectedDate] = useState(new Date())

  const handleDateSelectedChange = (date: Date) => {
    setSelectedDate(date)
  }

  function convertDateToMMDDYYYY(dateString: string) {
    const date = new Date(dateString);
    const mm = String(date.getUTCMonth() + 1).padStart(2, '0'); // UTC months from 1-12
    const dd = String(date.getUTCDate()).padStart(2, '0'); // UTC day of the month
    const yyyy = date.getUTCFullYear(); // UTC full year
  
    return `${mm}/${dd}/${yyyy}`;
  }

  const formatDollarAmount = (str: string) => {
    const num = parseFloat(str);
    return num.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  }


  return (
    <div className='max-w-full max-h-full'>
      <table className='w-full border-collapse'>
        <thead className='bg-sky-800 sticky top-0 h-14'>
          <tr className="">
            {columns.map((column, index) => (
              <th key={index} className="min-w-52">
                <p className='text-lg text-white'>{column.label}</p>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {records != null ? ( records.map((record, rowIndex) => (
            <tr key={rowIndex} className={`text-center min-h-14 h-16 text-white ${rowIndex % 2 === 0 ? 'bg-stone-900' : 'bg-stone-800'}`}>
              {columns.map((column, columnIndex) => {
                const cellValue = column.recordName ? record[column.recordName] : '';
                return (
                  <td key={columnIndex}>
                    {column.type === 'select' && column.options ? (
                      column.type === 'select' && column.dependent && column.dependentResults ? (
                        column.dependentResults.includes(record[column.dependent]) ? (
                          <SelectOptionComponent
                            options={column.options}
                            value={cellValue}
                            onChange={(newValue) => {
                              console.log(newValue);
                            }}
                          />
                        ) : (
                          null
                        )
                      ) : (
                        <SelectOptionComponent
                          options={column.options}
                          value={cellValue}
                          onChange={(newValue) => {
                            console.log(newValue);
                          }}
                        />
                      )
                    ) : column.type === 'boolean' ? (
                      record[column.recordName] === true ? 'Yes' : record[column.recordName] === null ? 'Unknown' : 'No'
                    ) : column.type === 'date' ? (
                      <>{convertDateToMMDDYYYY(record[column.recordName])}</>
                    ) : column.type === 'select_date' ? (
                      column.type === 'select_date' && column.dependent && column.dependentResults ? (
                        column.dependentResults.includes(record[column.dependent]) ? (
                          <CalendarSelectComponent selectedDate={selectedDate} handleDateChange={handleDateSelectedChange}/>
                        ) : (
                          null
                        )
                      ) : ( null )
                    ) : column.type === 'dollar' ? (
                      record[column.recordName] ? formatDollarAmount(record[column.recordName]) : ''
                    ) : column.type === 'form' ? (
                      <button className={`py-1 px-3 rounded-lg bg-sky-700 hover:bg-sky-900`}>View</button>
                    ) : column.type === 'people' ? (
                      <SelectPeopleComponent
                        options={users}
                        value={cellValue}
                        onChange={(newValue) => {
                          console.log(newValue);
                        }}
                      />
                    ) : (
                      record[column.recordName] ? record[column.recordName] : ''
                    )}
                  </td>
                );
              })}
            </tr>
          ))) : (null)}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
