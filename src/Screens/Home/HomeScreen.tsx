import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../Context/AuthContext'

const HomeScreen = () => {

  const {signOutUser} = useAuth()

  return (
    <div>
      <p className='font-bold text-3xl'>Home Screen</p>
      <div onClick={signOutUser}>
          <p>Logout</p>
        </div>
    </div>
  )
}

export default HomeScreen
