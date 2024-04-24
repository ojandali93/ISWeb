import React from 'react'
import TopRowComponent from '../../Components/Navigation/TopRowComponent'
import SidebarComponent from '../../Components/Navigation/SidebarComponent'
import LayoutComponent from '../BaseScreen'
import ClaimsFilterComponent from '../../Components/SortAndFilter/ClaimsFilterComponent'
import TableComponent from '../../Components/Tables/TableComponent'
import { useData } from '../../Context/DataContext'
import { ClaimOptions } from '../../Options/ClaimOptions'

const ClaimsScreen = () => {

  const {claimsRecords, allUsers} = useData()

  return (
    <LayoutComponent 
        header={
          <div className='h-14 w-full mb-2'>
            <ClaimsFilterComponent />
          </div>
        } 
        content={
          <div className='h-full w-full max-h-full max-w-ful'>
            <TableComponent users={allUsers} columns={ClaimOptions} records={claimsRecords}/>
          </div>
        }
      />
  )
}

export default ClaimsScreen
