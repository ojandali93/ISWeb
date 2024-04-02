import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import InputContainerUser from '../../Components/General/InputContainerUser'
import { useAuth } from '../../Context/AuthContext'
import BackgrounImage from '../../Assets/background.png'


const ForgotPasswordScreen = () => {

  const {resetUserEmail} = useAuth()

  const [email, setEmail] = useState<string>('')

  const handleEmailChagne = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const sendResetEmail = () => {
    resetUserEmail(email)
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
        <h1 className='pb-2 text-3xl font-bold text-black'>Forgot Password</h1>
        <p>Confirm your email to reset your password</p>
        <InputContainerUser
          value={email}
          handleFunction={handleEmailChagne}
          placeHolder={'email...'}
          type='text'
          capitalize={'none'}
          icon={'Email'}
          split={'full'}
        />
        <div className='flex flex-row justify-center bg-primary py-2 rounded-lg mt-2' onClick={() => {sendResetEmail()}}>
          <p className='font-bold text-white'>Reset Password</p>
        </div>
        <div className='text-center mt-2'>
          <Link className='text-xs text-center pt-2' to="/auth/login">Back to Login</Link>
        </div>
      </div>
    </div>
  )
}

export default ForgotPasswordScreen
