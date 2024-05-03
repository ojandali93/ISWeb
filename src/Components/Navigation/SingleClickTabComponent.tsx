import React, { useState } from 'react'
import { useNavigation } from '../../Context/NavigationContext';

interface SingleTabData {
  label: string;
  value: string;
}

interface SingleClickTabs {
  tabs: SingleTabData[];
  selected: string;
  handleFunction: (text: string) => void
}

const SingleClickTabComponent: React.FC<SingleClickTabs> = ({ tabs, selected, handleFunction }) => {

  return (
    <div className='flex flex-row h-full'>
      {
        tabs.map((singleTab) => {
          return(
            <div 
              onClick={() => {
                if(singleTab.value != selected){
                  handleFunction(singleTab.value)
                }
              }}
              className={`${singleTab.value === selected ? 'bg-primary' : 'bg-secondary'} hover:cursor-pointer h-full flex flex-col justify-center items-center min-w-24 rounded-tl-xl rounded-tr-xl`}
            >
              <p className='text-white text-lg px-8'>{singleTab.label}</p>
            </div>
          )
        })
      }
    </div>
  )
}

export default SingleClickTabComponent
