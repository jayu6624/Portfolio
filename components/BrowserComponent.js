'use client';

import { useEffect, useState } from 'react';

export default function BrowserComponent() {
  const [windowData, setWindowData] = useState(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const getWindowData = () => ({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    setWindowData(getWindowData());

    const handleResize = () => {
      setWindowData(getWindowData());
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div>
      <h2>Browser Information</h2>
      {windowData && (
        <div>
          <p>Window Width: {windowData.width}px</p>
          <p>Window Height: {windowData.height}px</p>
        </div>
      )}
    </div>
  );
}
