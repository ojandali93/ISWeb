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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className='rounded-md flex flex-row items-center m-2 w-full'>
      <Search size={24} color='white'/>
      <form className='flex-1 mx-1' onSubmit={handleSubmit}>
        <input 
          value={searchTerm}
          onChange={(e) => {handler(e.target.value)}}
          className='text-md px-2 pt-1 w-full rounded-md' 
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
