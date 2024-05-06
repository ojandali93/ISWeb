import React from 'react';
import Pagination from '@mui/material/Pagination';
import { ChevronLeft, ChevronRight } from 'react-feather';

interface PaginationComponentProps {
  handlePageChange: (page: number) => void;
  currentPage: number;
  pageCount: number
}

const PaginationComponent: React.FC<PaginationComponentProps> = ({ handlePageChange, currentPage, pageCount }) => {

  return (
    <div className='flex flex-row'>
      <div 
        onClick={() => {
          if(currentPage > 1){
            handlePageChange(currentPage - 1)
          }
        }}
          className='h-6 w-6 hover:cursor-pointer hover:bg-stone-700 rounded-md flex justify-center items-center bg-stone-500  my-1 mr-1'
      >
        <ChevronLeft size={20} className='text-white' strokeWidth={3}/>
      </div>
      <div className='flex flex-row'>
        <div className='h-6 w-6 min-w-6 hover:cursor-pointe rounded-md flex justify-center items-center bg-stone-300  my-1 mr-1'>
          <p className='font-bold text-black'>{currentPage}</p>
        </div> 
        <div
          onClick={() => {
            handlePageChange(currentPage + 1)
          }}
          className='h-6 w-6 min-w-6 hover:cursor-pointer hover:bg-stone-700 rounded-md flex justify-center items-center bg-stone-500 my-1 mr-1'
        >
          <p className='font-bold text-white'>{currentPage + 1}</p>
        </div>
        <div
          onClick={() => {
            handlePageChange(currentPage + 2)
          }}
          className='h-6 w-6 min-w-6 hover:cursor-pointer hover:bg-stone-700 rounded-md flex justify-center items-center bg-stone-500 my-1 mr-1'
        >
          <p className='font-bold text-white'>{currentPage + 2}</p>
        </div>
        
      </div>
      <div 
        onClick={() => {
          if(currentPage < pageCount){
            handlePageChange(currentPage + 1)
          }
        }}
        className='h-6 w-6 hover:cursor-pointer hover:bg-stone-700 rounded-md flex justify-center items-center bg-stone-500  my-1 mr-1'
        >
        <ChevronRight size={20} className='text-white' strokeWidth={3}/>
      </div>
    </div>
  );
};

export default PaginationComponent;