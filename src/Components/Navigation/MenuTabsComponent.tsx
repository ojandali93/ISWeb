import React from 'react'

interface Option {
  label: string
}

interface MenuProps {
  options: Option[];
  selectedName: string;
  handleMenuChange: (text:string) => void;
}

const MenuTabsComponent: React.FC<MenuProps> = ({options, selectedName, handleMenuChange}) => {
  return (
    <div className='flex flex-row m-2'>
      {options.map((item) => {
        return(
          <div className='ml-2 my-2 text-lg font-semibold'>
            {
              selectedName === item.label
                ? <div className='p-2 text-sky-500 border-b-2 border-b-sky-500'>
                    <p>{item.label}</p>
                  </div>
                : <div 
                    onClick={() => {handleMenuChange(item.label)}}
                    className='p-2 hover:text-sky-500 hover:border-b-2 hover:border-b-sky-500'
                  >
                    <p>{item.label}</p>
                  </div>
            }
          </div>
        )
      })}
    </div>
  )
}

export default MenuTabsComponent
