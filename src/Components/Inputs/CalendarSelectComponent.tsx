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
        className="px-4 py-2 m-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
      />
    </div>
  );
}

export default CalendarSelectComponent
