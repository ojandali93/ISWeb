import React from 'react';

interface ColumnData {
  label: string;
  type: string;
  recordName: string;
  options?: string[];
}

interface RecordData {
  [key: string]: any;
}

interface TableProps {
  columns: ColumnData[];
  records: RecordData[];
}

const TableComponent: React.FC<TableProps> = (props) => {
  const {columns, records} = props

  return (
    <div className="p-6 h-full w-full overflow-auto bg-slate-500">
      <table className="rounded bg-slate-500 overflow-scroll">
        <thead className="">
          <tr className="bg-slate-600">
            {columns.map((column, index) => (
              <th key={index} className="py-4 min-w-48">
                <p className='text-lg text-white'>{column.label}</p>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {records.map((record, rowIndex) => (
            <tr key={rowIndex} className='text-center h-16 max-h-40 text-white'>
              {columns.map((column, columnIndex) => (
                // If recordName is empty string, render nothing, otherwise get the value from record
                <td key={columnIndex}>{column.recordName ? record[column.recordName] : ''}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;