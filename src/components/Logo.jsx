import React, { useState, useEffect } from 'react';

const Logo = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  // Check screen size on mount and resize
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);
      setIsTablet(width > 768 && width <= 1024);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <div style={{ 
      fontSize: isMobile ? '1.5rem' : isTablet ? '1.75rem' : '2rem', 
      fontWeight: 'bold',
      transition: 'font-size 0.3s ease'
    }}>
      <span style={{ color: 'var(--text-color)' }}>Azhari </span>
      <span style={{ color: 'var(--primary-color)' }}>Attar</span>
      <span style={{ color: 'var(--text-color)' }}></span>
    </div>
  );
};

export default Logo;  