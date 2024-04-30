import React, { useState } from 'react'
import SearchComponent from '../Inputs/SearchComponent'
import { useClaims } from '../../Context/ClaimsContext'
import ButtonComponent from '../Inputs/ButtonComponent'
import CalendarSelectComponent from '../Inputs/CalendarSelectComponent'
import SelectComponent from '../Inputs/SelectComponent'
import PercentOptionComponent from '../Inputs/PercentOptionComponent'
import SelectInputComponent from '../Inputs/SelectInputComponent'

const ClaimsFilterComponent = () => {

  const {selectedClaims, addBatchToFavorites} = useClaims()

  const [searchTerm, setSearchTerm] = useState<string>('')
  const [activeSearch, setActiveSearch] = useState<boolean>(false)

  const [startDate, setStartDate] = useState<Date>(new Date())
  const [endtDate, setEndDate] = useState<Date>(new Date())

  const [minPercent, setMinPercent] = useState<number>(0)
  const [maxPercent, setMaxPercent] = useState<number>(100)

  const [facility, setFacility] = useState<string>('All')
  const [status, setStatus] = useState<string>('All')

  const percentOptions = [];
  const facilityOptions = ['All', 'Affinity', 'Beachside', 'Axis']
  const statusOptions = [
                          'All',
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

  const handleStartDate = (date: Date) => {
    setStartDate(date)
  }

  const handleEndDate = (date: Date) => {
    setEndDate(date)
  }

  const handleMinPercent = (data: string) => {
    setMinPercent(parseInt(data))
  }

  const handleMaxPercent = (data: string) => {
    setMaxPercent(parseInt(data))
  }

  const handleFacilityChange = (data: string) => {
    setFacility(data)
  }

  const handleStatusChange = (data: string) => {
    setStatus(data)
  }

  return (
    <div className="h-14 px-2 w-full flex flex-col justify-center bg-stone-700 rounded-md mb-4">
      <div className='w-full flex flex-row items-center justify-between'>
        <div>
          {
            selectedClaims.length > 0
              ? <ButtonComponent label='Move To Followup' handler={addBatchToFavorites}/>
              : null
          }
        </div>
        <div className='w-full flex flex-row items-center justify-end'>
          <div className='flex flex-row items-center'>
            <p className='mx-2 min-w-16 max-w-24 text-white font-bold'>Date Range: </p>
            <CalendarSelectComponent selectedDate={startDate} handleDateChange={handleStartDate}/>
            <p className='mx-2 text-white font-bold'> - </p>
            <CalendarSelectComponent selectedDate={endtDate} handleDateChange={handleEndDate}/>
          </div>
          <div className='flex flex-row items-center'>
            <p className='mx-2 ml-6  min-w-16 max-w-24 text-white font-bold'>Payout: </p>
            <PercentOptionComponent placeholder='0' options={percentOptions} selectedValue={minPercent} handleOptionClick={handleMinPercent}/>
            <p className='mx-2 text-white font-bold'> - </p>
            <PercentOptionComponent placeholder='0' options={percentOptions} selectedValue={maxPercent} handleOptionClick={handleMaxPercent}/>
          </div>
          <div className='flex flex-row items-center'>
            <p className='mx-2 ml-6  min-w-16 max-w-24 text-white font-bold'>Facility: </p>
            <SelectInputComponent placeholder='All' options={facilityOptions} selectedValue={facility} handleOptionClick={handleFacilityChange}/>
          </div>
          <div className='flex flex-row items-center'>
            <p className='mx-2 ml-6 min-w-16 max-w-24 text-white font-bold'>Status: </p>
            <SelectInputComponent placeholder='All' options={statusOptions} selectedValue={status} handleOptionClick={handleStatusChange}/>
          </div>
          <div className='hover:cursor-pointer'>
            <div onClick={() => {}} style={{ display: 'inline-block' }}>
              <p className='text-center bg-green-600 ml-4 py-1 rounded-md font-bold text-white px-8'>Apply</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClaimsFilterComponent
