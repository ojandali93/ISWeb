import React, { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import InputContainerUser from '../../Components/General/InputContainerUser'
import { useAuth } from '../../Context/AuthContext'

const AccessCodeScreen = () => {

  const {validateAccessCode, validAccessCode} = useAuth()

  const [accessCode, setAccessCode] = useState<string>('')

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
    <div>
      <div>
        <h1>Access Code</h1>
        <InputContainerUser
          value={accessCode}
          handleFunction={handleUsernameChange}
          placeHolder={'access code...'}
          type='text'
          capitalize={'none'}
          icon={'user'}
          split={'full'}
        />
        {
          validAccessCode
            ? redirectToSignup()
            : <div onClick={() => {checkAccessCode()}}>
                <p>Confirm Access Code</p>
              </div>
        }
        <div>
          <Link to="/">Back To Login</Link>
        </div>
      </div>
    </div>
  )
}

export default AccessCodeScreen
