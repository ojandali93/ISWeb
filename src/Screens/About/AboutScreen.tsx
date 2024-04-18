import React from 'react'
import LayoutComponent from '../BaseScreen'

const AboutScreen = () => {
  return (
    <LayoutComponent
      header={null} // Render your custom header component here
      content={<div>about</div>} // Render your custom content component here
    />
  )
}

export default AboutScreen
