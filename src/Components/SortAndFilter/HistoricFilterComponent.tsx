import React, { useState } from 'react'
import SearchComponent from '../Inputs/SearchComponent'

const HistoricFilterComponent = () => {

  const [searchTerm, setSearchTerm] = useState<string>('')
  const [activeSearch, setActiveSearch] = useState<boolean>(false)

  const handleSearchChange = (text: string) => {
    setSearchTerm(text)
    // if(text === ''){
    //   getIntakeRecords()
    // } else {
    //   searchIntakeRecords(text)
    // }
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
