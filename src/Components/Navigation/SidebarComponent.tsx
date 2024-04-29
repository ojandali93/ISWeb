import React, { useEffect } from 'react'
import NavigationTabComponent from './NavigationTabComponent'
import { useNavigation } from '../../Context/NavigationContext'

const SidebarComponent = () => {

  const { sideNavigation } = useNavigation()

  const [maxHeight, setMaxHeight] = React.useState(window.innerHeight - 52);

  useEffect(() => {
    const updateDimensions = () => {
      setMaxHeight(window.innerHeight - 52);
    };
    window.addEventListener('resize', updateDimensions);
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  return (
    <div className='h-full min-w-52 max-w-52 bg-sky-800' style={{height: maxHeight}}>
      {
        sideNavigation.map((tab) => {
          return(
            <NavigationTabComponent type={tab.page} tab={tab.label} icon={tab.icon} route={tab.route} position={'side'}/>
          )
        })
      }
    </div>
  )
}

export default SidebarComponent
