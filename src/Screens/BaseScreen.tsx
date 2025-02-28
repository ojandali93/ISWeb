import React, { ReactNode, useEffect, useRef, useState } from 'react';
import TopRowComponent from '../Components/Navigation/TopRowComponent';
import SidebarComponent from '../Components/Navigation/SidebarComponent';
import { useNavigation } from '../Context/NavigationContext';

interface LayoutComponentProps {
  header: ReactNode | null;
  content: ReactNode | null; 
}

const LayoutComponent: React.FC<LayoutComponentProps> = ({ header, content }) => {

  const containerRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState(0);
  const [maxWidth, setMaxWidth] = useState(0);

  const { currentSidebarType } = useNavigation()

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setMaxHeight(containerRef.current.clientHeight - 58);  // Assuming 160px is reserved for other components
        setMaxWidth(containerRef.current.clientWidth - 210);  // Assuming 240px is reserved for sidebars, etc.
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
      <div className='flex-1 flex flex-row bg-stone-900'>
        <SidebarComponent />
        <div id='content' style={{ display: 'flex', flexDirection: 'column', maxHeight, maxWidth }} className='relative h-full w-full p-4'>
          <div className='sticky top-0 z-20'>
            {header}
          </div>
          {
            currentSidebarType === 'static' 
              ? <div id='main-content' style={{flex: 1}} className='z-10 bg-stone-800' >
                  {content}
                </div>
              : <div id='main-content' style={{flex: 1}} className='z-10 bg-stone-800 overflow-scroll' >
                  {content}
                </div>
          }
        </div>
      </div>
    </div>
  );
};

export default LayoutComponent;
