import React, { useEffect } from 'react'
import { useAuth } from '../../Context/AuthContext'
import { useNavigate } from 'react-router-dom'

const LogoutScreen = () => {
  const navigate = useNavigate()

  const {currentUser, signOutUser} = useAuth()

  useEffect(() => {
    if(currentUser.userId){
      signOutUser()
    } else {
      navigate('/auth/login')
    }
    
  }, [])

  return (
    <div>
      
    </div>
  )
}

export default LogoutScreen
