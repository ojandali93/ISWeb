import React, { useState } from 'react'
import SearchComponent from '../Inputs/SearchComponent'
import { useHistoric } from '../../Context/HistoricContext'
import { useData } from '../../Context/DataContext'
import SelectOptionComponent from '../Tables/SelectOptionComponent'

const BillingDetailsFilterComponent = () => {

  const {billingAnalyticsTimespand, filterBillingAnalytics} = useData()
  const billingAnalyticsOptions = ['1 Week', '1 Month', '3 Months', '6 Months']

  return (
    <div className="h-14 px-2 w-full flex flex-col justify-center bg-stone-700 rounded-md mb-4">
      <div className='w-full flex flex-row items-center justify-start'>
        <SelectOptionComponent value={billingAnalyticsTimespand} onChange={filterBillingAnalytics} options={billingAnalyticsOptions}/>
      </div>
    </div>
  )
}

export default BillingDetailsFilterComponent
