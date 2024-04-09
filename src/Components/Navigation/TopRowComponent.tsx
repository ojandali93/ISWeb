import React from 'react'
import { useNavigation } from '../../Context/NavigationContext'
import NavigationTabComponent from './NavigationTabComponent'

const TopRowComponent = () => {

  const {topNavigation} = useNavigation()

  return (
    <div className='w-screen h-12 bg-slate-400 flex flex-row justify-between'>
      <p className='text-white font-bold'>intellasure</p>
      <div className='flex flex-row'>
        {
          topNavigation.map((tab) => {
            return(
              <NavigationTabComponent tab={tab.label} icon={tab.icon}/>
            )
          })
        }
      </div>
    </div>
  )
}

export default TopRowComponent