import React, { useEffect, useRef, useState } from 'react';
import SelectOptionComponent from './SelectOptionComponent';
import SelectPeopleComponent from './SelectPeopleComponent';

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

  return (
    <div className='max-w-full max-h-full'>
      <table className='w-full border-collapse'>
        <thead className='bg-slate-800 sticky top-0 z-10 h-20'>
          <tr className="bg-slate-800">
            {columns.map((column, index) => (
              <th key={index} className="py-4 min-w-52">
                <p className='text-lg text-white'>{column.label}</p>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {records.map((record, rowIndex) => (
            <tr key={rowIndex} className={`text-center h-16 text-white ${rowIndex % 2 === 0 ? 'bg-alt-on' : 'bg-alt-off'}`}>
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
