import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faUser } from '@fortawesome/free-solid-svg-icons';
import SelectComponent from './SelectComponent';
import SelectOptionComponent from '../Tables/SelectOptionComponent';

const FormInputComponent = (props: any) => {
  const { value, handleFunction, placeHolder, type, icon, capitalize, input, options, selectedOption } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    handleFunction(newValue);
  };

  return (
    <div className='flex my-2 px-3 py-2 flex-col justify-center rounded-lg'>
      <p className='pb-1 font-bold text-primary text-md mr-4'>{icon}:</p>
      {input === 'select' ? (
        // <SelectOptionComponent
        //   options={options}
        //   value={value}
        //   onChange={handleFunction}
        // />
        <p>select me</p>
      ) : (
        <input
          className='flex-1 text-lg border-b-2 border-b-slate-300 bg-stone-700 text-white'
          type={type}
          placeholder={placeHolder}
          value={value}
          onChange={handleChange} // Changed to use handleChange function
          autoCapitalize={capitalize}
        />
      )}
    </div>
  );
};

export default FormInputComponent;