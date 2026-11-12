import React from 'react';

<<<<<<< HEAD
export const BrandLogo = ({ onClick, style, className = '', width = 188 }) => (
=======
export const BrandLogo = ({ onClick, style, className = '', width = 160 }) => (
>>>>>>> origin/main
  <div 
    className={`brand-logo ${className}`} 
    onClick={onClick}
    style={{ 
      display: 'inline-flex', 
      alignItems: 'center', 
      cursor: 'pointer',
      userSelect: 'none',
      flexShrink: 0,
      overflow: 'visible',
      ...style 
    }}
  >
    <img 
      src="/images/neo_minds_logo.png" 
<<<<<<< HEAD
      alt="NEO MINDS TECH HUB" 
      style={{
        width: `${width}px`,
        height: 'auto',
        maxHeight: '46px',
=======
      alt="NEO MINDS" 
      style={{
        width: `${width}px`,
        height: 'auto',
        maxHeight: '44px',
>>>>>>> origin/main
        objectFit: 'contain',
        display: 'block',
        flexShrink: 0,
      }}
    />
  </div>
);

export default BrandLogo;
