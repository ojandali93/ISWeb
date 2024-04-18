import React from 'react'
import TopRowComponent from '../../Components/Navigation/TopRowComponent'
import SidebarComponent from '../../Components/Navigation/SidebarComponent'
import LayoutComponent from '../BaseScreen'

const ClaimsScreen = () => {
  return (
    <LayoutComponent
      header={null} // Render your custom header component here
      content={<div>claims</div>} // Render your custom content component here
    />
  )
}

export default ClaimsScreen
