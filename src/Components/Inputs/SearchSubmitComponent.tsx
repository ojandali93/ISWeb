import React from 'react'
import { Search, X } from 'react-feather'

interface ComponentProps {
  searchTerm: string;
  handler: (text: string) => void;
  placeholder: string;
  activeSearch: boolean;
  handleSearchToggle: () => void;
  submitSearch: (name: string) => void;
  clearSearch: () => void;
}

const SearchSubmitComponent: React.FC<ComponentProps>  = ({searchTerm, handler, placeholder, submitSearch, activeSearch, handleSearchToggle, clearSearch}) => {

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitSearch(searchTerm.toUpperCase())
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
          ? <X onClick={clearSearch} height={24} width={24} color='white'/>
          : null
      }
    </div>
  )
}

export default SearchSubmitComponent
