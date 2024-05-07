import React, { useContext, useEffect, useState } from 'react'
import { useAuth } from '../../Context/AuthContext'
import LayoutComponent from '../BaseScreen'
import IntakeHome from './IntakeHome';
import FilterBarComponent from '../../Components/SortAndFilter/FilterBarComponent';
import IntakeFilterComponent from '../../Components/SortAndFilter/IntakeFilterComponent';
import Historic2FilterComponent from '../../Components/SortAndFilter/Historic2FilterComponent';
import { useIntake } from '../../Context/IntakeContext'; 
import ButtonComponent from '../../Components/Inputs/ButtonComponent';
import TableComponent from '../../Components/Tables/TableComponent';
import { historic2Options } from '../../Options/Historic2Options';
import { useData } from '../../Context/DataContext';

const HomeScreen = () => {

  const {currentProfile} = useAuth()
  const {allUsers} = useData()
  const {showPrefix, hidePrefixPopup, prefixDataDashboard} = useIntake()

  const showIntakeTable = () => {
    return(
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

  const showPopup = () => {
    if (prefixDataDashboard)
    return(
      <LayoutComponent
        header={
          <div className="h-14 px-2 w-full flex flex-col justify-center bg-stone-700 rounded-md mb-4">
          <ButtonComponent label='Back' handler={hidePrefixPopup}/>
        </div>
        }
        content={
          <div className='h-full w-full max-h-full max-w-full'>
            {prefixDataDashboard && prefixDataDashboard.length > 0 ? (
              <TableComponent table='HistoricPrefix' columns={historic2Options} records={prefixDataDashboard} users={allUsers}/>
            ) : (
            <div className='flex justify-center align-center h-full w-full p-8'>
              <p className='flex text-white text-center'>No records available for this prefix!</p>
            </div>
          )}
</div>
        }
      />
    )
  }
  
  return (
    <>
      {
        showPrefix
          ? showPopup()
          : showIntakeTable()
      }
    </>
  )
}

export default HomeScreen