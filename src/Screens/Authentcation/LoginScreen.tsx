import React, { useState } from 'react'
import InputContainerUser from '../../Components/General/InputContainerUser'
import { useAuth } from '../../Context/AuthContext'
import { Link, Navigate } from 'react-router-dom'

const LoginScreen = () => {

  const {authLoading, signInUser} = useAuth()

  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  return (
    <div>
      <div>
        <h1>Login</h1>
        <InputContainerUser
          value={username}
          handleFunction={handleUsernameChange}
          placeHolder={'username'}
          type='text'
          capitalize={'none'}
          icon={'user'}
          split={'full'}
        />
        <InputContainerUser
          value={password}
          handleFunction={handlePasswordChange}
          placeHolder={'password'}
          type='password'
          capitalize={'none'}
          icon={'lock'}
          split={'full'}
        />
        <div>
          <p>Forgot Password?</p>
        </div>
        <div>
          {
            authLoading 
              ? <div>
                  <p>Loading...</p>
                </div>
              : <div onClick={() => {signInUser({username, password})}}>
                  <p>Login</p>
                </div>
          }
          <div>
            <Link to="/auth/accessCode">Signup</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginScreen
