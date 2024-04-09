import React from 'react'
import TopRowComponent from '../../Components/Navigation/TopRowComponent'
import SidebarComponent from '../../Components/Navigation/SidebarComponent'

const ClaimsScreen = () => {
  return (
    <div className='h-screen w-screen flex flex-col'>
      <TopRowComponent />
      <div className='flex-1 flex flex-row'>
        <SidebarComponent />
        <div className='flex-1 bg-white ml-2 rounded-tl-md'>
          <p>Claims</p>
        </div>
      </div>
    </div>
  )
}

export default ClaimsScreen
