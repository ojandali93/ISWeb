import React, { useState } from 'react'

const IntakeHome = () => {

  const [records, setRecords] = useState([])
  const [columns, setColumns] = useState([]);

  return (
    <div className='h-full w-full bg-zinc-200 overflow-auto'>
      <p>this is the intake home</p>
    </div>
  )
}

export default IntakeHome
