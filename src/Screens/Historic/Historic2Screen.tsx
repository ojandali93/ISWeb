import React, { useEffect, useState } from 'react'
import { Route, useParams } from 'react-router-dom';
import LayoutComponent from '../BaseScreen'
import HistoricFilterComponent from '../../Components/SortAndFilter/HistoricFilterComponent'
import TableComponent from '../../Components/Tables/TableComponent'
import { useData } from '../../Context/DataContext'
import { useHistoric } from '../../Context/HistoricContext';
import { historic2Options } from '../../Options/Historic2Options';
import Historic2FilterComponent from '../../Components/SortAndFilter/Historic2FilterComponent';

const Historic2Screen = () => {
  const { prefix_id, network } = useParams();

  const {prefixRecords} = useHistoric()
  const {allUsers} = useData()

  useEffect(() => {
    console.log('prefix records length: ', prefixRecords)
  }, [prefixRecords])

  return (
      <LayoutComponent 
        header={
          <Historic2FilterComponent />
        } 
        content={
          <div className='h-full w-full max-h-full max-w-ful'>
            <TableComponent table='HistoricPrefix' users={allUsers} columns={historic2Options} records={prefixRecords}/>
          </div>
        }
      />
  )
}

export default Historic2Screen