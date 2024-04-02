import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import InputContainerUser from '../../Components/General/InputContainerUser'
import { useAuth } from '../../Context/AuthContext'

const AccessCodeScreen = () => {
  const navigate = useNavigate

  const {validateAccessCode, validAccessCode} = useAuth()

  const [accessCode, setAccessCode] = useState<string>('')

  useEffect(() => {
    setAccessCode('')
  }, [])

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccessCode(e.target.value)
  }

  const checkAccessCode = () => {
    validateAccessCode(accessCode)
  }

  const redirectToSignup = () => {
    return(
      <Navigate to='/auth/signup'/>
    )
  }

  return (
    <div className='h-screen w-screen flex flex-row justify-center items-center'>
      <div className='w-1/4 bg-white p-5 rounded-xl'>
        <h1 className='pb-2 text-3xl font-bold text-black'>Access Code</h1>
        <InputContainerUser
          value={accessCode}
          handleFunction={handleUsernameChange}
          placeHolder={'access code...'}
          type='text'
          capitalize={'none'}
          icon={'Access Code'}
          split={'full'}
        />
        {
          validAccessCode
            ? redirectToSignup()
            : <div className='flex flex-row justify-center bg-primary py-2 rounded-lg mt-2' onClick={() => {checkAccessCode()}}>
                <p className='font-bold text-white'>Confirm Access Code</p>
              </div>
        }
        <div className='text-center mt-2'>
          <Link className='text-xs text-center pt-2' to="/">Back To Login</Link>
        </div>
      </div>
    </div>
  )
}

export default AccessCodeScreen
