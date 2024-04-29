import React, { useEffect, useState } from 'react';
import { Check } from 'react-feather';

const EditPolicyComponent = (props: any) => {
  const { value, type, capitalize, onSubmit} = props;

  const [newValue, setNewValue] = useState<string>(value)

  const handleNewValue = (text: string) => {
    setNewValue(text.toUpperCase())
  }

  const submitNewValue = () => {
    onSubmit(newValue)
  }

  return (
    <div className='flex my-2 px-3 py-2 flex-row justify-center items-center rounded-lg'>
      <input
          className='flex-1 text-lg border-b-2 border-b-slate-300 bg-stone-700 text-white'
          type={type}
          value={newValue}
          onChange={(e) => {handleNewValue(e.target.value)}} // Changed to use handleChange function
          autoCapitalize={capitalize}
        />
        <Check onClick={submitNewValue} height={20} width={20} className='text-sky-500 ml-2'/>
    </div>
  );
};

export default EditPolicyComponent;