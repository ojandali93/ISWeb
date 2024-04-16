import React, { useEffect } from 'react'
import NavigationTabComponent from './NavigationTabComponent'
import { useNavigation } from '../../Context/NavigationContext'

const SidebarComponent = () => {

  const { sideNavigation } = useNavigation()

  const [maxHeight, setMaxHeight] = React.useState(window.innerHeight - 56);

  useEffect(() => {
    const updateDimensions = () => {
      setMaxHeight(window.innerHeight - 56);
    };
    window.addEventListener('resize', updateDimensions);
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  return (
    <div className='h-screen w-52 rounded-tr-sm bg-slate-700' style={{height: maxHeight}}>
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
