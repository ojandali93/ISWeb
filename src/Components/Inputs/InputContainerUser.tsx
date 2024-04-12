import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faUser } from '@fortawesome/free-solid-svg-icons';

const InputContainerUser = (props: any) => {
  const {value, handleFunction, placeHolder, type, icon, capitalize} = props

  return (
    <div className='flex my-2 px-3 py-2 flex-col border-2 border-slate-300 rounded-lg'>
      <p className='pb-1 font-bold text-primary'>{icon}:</p>
      <input 
        className='flex-1 border-b-2 border-b-slate-300'
        type={type} 
        placeholder={placeHolder}
        value={value}
        onChange={(val) => {handleFunction(val)}} 
        autoCapitalize={capitalize}
      />
    </div>
  )
}

export default InputContainerUser
