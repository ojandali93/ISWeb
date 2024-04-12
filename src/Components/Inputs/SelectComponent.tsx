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

const SelectComponent: React.FC<SelectProps> = ({ placeholder, 
                                                  options, 
                                                  selectedValue,
                                                  handleOptionClick,
                                                  handleOpenSelect,
                                                  isOpen }) => {

  return (
    <div className="select-container">
      <div 
        className="selected-value h-10 max-w-64 border-gray-300 border-2 text-lg 
                    rounded-md flex items-center justify-between px-4 mx-2 mt-2" 
        onClick={handleOpenSelect}
      >
        <p>{selectedValue || placeholder}</p>
        {
          isOpen
            ? <ChevronUp size={20} />
            : <ChevronDown size={20} />
        }
      </div>
      {isOpen && (
        <div className="options-container max-w-64 border-gray-300 border-2 rounded-md mx-2 px-4">
          {options.map((option) => (
            <div
              key={option.value}
              className="option py-1 border-b-2 border-b-gray-200"
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

export default SelectComponent
