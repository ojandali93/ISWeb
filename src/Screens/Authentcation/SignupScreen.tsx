import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import InputContainerUser from '../../Components/General/InputContainerUser'
import { useAuth } from '../../Context/AuthContext'

const SignupScreen = () => {
  const { createNewUser } = useAuth();

  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [verify, setVerify] = useState<string>('')

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value)
  }
  
  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value)
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleVerifyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVerify(e.target.value)
  }

  const handleSignup = () => {
    createNewUser({ firstName, lastName, email, password });
  };


  return (
    <div>
      <div>
        <h1>Signup</h1>
        <InputContainerUser
          value={firstName}
          handleFunction={handleFirstNameChange}
          placeHolder={'first name...'}
          type='text'
          capitalize={'none'}
          icon={'user'}
          split={'full'}
        />
        <InputContainerUser
          value={lastName}
          handleFunction={handleLastNameChange}
          placeHolder={'last name...'}
          type='text'
          capitalize={'none'}
          icon={'user'}
          split={'full'}
        />
        <InputContainerUser
          value={email}
          handleFunction={handleEmailChange}
          placeHolder={'email...'}
          type='text'
          capitalize={'none'}
          icon={'user'}
          split={'full'}
        />
        <InputContainerUser
          value={password}
          handleFunction={handlePasswordChange}
          placeHolder={'****'}
          type='password'
          capitalize={'none'}
          icon={'user'}
          split={'full'}
        />
        <InputContainerUser
          value={verify}
          handleFunction={handleVerifyChange}
          placeHolder={'****'}
          type='password'
          capitalize={'none'}
          icon={'user'}
          split={'full'}
        />
        <div onClick={handleSignup}>
            <p>Signup</p>
          </div>
        <div>
          <Link to="/">Login</Link>
        </div>
      </div>
    </div>
  )
}

export default SignupScreen
