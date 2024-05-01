import React, { useState } from 'react'
import { ChevronDown, ChevronUp } from 'react-feather';

interface SelectProps {
  placeholder: string;
  options: string[];
  selectedValue: number | string;
  handleOptionClick: (value: string) => void;
}

const SelectInputComponent: React.FC<SelectProps> = ({options, 
                                                      selectedValue,
                                                      handleOptionClick}) => {

  return (
    <div className='flex flex-row items-center'>
      <select
        value={selectedValue}
        onChange={(e) => handleOptionClick(e.target.value)}
        className=" p-1 border border-black bg-sky-700 text-sm rounded-md text-white focus:outline-none focus:shadow-outline"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

export default SelectInputComponent
