import React from 'react';
import Pagination from '@mui/material/Pagination';

interface PaginationComponentProps {
  handlePageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
  currentPage: number;
  pageCount: number
}

const PaginationComponent: React.FC<PaginationComponentProps> = ({ handlePageChange, currentPage, pageCount }) => {

  return (
    <Pagination
      count={pageCount}
      page={currentPage}
      onChange={handlePageChange}
      variant="outlined"
      shape="rounded"
      sx={{ '& .MuiPaginationItem-textPrimary': { fontSize: '1.2rem' } }} // Customize text size
    />
  );
};

export default PaginationComponent;