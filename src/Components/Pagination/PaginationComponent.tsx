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
        className='h-10 w-10 hover:cursor-pointer border-2 border-gray-300 hover:bg-sky-100 rounded-md flex justify-center items-center m-2'
      >
        <ChevronLeft size={20} className='text-sky-500' strokeWidth={3}/>
      </div>
      <div className='flex flex-row'>
        <div className='h-10 w-10 hover:cursor-pointer border-2 border-gray-300 rounded-md flex justify-center items-center bg-gray-200  my-2'>
          <p className='font-bold'>{currentPage}</p>
        </div> 
        <div
          onClick={() => {
            handlePageChange(currentPage + 1)
          }}
          className='h-10 w-10 hover:cursor-pointer border-2 border-gray-300 hover:bg-sky-100 rounded-md flex justify-center items-center  my-2'
        >
          <p className='font-bold'>{currentPage + 1}</p>
        </div>
        <div 
          onClick={() => {
            handlePageChange(currentPage + 2)
          }}
          className='h-10 w-10 hover:cursor-pointer border-2 border-gray-300 hover:bg-sky-100 rounded-md flex justify-center items-center  my-2'
        >
          <p className='font-bold'>{currentPage + 2}</p>
        </div>
        <div 
          onClick={() => {
            handlePageChange(currentPage + 3)
          }}
          className='h-10 w-10 hover:cursor-pointer border-2 border-gray-300 hover:bg-sky-100 rounded-md flex justify-center items-center  my-2'
        >
          <p className='font-bold'>{currentPage + 3}</p>
        </div>
        <div className='h-10 w-10 rounded-md flex justify-center items-end m-2'>
          <p className='font-bold'>...</p>
        </div>
        <div 
          onClick={() => {
            handlePageChange(pageCount)
          }}
          className='h-10 w-10 hover:cursor-pointer border-2 border-gray-300 hover:bg-sky-100 rounded-md flex justify-center items-center my-2'
        >
          <p className='font-bold'>{pageCount}</p>
        </div>
      </div>
      <div 
        onClick={() => {
          if(currentPage < pageCount){
            handlePageChange(currentPage + 1)
          }
        }}
        className='h-10 w-10 hover:cursor-pointer border-2 border-gray-300 hover:bg-sky-100 rounded-md flex justify-center items-center m-2'
      >
        <ChevronRight size={20} className='text-sky-500' strokeWidth={3}/>
      </div>
    </div>
  );
};

export default PaginationComponent;