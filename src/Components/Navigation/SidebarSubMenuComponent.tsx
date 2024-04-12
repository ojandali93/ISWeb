import React from 'react';
import NavigationTabComponent from './NavigationTabComponent';

interface Option {
  tab: string;
  icon: string;
  route: string;
}

interface NavigationTabProps {
  options: Option[];
  selectedSubTab: string;
  handleMenuChange: (text: string) => void;
}

const SidebarSubMenuComponent: React.FC<NavigationTabProps> = ({
  options,
  selectedSubTab,
  handleMenuChange,
}) => {
  const getIconComponent = (icon: string) => {
    try {
      return require(`react-feather/dist/icons/${icon}`).default;
    } catch (error) {
      return null;
    }
  };

  return (
    <div className="m-4 w-52 pt-0 rounded-tr-sm bg-sky-100">
      {options.map((tab) => {
        const IconComponent = getIconComponent(tab.icon);
        return (
          <div key={tab.tab} className={`pl-4 ${
            selectedSubTab === tab.tab
              ? 'bg-sky-400'
              : 'hover:bg-sky-400'
          }`}>
              <div className='flex flex-row items-center' onClick={() => {handleMenuChange(tab.tab)}}>
                {IconComponent && (
                  <IconComponent
                    size={18}
                    color={selectedSubTab === tab.tab ? 'white' : 'black'}
                    className="ml-2 mr-2 stroke-[3px]"
                  />
                )}
                <p
                  className={`h-10 text-black flex items-center hover:cursor-pointer ${
                    selectedSubTab === tab.tab
                      ? 'text-white'
                      : 'text-black'
                  }`}
                >
                  {tab.tab}
                </p>
              </div>
          </div>
        );
      })}
    </div>
  );
};

export default SidebarSubMenuComponent;
