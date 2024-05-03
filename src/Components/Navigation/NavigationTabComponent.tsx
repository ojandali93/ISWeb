import React from 'react'
import {Home} from 'react-feather'
import { useNavigate, useLocation } from 'react-router-dom';
import { useNavigation } from '../../Context/NavigationContext';

interface NavigationTabProps {
  tab: string;
  icon: string;
  route: string;
  position: string;
  type: string;
}

const NavigationTabComponent: React.FC<NavigationTabProps> = (props) => {
  const {tab, icon, route, position, type} = props
  const IconComponent = getIconComponent(icon);
  const navigate = useNavigate()
  const location = useLocation();

  const { currentSidebarTab,
     handleUpdateCurrentSidebarTab, 
     handleUpdateCurrentSidebarType } = useNavigation()

  const handleRedirect = () => {
    handleUpdateCurrentSidebarTab(tab)
    handleUpdateCurrentSidebarType(type)
    navigate(route)
  }

  return (
    <div 
      onClick={() => {handleRedirect()}} 
      className={`w-full h-10 flex flex-row items-center hover:cursor-pointer 
        ${position === 'top' ? 'hover:bg-slate-700 rounded-xl text-white' : currentSidebarTab === tab ? 'bg-stone-900 text-white' : 'hover:bg-primary text-white' }`}
    >
      {IconComponent && position === 'top' ? <IconComponent size={22} color='white' className='ml-2 mr-2 stroke-[3px]' /> : <IconComponent size={20} color={currentSidebarTab === tab ? 'white' : 'white'} className='ml-2 mr-2' />}
      <h1 className={`text-base font-semibold ${currentSidebarTab === tab ? 'text-white' : 'text-white'}`}>{tab}</h1>
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
