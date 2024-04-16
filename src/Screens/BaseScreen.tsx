import React, { ReactNode, useEffect } from 'react';
import TopRowComponent from '../Components/Navigation/TopRowComponent';
import SidebarComponent from '../Components/Navigation/SidebarComponent';

interface LayoutComponentProps {
  children: ReactNode;
}

const LayoutComponent: React.FC<LayoutComponentProps> = ({ children }) => {
  const [maxWidth, setMaxWidth] = React.useState(window.innerWidth);  
  useEffect(() => {
    const updateDimensions = () => {
      setMaxWidth(window.innerWidth);
    };
    window.addEventListener('resize', updateDimensions);
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, [maxWidth]);

  return (
    <div className='h-screen w-screen flex flex-col'>
      <TopRowComponent />
      <div className='flex flex-1 flex-row' style={{ width: maxWidth}} >
        <SidebarComponent />
        <div id='content' style={{ width: maxWidth}} className='rounded-tl-md overflow-hidden'>
          {children}
        </div>
      </div>
    </div>
  );
};

export default LayoutComponent;
