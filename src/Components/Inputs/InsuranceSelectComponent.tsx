import React, { useEffect, useState } from 'react'
import { ChevronDown, ChevronUp } from 'react-feather';

interface Option {
  label: string;
  value: string;
}

interface SelectProps {
  placeholder: string;
  options: any;
  selectedValue: string | null;
  handleOptionClick: (insurance: string, payerId: string) => void;
  isOpen: boolean;
  handleOpenSelect: () => void;
}

const InsuranceSelectComponent: React.FC<SelectProps> = ({ placeholder, 
                                                  options, 
                                                  selectedValue,
                                                  handleOptionClick,
                                                  handleOpenSelect,
                                                  isOpen }) => {

  return (
    <div className='w-full flex my-2 px-3 py-2 flex-col justify-center rounded-lg'>
      <p className='pb-1 mb-2 font-bold text-primary text-md mr-4 text-white'>Select Insurance:</p>
      <div 
        className="h-10 text-lg bg-sky-700 px-2
                    rounded-md flex items-center justify-between" 
        onClick={handleOpenSelect}
      >
        <p className="text-white">{selectedValue || placeholder}</p>
        {
          isOpen
            ? <ChevronUp size={20} />
            : <ChevronDown size={20} />
        }
      </div>
      {isOpen && (
        <div className="max-h-48 max-w-full overflow-y-scroll max-w-2/12 bg-sky-700 text-white rounded-md px-4">
          {options && options.map((option: Option) => (
            <div
              key={option.value}
              className="option py-1 border-b-2 border-b-gray-200"
              onClick={() => handleOptionClick(option.label, option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default InsuranceSelectComponent
