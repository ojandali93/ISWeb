import React, { useState } from 'react'
import PaginationComponent from '../Pagination/PaginationComponent'
import ButtonComponent from '../Inputs/ButtonComponent'
import IntakeForm from '../Forms/IntakeForm'

const IntakeFilterComponent = () => {

  const [currentPage, setCurrentPage] = useState(1)
  const [pageCount, setPageCount] =useState(30)

  const [addRecord, setAddRecord] = useState<boolean>(false)

  const handlePageChange = (page: number) => {
    console.log(page)
    setCurrentPage(page);
  };

  const handleAddRecord = () => {
    setAddRecord(!addRecord)
  }

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
          <div className='absolute top-16 left-0 bg-stone-700 p-3 min-w-96 rounded-lg'>
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
