import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../Context/AuthContext'
import SidebarComponent from '../../Components/Navigation/SidebarComponent'
import TopRowComponent from '../../Components/Navigation/TopRowComponent'

const HomeScreen = () => {

  const {signOutUser} = useAuth()

  return (
    <div className='h-screen w-screen flex flex-col overflow-x-hidden'>
      <TopRowComponent />
      <div className='flex-1 flex flex-row'>
        <SidebarComponent />
        <div onClick={() => {signOutUser()}}>
          <button>Logout</button>
        </div>
      </div>
    </div>
    // <div>
    //   <div onClick={() => {signOutUser()}}>
    //     <button>Logout</button>
    //   </div>
    // </div>
  )
}

export default HomeScreen
