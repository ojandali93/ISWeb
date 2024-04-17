import React, { useEffect, useRef, useState } from 'react';
import SelectOptionComponent from './SelectOptionComponent';
import SelectPeopleComponent from './SelectPeopleComponent';
import FormComponent from './FormComponent';

interface PeopleOptions {
  name: string;
  userId: string;
}

interface ColumnData {
  label: string;
  type: string;
  recordName: string;
  options?: string[];
  people?: PeopleOptions[];
}

interface RecordData {
  [key: string]: any;
}

interface TableProps {
  columns: ColumnData[];
  records: RecordData[];
}

const TableComponent: React.FC<TableProps> = (props) => {
  const { columns, records } = props;

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
        <thead className='bg-sky-800 sticky top-0 z-10 h-14'>
          <tr className="">
            {columns.map((column, index) => (
              <th key={index} className="min-w-52">
                <p className='text-lg text-white'>{column.label}</p>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {records.map((record, rowIndex) => (
            <tr key={rowIndex} className={`text-center min-h-14 h-16 text-white ${rowIndex % 2 === 0 ? 'bg-stone-900' : 'bg-stone-800'}`}>
              {columns.map((column, columnIndex) => {
                const cellValue = column.recordName ? record[column.recordName] : '';
                return (
                  <td key={columnIndex}>
                    {column.type === 'select' && column.options ? (
                      <SelectOptionComponent
                        options={column.options}
                        value={cellValue}
                        onChange={(newValue) => {
                          console.log(newValue);
                        }}
                      />
                    ) : column.type === 'boolean' ? (
                      record[column.recordName] === true ? 'Yes' : record[column.recordName] === null ? 'Unknown' : 'No'
                    ) : column.type === 'date' ? (
                      record[column.recordName] ? convertDateToMMDDYYYY(record[column.recordName]) : ''
                    ) : column.type === 'dollar' ? (
                      // console.log(record[column.recordName])
                      record[column.recordName] ? formatDollarAmount(record[column.recordName]) : ''
                    ) : column.type === 'form' ? (
                      // <FormComponent />
                      <button className={`py-1 px-3 rounded-lg bg-sky-700 hover:bg-sky-900`}>View</button>
                    ) : column.type === 'people' ? (
                      <SelectPeopleComponent
                        options={column.people}
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
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
