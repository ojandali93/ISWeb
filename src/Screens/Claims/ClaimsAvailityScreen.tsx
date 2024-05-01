import React from 'react'
import LayoutComponent from '../BaseScreen';
import AvailityComponent from './Availity/AvailityComponent';
import ButtonComponent from '../../Components/Inputs/ButtonComponent';
import { useNavigate } from 'react-router-dom'



const ClaimsAvailityScreen = () => {
  const navigate = useNavigate()
  return (
    <LayoutComponent
      header={
      <div className='mb-3'>
      <ButtonComponent 
      label='BACK' 
      handler={() => navigate('/claims')}
       />
      </div>
      } // Render your custom header component here
      content={
      <div>
        <AvailityComponent />
      </div>} // Render your custom content component here
    />
  )
}

export default ClaimsAvailityScreen;
