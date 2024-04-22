import React, { useState } from 'react'
import PaginationComponent from '../Pagination/PaginationComponent'
import ButtonComponent from '../Inputs/ButtonComponent'
import IntakeForm from '../Forms/IntakeForm'
import { useData } from '../../Context/DataContext'

const IntakeFilterComponent = () => {

  const {addRecord, handleAddRecord} = useData()

  const [currentPage, setCurrentPage] = useState(1)
  const [pageCount, setPageCount] =useState(30)

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="h-14 px-2 w-full flex flex-col justify-center bg-stone-700 rounded-md mb-4">
      <div className='w-full flex flex-row items-center justify-between'>
        <ButtonComponent label='Add Record' handler={handleAddRecord}/>
        <div>
          <PaginationComponent currentPage={currentPage} pageCount={pageCount} handlePageChange={handlePageChange}/>
        </div>
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
