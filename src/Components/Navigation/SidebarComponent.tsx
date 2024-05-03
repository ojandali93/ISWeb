import React, { useEffect } from 'react'
import NavigationTabComponent from './NavigationTabComponent'
import { useNavigation } from '../../Context/NavigationContext'
import SidebarSubMenuComponent from './SidebarSubMenuComponent'
import { useAuth } from '../../Context/AuthContext'

const SidebarComponent = () => {

  const { sideNavigation, currentSidebarTab } = useNavigation()
  const {currentProfile} = useAuth()

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
    <div className='h-full min-w-52 max-w-52 bg-primary' style={{height: maxHeight}}>
      {
        sideNavigation.map((tab) => {
          return(
            <>
              {
                tab.privileges.includes(currentProfile.privileges ? currentProfile.privileges : '') 
                && tab.department.includes(currentProfile.department ? currentProfile.department : '')
                  ? <NavigationTabComponent type={tab.page} tab={tab.label} icon={tab.icon} route={tab.route} position={'side'}/>
                  : null
              }
              {
                tab.subTabs === null 
                  ? null
                  : <div>
                      {
                        currentSidebarTab === tab.label
                          ? <SidebarSubMenuComponent tab={tab}/>
                          : null
                      }
                    </div>
              }
            </>
          )
        })
      }
    </div>
  )
}

export default SidebarComponent
