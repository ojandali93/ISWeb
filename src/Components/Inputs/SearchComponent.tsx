import React from 'react'
import { Search, X } from 'react-feather'

interface ComponentProps {
  searchTerm: string;
  handler: (text: string) => void;
  activeSearch: boolean;
  handleActiveSearch: () => void;
  placeholder: string;
}

const SearchComponent: React.FC<ComponentProps>  = ({searchTerm, handler, activeSearch, handleActiveSearch, placeholder}) => {
  return (
    <div className='border-2 border-gray-300 rounded-md flex flex-row items-center p-2 py-2 m-2'>
      <Search size={24} color='black'/>
      <form className='flex-1 mx-1'>
        <input 
          value={searchTerm}
          onChange={(e) => {handler(e.target.value)}}
          className='text-lg px-2 pt-1 w-full' 
          placeholder={placeholder}/>
      </form>
      {
        activeSearch
          ? <X size={24} color='black'/>
          : null
      } 
    </div>
  )
}

export default SearchComponent
