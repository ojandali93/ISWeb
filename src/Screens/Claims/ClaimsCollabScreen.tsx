import React from 'react'
import LayoutComponent from '../BaseScreen'
import ClaimsFilterComponent from '../../Components/SortAndFilter/ClaimsFilterComponent'
import TableComponent from '../../Components/Tables/TableComponent'
import { useData } from '../../Context/DataContext'
import { ClaimOptions } from '../../Options/ClaimOptions'

const ClaimsCollabScreen = () => {

  const {claimsRecords, allUsers} = useData()

  return (
    <LayoutComponent 
      header={
        <div className='h-20 w-full mb-2'>
          <ClaimsFilterComponent />
        </div>
      } 
      content={
        <div className='h-full w-full max-h-full max-w-full'>
          <TableComponent table={'Claims'} users={allUsers} columns={ClaimOptions} records={claimsRecords}/>
        </div>
      }
    />
  )
}

export default ClaimsCollabScreen
