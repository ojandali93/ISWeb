import React, { useEffect, useState } from 'react'
import { ChevronsDown, ChevronsUp } from 'react-feather'
import { useData } from '../../Context/DataContext'
import { useNavigation } from '../../Context/NavigationContext'

interface SortHeaderProps {
  label: string,
  columnName: string
}

const SortHeaderComponent: React.FC<SortHeaderProps> = ({label, columnName}) => {

  const {ascending, handleSortColumnChange, handleSortOrderChange, getRefreshClaimsFollowup, grabRefreshClaims} = useData()
  const {currentSidebarTab} = useNavigation()

  const onHandleChange = () => {
    handleSortOrderChange(!ascending)
    handleSortColumnChange(columnName)
  }

  useEffect(() => {
    if(currentSidebarTab === 'Claims'){
      grabRefreshClaims()
    } else {
      getRefreshClaimsFollowup()
    }
  }, [ascending])

  return (
    <div className='w-full flex flex-row justify-center ml-1.5' onClick={() => {onHandleChange()}}>
      <p className='text-lg text-white'>{label}</p>
      {
        ascending
          ? <ChevronsUp height={24} width={24} color='white'/>
          : <ChevronsDown height={24} width={24} color='white'/>
      }
    </div>
  )
}

export default SortHeaderComponent