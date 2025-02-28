import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface SelectComponentProps {
  selectedDate: Date;
  handleDateChange: (date: string) => void;
}

const DobSelectComponent: React.FC<SelectComponentProps> = ({selectedDate, handleDateChange}) => {

  const convertDateToCustomFormatDob = (date: Date) => {
    const mm = String(date.getMonth() + 1).padStart(2, '0'); // Local month
    const dd = String(date.getDate()).padStart(2, '0'); // Local date
    const yyyy = date.getFullYear(); // Local year
    return `${yyyy}-${mm}-${dd}`;
  };

  const dateChanged = (date: Date | null) => {
    if (date) {
      // Add 1 day to the selected date
      date.setDate(date.getDate() + 1);
      handleDateChange(convertDateToCustomFormatDob(date));
    }
  };

  return (
    <div>
      <DatePicker
        id="datepicker"
        selected={selectedDate}
        onChange={dateChanged}
        className="p-1 border border-black bg-primary text-sm rounded-md focus:outline-none focus:border-blue-500"
      />
    </div>
  );
}

export default DobSelectComponent
