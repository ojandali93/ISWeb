import React, { useState } from 'react'
import SingleClickTabComponent from '../Navigation/SingleClickTabComponent'
import PaginationComponent from '../Pagination/PaginationComponent'
import ButtonComponent from '../Inputs/ButtonComponent'
import SelectOptionComponent from '../Tables/SelectOptionComponent'

const tabs = [
  {
    label: 'Collab Md.',
    value: 'collab'
  },
  {
    label: 'Avea',
    value: 'avea'
  }
]

const FilterBarComponent = () => {

  const [selected, setSelected] = useState<string>('collab')

  const [currentPage, setCurrentPage] = useState(1)
  const [pageCount, setPageCount] =useState(30)

  const handlePageChange = (page: number) => {
    console.log(page)
    setCurrentPage(page);
  };

  const handleAddRecord = () => {
    console.log('new button pressed')
  }

  return (
    <div className="h-14 px-2 w-full flex flex-col justify-center bg-stone-700 rounded-md mb-4">
      <div className='w-full flex flex-row items-center justify-between'>
        <ButtonComponent label='Add Record' handler={handleAddRecord}/>
        <div>
          <PaginationComponent currentPage={currentPage} pageCount={pageCount} handlePageChange={handlePageChange}/>
        </div>
      </div>
    </div>
  )
}

export default FilterBarComponent
