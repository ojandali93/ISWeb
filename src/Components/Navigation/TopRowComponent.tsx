import React from 'react'
import { useNavigation } from '../../Context/NavigationContext'
import NavigationTabComponent from './NavigationTabComponent'
import Logo from '../../Assets/intellasure-logoqas.png'

const TopRowComponent = () => {

  const {topNavigation} = useNavigation()

  return (
    <div className='w-screen h-14 flex flex-row justify-between items-center'>
      <div className='flex flex-row items-center'>
        <img className='h-8 ml-2' src={Logo}/>
        <p className='text-black font-bold ml-2 text-3xl'>Intellasure</p>
      </div>
      <div className='flex flex-row mr-2'>
        {
          topNavigation.map((tab) => {
            return(
              <NavigationTabComponent tab={tab.label} icon={tab.icon} route={tab.route} position={'top'}/>
            )
          })
        }
      </div>
    </div>
  )
}

export default TopRowComponent