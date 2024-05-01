import React from 'react'
import LayoutComponent from '../BaseScreen'
import SupportForm from '../../Components/Forms/SupportForm'

const SupportScreen = () => {
  return (
    <LayoutComponent
      header={null} // Render your custom header component here
      content={
      <div className='h-full w-full max-h-full max-w-full'>
        <SupportForm />
      </div>
      } 
    />
  )
}

export default SupportScreen
