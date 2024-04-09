import React, { useState } from 'react'
import InputContainerUser from '../../Components/General/InputContainerUser'
import { useAuth } from '../../Context/AuthContext'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import BackgrounImage from '../../Assets/background.png'
// import '../../App.css';

const LoginScreen = () => {
  const navigate = useNavigate()

  const {authLoading, signInUser, validLogin} = useAuth()

  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const loginAUser = () => {
    signInUser({username, password})
  }

  const goToHome = () => {
    navigate('/auth/accessCode')
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
        <h1 className='pb-2 text-3xl font-bold text-black'>Login</h1>
        {
          validLogin
            ? null
            : <p className='pb-2 text-sm text-red-500'>Username/Password don't match our records</p>
        }
        <form onSubmit={() => {loginAUser()}}>
          <InputContainerUser
            value={username}
            handleFunction={handleUsernameChange}
            placeHolder={'email'}
            type='text'
            capitalize={'none'}
            icon={'Email'}
            split={'full'}
          />
          <InputContainerUser
            value={password}
            handleFunction={handlePasswordChange}
            placeHolder={'password'}
            type='password'
            capitalize={'none'}
            icon={'Password'}
            split={'full'}
          />
        </form>
        <div className='text-end'>
          <Link to="/auth/forgotPassword" className='text-sm text-primary'>Forgot Password?</Link>
        </div>
        <div onClick={() => {signInUser({username, password})}} 
            className='flex flex-row justify-center bg-primary py-2 rounded-lg mt-2'>
          {
            authLoading 
              ? <p className='font-bold text-white'>Loading...</p>
              : <p className='font-bold text-white'>Login</p>
          }
        </div>
        <div className=' mt-2'>
          <p className='text-xs text-center pt-2'>Create an account: <span onClick={() =>{goToHome()}} className='text-primary font-bold'>Click Here</span></p>
        </div>
      </div>
    </div>
  )
}

export default LoginScreen
