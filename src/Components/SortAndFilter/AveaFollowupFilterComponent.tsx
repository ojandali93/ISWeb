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
import { useFollowup } from '../../Context/FollowupContext'

const AveaFollowupFilterComponent = () => {

  const {selectedFollowup, updateFollowupTab, 
    followupTab, submuttingData, submitBatchToCollab,
  } = useFollowup()
  const {getRefreshAveaFollowup} = useData()

  const [facility, setFacility] = useState<string>('ALL')
  const [status, setStatus] = useState<string>('ALL')

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

  const handleFacilityChange = (data: string) => {
    setFacility(data)
    getRefreshAveaFollowup(data, status)
  }

  const handleStatusChange = (data: string) => {
    setStatus(data)
    getRefreshAveaFollowup(facility, data)
  }

  return (
    <div className="h-12 px-2 w-full flex flex-col justify-center bg-stone-700 rounded-md mb-4">
      <div className='w-full flex flex-row items-center justify-between'>
        <div>
          {
            selectedFollowup.length > 0
              ? <ButtonComponent label={submuttingData ? 'Submitting' : 'Submit To Collab'} handler={submitBatchToCollab}/>
              : null
          }
        </div>

        <div className='flex flex-row items-center'>
          <div className='w-full flex flex-row items-center justify-end mr-4'>
            <div className='flex flex-row items-center'>
              <p className='mx-2 ml-6  min-w-16 max-w-24 text-white font-bold'>Facility: </p>
              <SelectInputComponent placeholder='All' options={facilityOptions} selectedValue={facility} handleOptionClick={handleFacilityChange}/>
            </div>
            <div className='flex flex-row items-center'>
              <p className='mx-2 ml-6 min-w-16 max-w-24 text-white font-bold'>Status: </p>
              <SelectInputComponent placeholder='All' options={statusOptions} selectedValue={status} handleOptionClick={handleStatusChange}/>
            </div>
          </div>
          <div className='bg-stone-500 flex flex-row rounded-lg hover:cursor-pointer'>
            <div onClick={() => {updateFollowupTab('PENDING')}} className={`${followupTab === 'PENDING' ? 'bg-primary p-2 py-1 text-sm rounded-lg font-bold' : 'bg-stone-500  p-2 py-1 text-sm rounded-lg font-bold' } text-white`}>
              <p>PENDING</p>
            </div>
            <div onClick={() => {updateFollowupTab('SUCCESSFULL')}} className={`${followupTab === 'SUCCESSFULL' ? 'bg-primary p-2 py-1 text-sm rounded-lg font-bold' : 'bg-stone-500  p-2 py-1 text-sm rounded-lg font-bold' } text-white`}>
              <p>SUCCESSFULL</p>
            </div>
            <div onClick={() => {updateFollowupTab('FAILED')}} className={`${followupTab === 'FAILED' ? 'bg-primary p-2 py-1 text-sm rounded-lg font-bold' : 'bg-stone-500  p-2 py-1 text-sm rounded-lg font-bold' } text-white`}>
              <p>FAILED</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AveaFollowupFilterComponent
