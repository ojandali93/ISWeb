import React from 'react';

interface SelectOptionComponentProps {
  options: string[];
  value: string;
  compareColumn?: string;
  onChange: (newValue: string) => void; // The type here assumes a function that takes a string and returns void
}

const SelectOptionComponent: React.FC<SelectOptionComponentProps> = ({ options, compareColumn, value, onChange }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-slate-600 text-white rounded"
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