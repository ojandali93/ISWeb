import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../Context/AuthContext'
import SidebarComponent from '../../Components/Navigation/SidebarComponent'
import TopRowComponent from '../../Components/Navigation/TopRowComponent'

const HomeScreen = () => {

  const {signOutUser} = useAuth()

  return (
    <div className='h-screen w-screen bg-gray-700 flex flex-col'>
      <TopRowComponent />
      <div className='flex-1 flex flex-row'>
        <SidebarComponent />
        <div onClick={() => {signOutUser()}} className='flex-1 flex flex-col'>
          <button>Logout</button>
        </div>
      </div>
    </div>
  )
}

export default HomeScreen
