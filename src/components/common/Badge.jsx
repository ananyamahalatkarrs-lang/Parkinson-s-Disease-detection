import React from 'react';

export const Badge = ({ children, variant = 'info', isMono = false, style = {}, className = '' }) => {
  const variantClass = `badge-${variant}`;
  const monoClass = isMono ? 'font-mono' : '';

  return (
    <span
      className={`badge ${variantClass} ${monoClass} ${className}`}
      style={style}
    >
      {children}
    </span>
  );
};
