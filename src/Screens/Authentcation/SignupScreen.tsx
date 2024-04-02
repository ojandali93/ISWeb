import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import InputContainerUser from '../../Components/General/InputContainerUser'
import { useAuth } from '../../Context/AuthContext'

const SignupScreen = () => {
  const { createNewUser } = useAuth();
  const navigate = useNavigate()

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

  const goToLogin = () => {
    navigate('/')
  }

  return (
    <div className='h-screen w-screen flex flex-row justify-center items-center'>
      <div className='w-1/4 bg-white p-5 rounded-xl'>
        <h1 className='pb-2 text-3xl font-bold text-black'>Signup</h1>
        <InputContainerUser
          value={firstName}
          handleFunction={handleFirstNameChange}
          placeHolder={'first name...'}
          type='text'
          capitalize={'none'}
          icon={'First Name'}
          split={'full'}
        />
        <InputContainerUser
          value={lastName}
          handleFunction={handleLastNameChange}
          placeHolder={'last name...'}
          type='text'
          capitalize={'none'}
          icon={'Last Name'}
          split={'full'}
        />
        <InputContainerUser
          value={email}
          handleFunction={handleEmailChange}
          placeHolder={'email...'}
          type='text'
          capitalize={'none'}
          icon={'Email'}
          split={'full'}
        />
        <InputContainerUser
          value={password}
          handleFunction={handlePasswordChange}
          placeHolder={'*******'}
          type='password'
          capitalize={'none'}
          icon={'Password'}
          split={'full'}
        />
        <InputContainerUser
          value={verify}
          handleFunction={handleVerifyChange}
          placeHolder={'********'}
          type='password'
          capitalize={'none'}
          icon={'Verify Password'}
          split={'full'}
        />
        <div className='flex flex-row justify-center bg-primary py-2 rounded-lg mt-2' onClick={handleSignup}>
          <p className='font-bold text-white'>Signup</p>
        </div>
        <div className='mt-2'>
          <p className='text-xs text-center pt-2'>Have an account: <span className='text-primary font-bold' onClick={() => {goToLogin()}}>Login</span></p>
        </div>
      </div>
    </div>
  )
}

export default SignupScreen
