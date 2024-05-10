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

const FollowupFilterComponent = () => {

  const {selectedFollowup, updateFollowupTab, followupTab, submuttingData, submitBatchToCollab} = useFollowup()

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
        <div>
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

export default FollowupFilterComponent
