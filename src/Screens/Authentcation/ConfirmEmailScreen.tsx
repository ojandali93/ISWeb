import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import InputContainerUser from '../../Components/Inputs/InputContainerUser'
import { useAuth } from '../../Context/AuthContext'
import BackgrounImage from '../../Assets/background.png'


const ConfirmEmailScreen = () => {
  const navigate = useNavigate()

  const {confirmEmailCode, resetConfirmEmail} = useAuth()

  const [confirmationCode, setConfirmationCode] = useState<string>('')

  const handleConfirmationCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmationCode(e.target.value)
  }

  const checkConfirmationCide = () => {
    confirmEmailCode(confirmationCode)
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
        <h1 className='pb-2 text-3xl font-bold text-black'>Email Confirmation</h1>
        <p>Check your email for a confirmatino code.</p>
        <InputContainerUser
          value={confirmationCode}
          handleFunction={handleConfirmationCodeChange}
          placeHolder={'confirmation code...'}
          type='text'
          capitalize={'none'}
          icon={'Confirmation Code'}
          split={'full'}
        />
        <div className='flex flex-row justify-center bg-primary py-2 rounded-lg mt-2' onClick={() => {checkConfirmationCide()}}>
          <p className='font-bold text-white'>Confirm Code</p>
        </div>
        <div className='text-center mt-2' onClick={() => {resetConfirmEmail()}}>
          <p className='text-xs text-center pt-2 text-primary'>Resend Code</p>
        </div>
        <div className='text-center mt-2'>
          <Link className='text-xs text-center pt-2' to="/">Back To Login</Link>
        </div>
      </div>
    </div>
  )
}

export default ConfirmEmailScreen
