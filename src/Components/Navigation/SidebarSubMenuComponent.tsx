import React from 'react';
import NavigationTabComponent from './NavigationTabComponent';
import { useNavigation } from '../../Context/NavigationContext';
import { useLocation, useNavigate } from 'react-router-dom';

interface TabSubOptions {
  label: string;
  icon: string;
  route: string;
  page: string;
}

interface TabOptions {
  label: string;
  icon: string;
  route: string;
  page: string;
  subTabs: TabSubOptions[] | null;
}

interface NavigationTabProps {
  tab: TabOptions;
}

const SidebarSubMenuComponent: React.FC<NavigationTabProps> = ({
  tab
}) => {
  const getIconComponent = (icon: string) => {
    try {
      return require(`react-feather/dist/icons/${icon}`).default;
    } catch (error) {
      return null;
    }
  };

  const location = useLocation()

  const { currentSidebarSubTab, 
    handleUpdateCurrentSidebarTab,
    handleUpdateCurrentSidebarSubTab } = useNavigation()
  const navigate = useNavigate()

  const handleRedirectTab = (tab: TabOptions, subTab: TabSubOptions) => {
    handleUpdateCurrentSidebarTab(tab.label, location.pathname)
    handleUpdateCurrentSidebarSubTab(subTab.label)
    navigate(subTab.route)
  }

  return (
    <div className="text-white">
      {tab.subTabs?.map((singleTab) => {
        const IconComponent = getIconComponent(tab.icon);
        return (
          <div key={singleTab.label} className={`pl-4 ${
            currentSidebarSubTab === singleTab.label
              ? 'bg-stone-900'
              : 'hover:bg-primary'
          }`}>
              <div className='flex flex-row items-center' onClick={() => {handleRedirectTab(tab, singleTab)}}>
                {IconComponent && (
                  <IconComponent
                    size={18}
                    color={currentSidebarSubTab === singleTab.label ? 'white' : 'white'}
                    className="ml-2 mr-2 stroke-[3px]"
                  />
                )}
                <p
                  className={`h-10 text-black flex items-center hover:cursor-pointer ${
                    currentSidebarSubTab === singleTab.label
                      ? 'text-white'
                      : 'text-white'
                  }`}
                >
                  {singleTab.label}
                </p>
              </div>
          </div>
        );
      })}
    </div>
  );
};

export default SidebarSubMenuComponent;
