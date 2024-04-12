import React, { useState } from 'react'
import { useAuth } from '../../Context/AuthContext'
import LayoutComponent from '../BaseScreen'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import PaginationComponent from '../../Components/Pagination/PaginationComponent';

const HomeScreen = () => {

  const [currentPage, setCurrentPage] = useState(1)
  const [pageCount, setPageCount] =useState(30)

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    console.log(page)
    setCurrentPage(page);
  };

  return (
    <LayoutComponent>
      <PaginationComponent handlePageChange={handlePageChange} currentPage={currentPage} pageCount={pageCount}/>
    </LayoutComponent>
  )
}

export default HomeScreen