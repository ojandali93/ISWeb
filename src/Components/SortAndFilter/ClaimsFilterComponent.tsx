import React, { useEffect, useState } from 'react'
import SearchComponent from '../Inputs/SearchComponent'
import { useClaims } from '../../Context/ClaimsContext'
import ButtonComponent from '../Inputs/ButtonComponent'
import CalendarSelectComponent from '../Inputs/CalendarSelectComponent'
import SelectComponent from '../Inputs/SelectComponent'
import PercentOptionComponent from '../Inputs/PercentOptionComponent'
import SelectInputComponent from '../Inputs/SelectInputComponent'
import { useData } from '../../Context/DataContext'
import { start } from 'repl'
import { faC } from '@fortawesome/free-solid-svg-icons'
import PaginationComponent from '../Pagination/PaginationComponent'
import { useLocation, useNavigate } from 'react-router-dom'
import { Search } from 'react-feather'
import SearchSubmitComponent from '../Inputs/SearchSubmitComponent'
import { useNavigation } from '../../Context/NavigationContext'

const ClaimsFilterComponent = () => {

  const navigate = useNavigate()
  const location = useLocation()

  const {selectedClaims, addBatchToFavorites, pushingToFollowup} = useClaims()
  const { claimsSearch, handleClaimsSearchChange, 
    activeClaimSearch, handleAcriveClaimSearchChange,
    grabRefreshClaims, page, startDate, endDate, minPercent, 
    maxPercent, facility, status, handlePageChange,
    handleStartDate,handleEndDate,handleMinPercent,handleMaxPercent,
    handleFacilityChange, handleStatusChange
  } = useData()

  const percentOptions = [];
  const facilityOptions = ['All', 'Affinity', 'Beachside', 'Axis']
  const statusOptions = [
                          'ALL',
                          'CLAIM AT INSURANCE', 
                          'SEND TO INSURANCE VIA CLEARINGHOUSE',
                          'PENDING INSURANCE AUTH',
                          'REJECTED AT INSURANCE',
                          'WRITEOFF',
                          'BALANCE DUE PATIENT',
                          'DENIED AT INSURANCE',
                          'PAID'
                        ]

  for (let i = 0; i <= 100; i++) {
    percentOptions.push(i);
  }

  useEffect(() => {
    grabRefreshClaims()
  }, [startDate, endDate, minPercent, maxPercent, page, facility, status])

  return (
    <div className="h-full px-2 w-full flex flex-col justify-between bg-stone-700 rounded-md mb-4">
      <div className='w-full flex flex-row items-center justify-between mt-1'>
        <div className=''>
          <PaginationComponent pageCount={50} currentPage={page} handlePageChange={handlePageChange}/>
        </div>
        <div className='flex-1 mr-2'>
          <SearchComponent searchTerm={claimsSearch} handler={handleClaimsSearchChange}
          placeholder='Search name...' activeSearch={activeClaimSearch} handleActiveSearch={handleAcriveClaimSearchChange}/>
        </div>
        <div className='flex flex-row items-center justify-end'>
          <div className='flex flex-row items-center'>
            <p className='mx-2 min-w-16 max-w-24 text-white font-bold'>Date Range: </p>
            <CalendarSelectComponent selectedDate={startDate} handleDateChange={handleStartDate}/>
            <p className='mx-2 text-white font-bold'> - </p>
            <CalendarSelectComponent selectedDate={endDate} handleDateChange={handleEndDate}/>
          </div>
          <div className='flex flex-row items-center'>
            <p className='mx-2 ml-6  min-w-16 max-w-24 text-white font-bold'>Payout: </p>
            <PercentOptionComponent placeholder='0' options={percentOptions} selectedValue={minPercent} handleOptionClick={handleMinPercent}/>
            <p className='mx-2 text-white font-bold'> - </p>
            <PercentOptionComponent placeholder='0' options={percentOptions} selectedValue={maxPercent} handleOptionClick={handleMaxPercent}/>
          </div>
        </div>
      </div>
      <div className='w-full flex flex-row items-center justify-between  mb-1'>
        <div>
          {
            selectedClaims.length > 0
              ? <ButtonComponent label={pushingToFollowup ? 'Submitting' : 'Reprocess'} handler={() => {addBatchToFavorites(navigate, location)}}/>
              : null
          }
        </div>
        <div className='w-full flex flex-row items-center justify-end'>
          <div className='flex flex-row items-center'>
            <p className='mx-2 ml-6  min-w-16 max-w-24 text-white font-bold'>Facility: </p>
            <SelectInputComponent placeholder='All' options={facilityOptions} selectedValue={facility} handleOptionClick={handleFacilityChange}/>
          </div>
          <div className='flex flex-row items-center'>
            <p className='mx-2 ml-6 min-w-16 max-w-24 text-white font-bold'>Status: </p>
            <SelectInputComponent placeholder='All' options={statusOptions} selectedValue={status} handleOptionClick={handleStatusChange}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClaimsFilterComponent
