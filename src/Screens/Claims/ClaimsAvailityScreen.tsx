import React from 'react'
import LayoutComponent from '../BaseScreen';
import AvailityComponent from './Availity/AvailityComponent';


const ClaimsAvailityScreen = () => {
  return (
    <LayoutComponent
      header={null} // Render your custom header component here
      content={
      <div>
        <AvailityComponent />
      </div>} // Render your custom content component here
    />
  )
}

export default ClaimsAvailityScreen;
