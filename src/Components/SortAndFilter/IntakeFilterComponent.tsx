import React, { useState } from 'react'
import PaginationComponent from '../Pagination/PaginationComponent'
import ButtonComponent from '../Inputs/ButtonComponent'
import IntakeForm from '../Forms/IntakeForm'
import { useData } from '../../Context/DataContext'
import SearchComponent from '../Inputs/SearchComponent'

const IntakeFilterComponent = () => {

  const {addRecord, handleAddRecord, searchIntakeRecords, getIntakeRecords} = useData()

  const [currentPage, setCurrentPage] = useState(1)
  const [pageCount, setPageCount] =useState(30)

  const [searchTerm, setSearchTerm] = useState<string>('')
  const [activeSearch, setActiveSearch] = useState<boolean>(false)

  const handleSearchChange = (text: string) => {
    setSearchTerm(text)
    if(text === ''){
      getIntakeRecords()
    } else {
      searchIntakeRecords(text)
    }
  }

  const handleActiveSearchChange = () => {
    setActiveSearch(!activeSearch)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="h-14 px-2 w-full flex flex-col justify-center bg-stone-700 rounded-md mb-4">
      <div className='w-full flex flex-row items-center justify-start'>
        <ButtonComponent label='Add Record' handler={handleAddRecord}/>
        <SearchComponent searchTerm={searchTerm} handler={handleSearchChange}
          activeSearch={activeSearch} handleActiveSearch={handleActiveSearchChange}
          placeholder='Search Name...'
        />
        {/* <div>
          <PaginationComponent currentPage={currentPage} pageCount={pageCount} handlePageChange={handlePageChange}/>
        </div> */}
      </div>
      {
        addRecord ? (
          <div className='absolute w-1/3 top-16 left-0 bg-stone-700 p-3 min-w-96 rounded-lg'>
            <IntakeForm />
          </div>
        ) : (
          null
        )
      }
    </div>
  )
}

export default IntakeFilterComponent
