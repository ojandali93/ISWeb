import React from 'react'

interface SelectedProps {
  label: string;
  handler: () => void;
}

const ButtonComponent: React.FC<SelectedProps> = ({label, handler}) => {
  return (
    <div>
      <div onClick={handler} style={{ display: 'inline-block' }}>
        <p className='m-2 p-2 bg-sky-500 rounded-md font-standard text-white text-lg'>{label}</p>
      </div>
    </div>
  )
}

export default ButtonComponent
