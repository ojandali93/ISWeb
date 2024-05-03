import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import InputContainerUser from '../../Components/Inputs/InputContainerUser'
import { useAuth } from '../../Context/AuthContext'
import BackgrounImage from '../../Assets/background1.png'


const SignupScreen = () => {
  const { createNewUser } = useAuth();
  const {unvalidateAccessCode, validAccessCode} = useAuth()
  const navigate = useNavigate()

  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [verify, setVerify] = useState<string>('')
  const [phone, setPhone] = useState<string>('')

  const [validEmail, setValidEmail] = useState<boolean>(false)
  const [validPassword, setValidPassword] = useState<boolean>(false)
  const [matchingVerify, setMatchingVerify] = useState<boolean>(false)
  const [validPhone, setValidPhone] = useState<boolean>(false)

  useEffect(() => {
    checkForValidAccessCode()
  }, [])

  const checkForValidAccessCode = () => {
    if(validAccessCode === false){
      navigate('/auth/accessCode') 
    }
  }

  const checkForValidPhone = (phoneNumber: string) => {
    const cleanedPhoneNumber = phoneNumber.replace(/\D/g, '');

    if (cleanedPhoneNumber.length === 10) {
      setValidPhone(true) 
    } else {
      setValidPhone(false) 
    }
  }

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value)
  }
  
  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value)
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    checkForValidPhone(e.target.value)
    setPhone(e.target.value)
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailCheck = emailRegex.test(e.target.value);
    emailCheck
      ? setValidEmail(true)
      : setValidEmail(false)
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isValidLength = e.target.value.length >= 8;
    const hasUpperCase = /[A-Z]/.test(e.target.value);
    const hasNumber = /[0-9]/.test(e.target.value);
    if(isValidLength && hasUpperCase && hasNumber){
      setValidPassword(true)
    } else {
      setValidPassword(false)
    }
    if(e.target.value === verify){
      setMatchingVerify(true)
    } else {
      setMatchingVerify(false)
    }
    setPassword(e.target.value)
  }

  const handleVerifyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.value === password){
      setMatchingVerify(true)
    } else {
      setMatchingVerify(false)
    }
    setVerify(e.target.value)
  }

  const handleSignup = () => {
    if(validAccessCode && validEmail && validPassword && validPhone && matchingVerify){
      createNewUser({ firstName, lastName, email, password });
    }
  };

  const goToLogin = () => {
    unvalidateAccessCode()
    navigate('/')
  }

  return (
    <div className='h-screen w-screen flex flex-row justify-center items-center'
      style={{
        backgroundImage: `url(${BackgrounImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
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
        {
          validEmail
            ? null
            : <p className='text-xs font-bold text-red-500'>Add valid email</p>
        }
        <InputContainerUser
          value={password}
          handleFunction={handlePasswordChange}
          placeHolder={'*******'}
          type='password'
          capitalize={'none'}
          icon={'Password'}
          split={'full'}
        />
        {
          validPassword
            ? null
            : <p className='text-xs font-bold text-red-500'>A-Z, a-z, 0-9, 8+ Charactors</p>
        }
        <InputContainerUser
          value={verify}
          handleFunction={handleVerifyChange}
          placeHolder={'********'}
          type='password'
          capitalize={'none'}
          icon={'Verify Password'}
          split={'full'}
        />
        {
          matchingVerify
            ? null
            : <p className='pb-2 text-xs font-bold text-red-500'>Password & Verify don't match</p>
        }
        <div className='h-1 bg-slate-500'></div>
        <InputContainerUser
          value={phone}
          handleFunction={handlePhoneChange}
          placeHolder={'000-000-0000'}
          type='text'
          capitalize={'none'}
          icon={'Phone Number'}
          split={'full'}
        />
        {
          validPhone
            ? null
            : <p className='text-xs font-bold text-red-500'>Submit a valid phone number</p>
        }
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
