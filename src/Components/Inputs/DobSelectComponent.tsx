import React, { useState } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface SelectComponentProps {
  selectedDate: Date;
  handleDateChange: (date: Date) => void;
}

const DobSelectComponent: React.FC<SelectComponentProps> = ({selectedDate, handleDateChange}) => {
  return (
    <div className='w-full flex my-2 px-3 py-2 flex-col justify-center rounded-lg'>
      <p className='pb-1 mb-2 font-bold text-primary text-md mr-4 text-white'>Date Of Birth:</p>
      <DatePicker
        id="datepicker"
        selected={selectedDate}
        onChange={handleDateChange}
        className="p-1 w-full text-white bg-sky-800 text-lg rounded-md focus:outline-none focus:border-blue-500"
      />
    </div>
  );
}

export default DobSelectComponent