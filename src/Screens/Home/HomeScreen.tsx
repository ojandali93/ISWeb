import React, { useEffect, useState } from 'react'
import { useAuth } from '../../Context/AuthContext'
import LayoutComponent from '../BaseScreen'
import IntakeHome from './IntakeHome';
import FilterBarComponent from '../../Components/SortAndFilter/FilterBarComponent';
import IntakeFilterComponent from '../../Components/SortAndFilter/IntakeFilterComponent';

const options = [
  {
    value: 'Omar',
    label: 'Omar'
  },
  {
    value: 'RJ',
    label: 'RJ'
  },
  {
    value: 'Nasim',
    label: 'Nasim'
  },
]

const navigation = [
  {
    label: 'All'
  },
  {
    label: 'Pending'
  },
  {
    label: 'Successful'
  },
  {
    label: 'Failed'
  },
]

const sideNavigation = [
  {
    tab: 'Collab MD.',
    icon: 'folder',
    route: '/'
  },
  {
    tab: 'Avea',
    icon: 'folder',
    route: '/'
  },
]

const HomeScreen = () => {

  const {currentProfile} = useAuth()

  useEffect(() => {
    console.log(currentProfile.department)
  }, [currentProfile])

  return (
    <LayoutComponent
      header={
        currentProfile.department === 'dev' ? (
          <div className='h-14 w-full mb-2'>
            <IntakeFilterComponent />
          </div>
        ) : (
          null
        )
      }
      content={
        currentProfile.department === 'dev' ? (
          <div className='h-full w-full max-h-full max-w-full'>
            <IntakeHome />
          </div>
        ) : (
          <div className=''>
            Content for Other
            {/* Add some text or other elements here */}
          </div>
        )
      }
    />
  )
}

export default HomeScreen