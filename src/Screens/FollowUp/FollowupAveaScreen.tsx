import React from 'react'
import LayoutComponent from '../BaseScreen'
import ClaimsFilterComponent from '../../Components/SortAndFilter/ClaimsFilterComponent'
import TableComponent from '../../Components/Tables/TableComponent'
import { useData } from '../../Context/DataContext'
import { ClaimOptions } from '../../Options/ClaimOptions'
import { FollowupOptions } from '../../Options/FollowupOptions'
import FollowupFilterComponent from '../../Components/SortAndFilter/FollowupFilterComponent'
import { useFollowup } from '../../Context/FollowupContext'

const FollowupAveaScreen = () => {

  const {followupAveaRecords, pendingAveaRecords, successfullAveaRecords, failedAveaRecords, allUsers} = useData()
  const {followupTab} = useFollowup()

  return (
    <LayoutComponent 
      header={
        <div className='h-12 w-full mb-2'>
          <FollowupFilterComponent/>
        </div>
      } 
      content={
        <div className='h-full w-full max-h-full max-w-full'>
          <TableComponent table={'Claims'} users={allUsers} columns={FollowupOptions} records={followupTab === 'ALL' ? followupAveaRecords : followupTab === 'PENDING' ? pendingAveaRecords : followupTab === 'SUCCESSFULL' ? successfullAveaRecords : failedAveaRecords }/>
        </div>
      }
    />
  )
}

export default FollowupAveaScreen
