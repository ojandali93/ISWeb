import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faUser } from '@fortawesome/free-solid-svg-icons';

const InputContainerUser = (props: any) => {
  const {value, handleFunction, placeHolder, type, capitalize} = props

  return (
    <div>
      <FontAwesomeIcon icon={faUser}/>
      <input 
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
