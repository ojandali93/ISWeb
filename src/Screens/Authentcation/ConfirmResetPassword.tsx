import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate, useNavigation } from 'react-router-dom'
import InputContainerUser from '../../Components/Inputs/InputContainerUser'
import { useAuth } from '../../Context/AuthContext'
import BackgrounImage from '../../Assets/background1.png'


const ConfirmResetPassword = () => {
  const navigate = useNavigate

  const {validateAccessCode, validAccessCode, confirmResetPasswrd, successfulReset, currentProfile} = useAuth()

  const [accessCode, setAccessCode] = useState<string>('')
  const [newPassword, setNewPassword] = useState<string>('')
  const [newVerify, setNewVerify] = useState<string>('')

  const [validPassword, setValidPassword] = useState<boolean>(false)
  const [matchingVerify, setMatchingVerify] = useState<boolean>(false)

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccessCode(e.target.value)
  }

  const checkAccessCode = () => {
    confirmResetPasswrd(accessCode, newPassword)
  }

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isValidLength = e.target.value.length >= 8;
    const hasUpperCase = /[A-Z]/.test(e.target.value);
    const hasNumber = /[0-9]/.test(e.target.value);
    if(isValidLength && hasUpperCase && hasNumber){
      setValidPassword(true)
    } else {
      setValidPassword(false)
    }
    if(e.target.value === newVerify){
      setMatchingVerify(true)
    } else {
      setMatchingVerify(false)
    }
    setNewPassword(e.target.value)
  }

  const handleVerifyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.value === newPassword){
      setMatchingVerify(true)
    } else {
      setMatchingVerify(false)
    }
    setNewVerify(e.target.value)
  }

  const redirectToSignup = () => {
    if(validAccessCode === true){
      return(
        <Navigate to='/auth/signup'/>
      )
    }
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
        <h1 className='pb-2 text-3xl font-bold text-black'>Submit New Password</h1>
        <InputContainerUser
          value={accessCode}
          handleFunction={handleUsernameChange}
          placeHolder={'access code...'}
          type='text'
          capitalize={'none'}
          icon={'Access Code'}
          split={'full'}
        />
        <InputContainerUser
          value={newPassword}
          handleFunction={handleNewPasswordChange}
          placeHolder={'*********'}
          type='text'
          capitalize={'none'}
          icon={'New Password'}
          split={'full'}
        />
        {
          validPassword
            ? null
            : <p className='text-xs font-bold text-red-500'>A-Z, a-z, 0-9, 8+ Charactors</p>
        }
        <InputContainerUser
          value={newVerify}
          handleFunction={handleVerifyChange}
          placeHolder={'**********'}
          type='text'
          capitalize={'none'}
          icon={'Confirm Password'}
          split={'full'}
        />
        {
          matchingVerify
            ? null
            : <p className='pb-2 text-xs font-bold text-red-500'>Password & Verify don't match</p>
        }
        <div className='flex flex-row justify-center bg-primary py-2 rounded-lg mt-2' onClick={() => {checkAccessCode()}}>
          <p className='font-bold text-white'>Reset Password</p>
        </div>
        <div className='text-center mt-2'>
          <Link className='text-xs text-center pt-2' to="/">Back To Login</Link>
        </div>
      </div>
    </div>
  )
}

export default ConfirmResetPassword
