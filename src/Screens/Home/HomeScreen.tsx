import React, { useEffect, useState } from 'react'
import { useAuth } from '../../Context/AuthContext'
import LayoutComponent from '../BaseScreen'
import IntakeHome from './IntakeHome';
import FilterBarComponent from '../../Components/SortAndFilter/FilterBarComponent';
import IntakeFilterComponent from '../../Components/SortAndFilter/IntakeFilterComponent';

const HomeScreen = () => {

  const {currentProfile} = useAuth()
  
  return (
    <LayoutComponent
      header={
        <div className='h-14 w-full mb-2'>
          <IntakeFilterComponent />
        </div>
      }
      content={
        <div className='h-full w-full max-h-full max-w-full'>
          <IntakeHome />
        </div>
      }
    />
  )
}

export default HomeScreen