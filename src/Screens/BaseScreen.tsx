import React, { ReactNode, useEffect, useRef, useState } from 'react';
import TopRowComponent from '../Components/Navigation/TopRowComponent';
import SidebarComponent from '../Components/Navigation/SidebarComponent';

interface LayoutComponentProps {
  children: ReactNode | null;
  sticky: ReactNode | null;
}

const LayoutComponent: React.FC<LayoutComponentProps> = ({ children, sticky }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState(0);
  const [maxWidth, setMaxWidth] = useState(0);

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setMaxHeight(containerRef.current.clientHeight - 150);  // Assuming 160px is reserved for other components
        setMaxWidth(containerRef.current.clientWidth - 240);  // Assuming 240px is reserved for sidebars, etc.
      }
    };

    updateSize();  // Update initially

    // Setup Resize Observer to adjust sizes based on the container's size
    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        updateSize();
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div className='h-screen w-screen flex flex-col overflow-hidden' ref={containerRef}>
      <TopRowComponent />
      <div className='flex-1 flex flex-row bg-slate-600'>
        <SidebarComponent />
        <div id='content' className='flex-1 m-4'>
          <div className='sticky top-0'>
            {sticky}
          </div>
          <div id='main-content' style={{ maxHeight, maxWidth }} className='overflow-auto bg-slate-600'>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutComponent;
