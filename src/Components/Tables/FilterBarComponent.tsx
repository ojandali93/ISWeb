import React, { useState } from 'react'
import SingleClickTabComponent from '../Navigation/SingleClickTabComponent'

const tabs = [
  {
    label: 'Collab Md.',
    value: 'collab'
  },
  {
    label: 'Avea',
    value: 'avea'
  }
]

const FilterBarComponent = () => {

  const [selected, setSelected] = useState<string>('collab')

  const handleUpdateTab = (text: string) => {
    setSelected(text)
  }

  return (
    <div className="h-14 w-full bg-slate-600 flex flex-row items-center">
      <SingleClickTabComponent handleFunction={handleUpdateTab}  selected={selected} tabs={tabs}/>
    </div>
  )
}

export default FilterBarComponent
