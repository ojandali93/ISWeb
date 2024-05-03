import React from 'react'
import { useNavigation } from '../../Context/NavigationContext'
import NavigationTabComponent from './NavigationTabComponent'
import Logo from '../../Assets/intellasure-logoqas.png'
import Logo2 from '../../Assets/new-logo.png'

const TopRowComponent = () => {

  const {topNavigation} = useNavigation()

  return (
    <div className='w-screen h-20 py-2 flex flex-row justify-between items-center bg-stone-900'>
      <div className='flex flex-row items-center'>
        <img className='h-8 ml-2' src={Logo2}/>
      </div>
      <div className='flex flex-row mr-2'>
        {
          topNavigation.map((tab) => {
            return(
              <NavigationTabComponent type={tab.page} tab={tab.label} icon={tab.icon} route={tab.route} position={'top'}/>
            )
          })
        }
      </div>
    </div>
  )
}

export default TopRowComponent