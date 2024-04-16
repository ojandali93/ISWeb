import React from 'react'
import TopRowComponent from '../../Components/Navigation/TopRowComponent'
import SidebarComponent from '../../Components/Navigation/SidebarComponent'
import LayoutComponent from '../BaseScreen'

const ClaimsScreen = () => {
  return (
    <LayoutComponent sticky={null} children={<p>Claims</p>} />
  )
}

export default ClaimsScreen
