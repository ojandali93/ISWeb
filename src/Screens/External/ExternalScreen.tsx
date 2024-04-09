import React from 'react'
import TopRowComponent from '../../Components/Navigation/TopRowComponent'
import { Sidebar } from 'react-feather'
import SidebarComponent from '../../Components/Navigation/SidebarComponent'

const ExternalScreen = () => {
  return (
    <div className='h-screen w-screen flex flex-col'>
      <TopRowComponent />
      <div className='flex-1 flex flex-row'>
        <SidebarComponent />
        <div className='flex-1 bg-white ml-2 rounded-tl-md'>
          <p>External</p>
        </div>
      </div>
    </div>
  )
}

export default ExternalScreen
