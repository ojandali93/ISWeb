import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../Context/AuthContext'
import SidebarComponent from '../../Components/Navigation/SidebarComponent'
import TopRowComponent from '../../Components/Navigation/TopRowComponent'

const HomeScreen = () => {

  const {signOutUser} = useAuth()

  return (
    <div className='h-screen w-screen flex flex-col'>
      <TopRowComponent />
      <div className='flex-1 flex flex-row'>
        <SidebarComponent />
        <div className='flex-1 bg-white ml-2 rounded-tl-md'>
          <p>Dashboard</p>
        </div>
      </div>
    </div>
  )
}

export default HomeScreen
