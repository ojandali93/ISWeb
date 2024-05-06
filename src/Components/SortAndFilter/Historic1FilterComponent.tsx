import React, { useState } from 'react'
import SearchComponent from '../Inputs/SearchComponent'
import { useHistoric } from '../../Context/HistoricContext'
import { useData } from '../../Context/DataContext'
import ButtonComponent from '../Inputs/ButtonComponent'
import { useLocation, useNavigate } from 'react-router-dom'
import { useNavigation } from '../../Context/NavigationContext'


const Historic1FilterComponent = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const {currentSidebarTab, handleUpdateCurrentSidebarTab} = useNavigation()

  const goBack = () => {
    handleUpdateCurrentSidebarTab('HistoricPrefix', location.pathname)
    navigate(-1);
  };

  return (
    <div className="h-14 px-2 w-full flex flex-col justify-center bg-stone-700 rounded-md mb-4">
      <ButtonComponent label='Back' handler={goBack}/>
    </div>
  )
}

export default Historic1FilterComponent
