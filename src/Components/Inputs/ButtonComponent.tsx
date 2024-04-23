import React from 'react'

interface SelectedProps {
  label: string;
  handler: () => void;
}

const ButtonComponent: React.FC<SelectedProps> = ({label, handler}) => {
  return (
    <div className='hover:cursor-pointer'>
      <div onClick={handler} style={{ display: 'inline-block' }}>
        <p className='text-center px-2 py-1 bg-sky-600 rounded-md font-bold text-white min-w-32'>{label}</p>
      </div>
    </div>
  )
}

export default ButtonComponent
