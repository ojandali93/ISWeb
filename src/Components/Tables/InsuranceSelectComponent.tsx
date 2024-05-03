import React, { useEffect } from 'react';
import { useData } from '../../Context/DataContext';

interface SelectOptionComponentProps {
  value: string;
  insuranceOptions: any | null;
  onChange: (newValue: string) => void; // The type here assumes a function that takes a string and returns void
}

const InsuranceSelectComponent: React.FC<SelectOptionComponentProps> = ({value, onChange, insuranceOptions }) => {

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`p-1 min-w-28 text-white text-md rounded 
        ${value === 'Yellow Stripe' ? 'bg-yellow-500' : value === 'Pending' ? 'bg-primary border-2 border-red-500' : 'bg-primary'}`}
    >
      {insuranceOptions.map((option: any, index: any) => (
        <option key={index} value={option.label}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default InsuranceSelectComponent;