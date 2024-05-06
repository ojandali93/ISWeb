import React, { useEffect, useState } from 'react'
import { Route, useParams } from 'react-router-dom';
import LayoutComponent from '../BaseScreen'
import HistoricFilterComponent from '../../Components/SortAndFilter/HistoricFilterComponent'
import TableComponent from '../../Components/Tables/TableComponent'
import { useData } from '../../Context/DataContext'
import { useHistoric } from '../../Context/HistoricContext';
import { historic2Options } from '../../Options/Historic2Options';
import UserInfo from '../../Components/Forms/UserInfo';
import { Historic1CareOptions } from '../../Options/Historic1CareOptions';
import { Historic1FinancialOptions } from '../../Options/Historic1FinancialCOptions';
import Historic1FilterComponent from '../../Components/SortAndFilter/Historic1FilterComponent';

const Historic1Screen = () => {
  const {selectedUserInfo, selectedUserCare, selectedUserFinancial} = useHistoric()
  const {allUsers} = useData()

  return (
      <LayoutComponent 
        header={
          <Historic1FilterComponent />
        } 
        content={
          <div className='h-full w-full max-h-full max-w-full'>
            <UserInfo
              name={selectedUserInfo ? selectedUserInfo?.name : ''}
              policy={selectedUserInfo ? selectedUserInfo?.policy : ''}
              prefix={selectedUserInfo ? selectedUserInfo?.prefix : ''}
              insurance={selectedUserInfo ? selectedUserInfo?.insurance : ''}
              dob={selectedUserInfo ? selectedUserInfo?.dob : ''}
              facility={selectedUserInfo ? selectedUserInfo?.facility : ''}
            />
            <div className='my-4'>
              <TableComponent  table='HistoricUserCare' users={allUsers} columns={Historic1CareOptions} records={selectedUserCare}/>
            </div>
            <TableComponent  table='HistoricUserCare' users={allUsers} columns={Historic1FinancialOptions} records={selectedUserFinancial}/>
          </div>
        }
      />
  )
}

export default Historic1Screen