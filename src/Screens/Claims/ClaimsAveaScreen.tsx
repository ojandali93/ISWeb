import React from 'react'
import LayoutComponent from '../BaseScreen'
import ClaimsFilterComponent from '../../Components/SortAndFilter/ClaimsFilterComponent'

const ClaimsAveaScreen = () => {
  return (
    <LayoutComponent
      header={
        <div className='h-12 w-full mb-2'>
          <ClaimsFilterComponent />
        </div>
      } 
      content={<div>accounts</div>} 
    />
  )
}

export default ClaimsAveaScreen
