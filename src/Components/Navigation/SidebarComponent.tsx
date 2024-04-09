import React from 'react'
import NavigationTabComponent from './NavigationTabComponent'
import { useNavigation } from '../../Context/NavigationContext'

const SidebarComponent = () => {

  const { sideNavigation } = useNavigation()

  return (
    <div className='h-full w-48 bg-white pt-2 rounded-tr-md'>
      {
        sideNavigation.map((tab) => {
          return(
            <NavigationTabComponent tab={tab.label} icon={tab.icon} route={tab.route} position={'side'}/>
          )
        })
      }
    </div>
  )
}

export default SidebarComponent
