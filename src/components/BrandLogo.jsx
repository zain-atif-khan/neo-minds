import React from 'react';

export const BrandLogo = ({ onClick, style, className = '', width = 160 }) => (
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
      alt="NEO MINDS" 
      style={{
        width: `${width}px`,
        height: 'auto',
        maxHeight: '44px',
        objectFit: 'contain',
        display: 'block',
        flexShrink: 0,
      }}
    />
  </div>
);

export default BrandLogo;
