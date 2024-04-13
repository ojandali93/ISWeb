import React, { useState } from 'react'
import { ChevronDown, ChevronUp } from 'react-feather';

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  placeholder: string;
  options: Option[];
  selectedValue: string | null;
  handleOptionClick: (value: string) => void;
  isOpen: boolean;
  handleOpenSelect: () => void;
}

const SelectInTableComponent: React.FC<SelectProps> = ({ placeholder, 
                                                  options, 
                                                  selectedValue,
                                                  handleOptionClick,
                                                  handleOpenSelect,
                                                  isOpen }) => {

  return (
    <div className="select-container">
      <div 
        className="selected-value h-6 max-w-64 border-gray-300 border-2 text-standard 
                    rounded-sm flex items-center justify-between px-1 py-1 mx-2 mt-2" 
        onClick={handleOpenSelect}
      >
        <p className='text-gray-600 italic'>{selectedValue || placeholder}</p>
        {
          isOpen
            ? <ChevronUp size={20} />
            : <ChevronDown size={20} />
        }
      </div>
      {isOpen && (
        <div className="options-container max-w-64 border-gray-300 border-2 rounded-sm mx-2 px-1">
          {options.map((option) => (
            <div
              key={option.value}
              className="option border-b-2 border-b-gray-200"
              onClick={() => handleOptionClick(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SelectInTableComponent
