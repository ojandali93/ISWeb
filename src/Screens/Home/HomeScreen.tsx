import React, { useEffect, useState } from 'react'
import { useAuth } from '../../Context/AuthContext'
import LayoutComponent from '../BaseScreen'
import PaginationComponent from '../../Components/Pagination/PaginationComponent';
import SelectComponent from '../../Components/Inputs/SelectComponent';
import ButtonComponent from '../../Components/Inputs/ButtonComponent';
import SearchComponent from '../../Components/Inputs/SearchComponent';
import CalendarSelectComponent from '../../Components/Inputs/CalendarSelectComponent';
import MenuTabsComponent from '../../Components/Navigation/MenuTabsComponent';
import SidebarSubMenuComponent from '../../Components/Navigation/SidebarSubMenuComponent';
import SelectInTableComponent from '../../Components/Inputs/SelectInTableComponent';
import { useData } from '../../Context/DataContext';
import IntakeHome from './IntakeHome';

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

  const showIntakeHome = () => {
    return(
      <div className='h-42 w-42 bg-zinc-200'>
        <IntakeHome />
      </div>
    )
  }

  return (
    <LayoutComponent
      header={
        currentProfile.department === 'dev' ? (
          <div className='h-12 w-full bg-red-200'>
            <p>hello</p>
          </div>
        ) : (
          null
        )
      }
      content={
        currentProfile.department === 'dev' ? (
          <div className='h-full w-full'>
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