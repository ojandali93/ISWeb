import React from 'react'
import NavigationTabComponent from './NavigationTabComponent'
import { useNavigation } from '../../Context/NavigationContext'

const SidebarComponent = () => {

  const { sideNavigation } = useNavigation()

  return (
    <div className='h-full w-52 bg-slate-300'>
      {
        sideNavigation.map((tab) => {
          return(
            <NavigationTabComponent tab={tab.label} icon={tab.icon}/>
          )
        })
      }
    </div>
  )
}

export default SidebarComponent
