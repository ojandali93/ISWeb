import React from 'react'
import { ChevronsDown, ChevronsUp } from 'react-feather'

interface AccordianProps {
  label: string,
  display: boolean, 
  onChange: () => void
}

const DisplayAccordianHeader: React.FC<AccordianProps> = ({label, display, onChange}) => {
  return(
    <div onClick={onChange} className='w-full h-14 bg-primary founded-md flex flex-row items-center justify-between p-4 mt-2'>
      <p className='text-white font-bold text-2xl'>{label}</p>
      {
        display
          ? <ChevronsUp height={28} width={28} color='white'/>
          : <ChevronsDown height={28} width={28} color='white'/>
      }
    </div>
  )
}

export default DisplayAccordianHeader
