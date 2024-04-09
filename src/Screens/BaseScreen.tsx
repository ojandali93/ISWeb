import React, { ReactNode } from 'react';
import TopRowComponent from '../Components/Navigation/TopRowComponent';
import SidebarComponent from '../Components/Navigation/SidebarComponent';

interface LayoutComponentProps {
  children: ReactNode;
}

const LayoutComponent: React.FC<LayoutComponentProps> = ({ children }) => {
  return (
    <div className='h-screen w-screen flex flex-col'>
      <TopRowComponent />
      <div className='flex-1 flex flex-row'>
        <SidebarComponent />
        <div className='flex-1 bg-white ml-2 rounded-tl-md'>
          {children}
        </div>
      </div>
    </div>
  );
};

export default LayoutComponent;