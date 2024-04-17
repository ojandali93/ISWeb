import React from 'react';

interface PeopleOptions {
  name: string;
  userId: string;
}

interface SelectPeopleComponentProps {
  options?: PeopleOptions[];
  value: string;
  onChange: (userId: string) => void; // The onChange now expects a userId, not a name.
}

const SelectPeopleComponent: React.FC<SelectPeopleComponentProps> = ({ options, value, onChange }) => {
  // You want to find the selected user's name using the value, which is their userId.
  // However, the `select` value should still be the userId to make the correct option selected.
  const selectedUser = options?.find(option => option.userId === value);

  return (
    <select
      value={selectedUser ? selectedUser.userId : ''}
      onChange={(e) => onChange(e.currentTarget.value)} // Use currentTarget for the correct typing.
      className="bg-sky-800 p-1 text-white rounded"
    >
      {options?.map((option, index) => (
        // Here, the value of the option is the userId, but we display the name.
        <option key={index} value={option.userId}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default SelectPeopleComponent;