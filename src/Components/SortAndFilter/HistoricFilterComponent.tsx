import React, { useState } from 'react'
import SearchComponent from '../Inputs/SearchComponent'
import { useHistoric } from '../../Context/HistoricContext'
import { useData } from '../../Context/DataContext'

const HistoricFilterComponent = () => {

  const {searchHistoricRecords} = useData()

  const [searchTerm, setSearchTerm] = useState<string>('')
  const [activeSearch, setActiveSearch] = useState<boolean>(false)

  const handleSearchChange = (text: string) => {
    console.log('searched text: ', text)
    setSearchTerm(text)
    searchHistoricRecords(text)
  }

  const handleActiveSearchChange = () => {
    setActiveSearch(!activeSearch)
  }

  return (
    <div className="h-14 px-2 w-full flex flex-col justify-center bg-stone-700 rounded-md mb-4">
      <div className='w-full flex flex-row items-center justify-start'>
        <SearchComponent searchTerm={searchTerm} handler={handleSearchChange}
          activeSearch={activeSearch} handleActiveSearch={handleActiveSearchChange}
          placeholder='Search Name...'
        />
      </div>
    </div>
  )
}

export default HistoricFilterComponent
