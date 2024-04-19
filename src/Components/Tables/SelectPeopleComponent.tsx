import React from 'react';

interface PeopleOptions {
  active: boolean;
  company: string;
  department: string;
  email: string;
  first_name: string;
  last_name: string;
  name: string;
  privileges: string;
  userid: string;
}

interface SelectPeopleComponentProps {
  options?: PeopleOptions[] | null;
  value: string;
  onChange: (userId: string) => void;
}

const SelectPeopleComponent: React.FC<SelectPeopleComponentProps> = ({ options, value, onChange }) => {
  const selectedUser = options?.find(option => option.userid === value);

  return (
    <select
      value={selectedUser ? selectedUser.userid : ''}
      onChange={(e) => onChange(e.currentTarget.value)} 
      className="bg-sky-800 p-1 text-white rounded"
    >
      {options?.map((option, index) => (
        <option key={index} value={option.userid}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default SelectPeopleComponent;