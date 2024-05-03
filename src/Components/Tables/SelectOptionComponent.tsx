import React from 'react';

interface SelectOptionComponentProps {
  options: string[] | number[];
  value: string;
  compareColumn?: string;
  onChange: (newValue: string) => void; // The type here assumes a function that takes a string and returns void
}

const SelectOptionComponent: React.FC<SelectOptionComponentProps> = ({ options, compareColumn, value, onChange }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`p-1 min-w-28 text-white text-md rounded 
        ${value === 'Yellow Stripe' ? 'bg-yellow-500' : value === 'Pending' ? 'bg-primary border-2 border-red-500' : 'bg-primary'}`}
    >
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default SelectOptionComponent;