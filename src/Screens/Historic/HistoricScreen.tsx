import React, { useEffect, useState } from 'react'
import LayoutComponent from '../BaseScreen'
import HistoricFilterComponent from '../../Components/SortAndFilter/HistoricFilterComponent'
import TableComponent from '../../Components/Tables/TableComponent'
import { useData } from '../../Context/DataContext'
import { historicOptions } from '../../Options/Historic3Options'
const HistoricScreen = () => {

  const {allUsers, billingDetails} = useData()

  return (
      <LayoutComponent 
        header={
          <div className='h-14 w-full mb-2'>
            <HistoricFilterComponent />
          </div>
        } 
        content={
          <div className='h-full w-full max-h-full max-w-ful'>
            <TableComponent users={allUsers} columns={historicOptions} records={billingDetails}/>
          </div>
        }
      />
  )
}

export default HistoricScreen