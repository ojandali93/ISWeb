import React, { useState } from 'react'
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

const AveaClaimsFilterComponent = () => {

    const {selectedClaimsAvea, addBatchToAveaFavorites, pushingToFollowup} = useClaims()
    const { grabRefreshAveaClaims, SearchAveaClaims } = useData()

    const [page, setPage] = useState<number>(1)

    const [startDate, setStartDate] = useState<Date>(new Date(Date.UTC(2018, 1, 1)))
    const [endtDate, setEndDate] = useState<Date>(new Date())

    const [minPercent, setMinPercent] = useState<number>(0)
    const [maxPercent, setMaxPercent] = useState<number>(100)

    const [facility, setFacility] = useState<string>('All')
    const [status, setStatus] = useState<string>('All')

    const [searchTerm, setSearchTerm] = useState<string>('')
    const [activeSearch, setActiveSearch] = useState<boolean>(false)

    const percentOptions = [];
    const facilityOptions = ['ALL', 'Affinity', 'Beachside', 'Axis']
    const statusOptions = [
        'ALL',
        'Closed - Paid To Member',
        'Payer - Medical Records Requested',
        'Billing - Resubmit Needed',
        'Closed - Write-off - Medical Necessity',
        'Appeal - Sent - Pending Payer Response',
        'Practice - Incomplete Medical Records',
        'Payer - Original Claim Processing',
        'Approved - Paper Check',

        'Closed - Write Off - Non Covered Benefit',
        'Payer - Re-submitted - Waiting on Determination',
        'Payer - Denied - Pending Investigation',
        'Closed - Paid - Applied to deductible',
        'Closed - Paid',
        'Patient - COB Required',
        'Closed - Paid Partially - Medical Necessity',

        'Payer - Medical Records Sent - Receipt Not Confirmed',
        'Approved - Pending ACH Payment',
        'Payer - Reprocessing',
        'Closed - Write-off - Policy Terminated',
        'Closed - Write-off Timely Filing',
        'Closed - Write-off - Duplicated Claim',

        'Appeal - Denied',
        'Payer - Medical Records Sent - In Review',
        'Payer - Pending Repricing'
    ]

    for (let i = 0; i <= 100; i++) {
        percentOptions.push(i);
    }

    const handlePageChange = (page: number) => {
        setPage(page)
        grabRefreshAveaClaims(startDate, endtDate, minPercent, maxPercent, page, facility, status)
    }

    const handleStartDate = (date: Date) => {
        setStartDate(date)
        grabRefreshAveaClaims(date, endtDate, minPercent, maxPercent, page, facility, status)
    }

    const handleEndDate = (date: Date) => {
        setEndDate(date)
        grabRefreshAveaClaims(startDate, date, minPercent, maxPercent, page, facility, status)
    }

    const handleMinPercent = (data: string) => {
        setMinPercent(parseInt(data))
        grabRefreshAveaClaims(startDate, endtDate, parseInt(data), maxPercent, page, facility, status)
    }

    const handleMaxPercent = (data: string) => {
        setMaxPercent(parseInt(data))
        grabRefreshAveaClaims(startDate, endtDate, minPercent, parseInt(data), page, facility, status)
    }

    const handleFacilityChange = (data: string) => {
        setFacility(data)
        grabRefreshAveaClaims(startDate, endtDate, minPercent, maxPercent, page, data, status)
    }

    const handleStatusChange = (data: string) => {
        setStatus(data)
        grabRefreshAveaClaims(startDate, endtDate, minPercent, maxPercent, page, facility, data)
    }

    const toggleActiveSearch = () => {
      setActiveSearch(!activeSearch)
    }
  
    const updateSearchTerm = (text: string) => {
      setSearchTerm(text)
      SearchAveaClaims(text)
    }

    return (
      <div className="h-full px-2 w-full flex flex-col justify-between bg-stone-700 rounded-md mb-4">        
        <div className='w-full flex flex-row items-center justify-between mt-1'>
          <div className=''>
            <PaginationComponent pageCount={50} currentPage={page} handlePageChange={handlePageChange}/>
          </div>
          <div className='flex-1 mr-2'>
            <SearchComponent searchTerm={searchTerm} handler={updateSearchTerm} placeholder='Search policy...' activeSearch={activeSearch} handleActiveSearch={toggleActiveSearch}/>
          </div>
          <div className='flex flex-row items-center justify-end'>
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
          </div>
        </div>
        <div className='w-full flex flex-row items-center justify-between  mb-1'>
          <div>
            {
              selectedClaimsAvea.length > 0
                ? <ButtonComponent label={pushingToFollowup ? 'Submitting' : 'Reprocess'} handler={addBatchToAveaFavorites}/>
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

export default AveaClaimsFilterComponent;
