import React, { useState } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface SelectComponentProps {
  selectedDate: Date;
  handleDateChange: (date: Date) => void;
}

const CalendarSelectComponent: React.FC<SelectComponentProps> = ({selectedDate, handleDateChange}) => {
  return (
    <div>
      <DatePicker
        id="datepicker"
        selected={selectedDate}
        onChange={handleDateChange}
        className="p-1 border border-black bg-primary text-sm w-32 rounded-md text-white focus:outline-none focus:border-blue-500"
      />
    </div>
  );
}

export default CalendarSelectComponent
