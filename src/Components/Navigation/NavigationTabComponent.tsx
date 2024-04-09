import React from 'react'
import {Home} from 'react-feather'

interface NavigationTabProps {
  tab: string;
  icon: string;
}

const NavigationTabComponent: React.FC<NavigationTabProps> = (props) => {
  const {tab, icon} = props
  const IconComponent = getIconComponent(icon);

  return (
    <div className='w-full h-10 flex flex-row items-center'>
      {IconComponent && <IconComponent size={20} color='black' className='ml-2 mr-2' />}
      <h1 className='text-base font-semibold text-black'>{tab}</h1>
    </div>
  )
}

const getIconComponent = (icon: string) => {
  try {
    return require(`react-feather/dist/icons/${icon}`).default;
  } catch (error) {
    return null;
  }
};

export default NavigationTabComponent
