import React from 'react'
import {Home} from 'react-feather'
import { useNavigate, useLocation } from 'react-router-dom';

interface NavigationTabProps {
  tab: string;
  icon: string;
  route: string;
  position: string;
}

const NavigationTabComponent: React.FC<NavigationTabProps> = (props) => {
  const {tab, icon, route, position} = props
  const IconComponent = getIconComponent(icon);
  const navigate = useNavigate()
  const location = useLocation();

  const isActive = location.pathname === route;

  return (
    <div 
      onClick={() => {navigate(route)}} 
      className={`w-full h-10 flex flex-row items-center hover:cursor-pointer 
        ${position === 'top' ? 'hover:bg-sky-600 rounded-xl text-white' : isActive ? 'bg-slate-300 text-white' : 'hover:bg-slate-200 text-white' }`}
    >
      {IconComponent && position === 'top' ? <IconComponent size={22} color='black' className='ml-2 mr-2 stroke-[3px]' /> : <IconComponent size={20} color='black' className='ml-2 mr-2' />}
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
