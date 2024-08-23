import React from 'react';

export default function Button({ children, variant = 'primary' }) {
    
  const baseStyle = 'px-4 py-2 rounded-md font-semibold focus:outline-none transition-colors duration-200';
  const primaryStyle = 'bg-white text-blue-500 hover:bg-gray-100';
  const secondaryStyle = 'bg-blue-700 text-white hover:bg-blue-600';

  const styles = variant === 'secondary' ? secondaryStyle : primaryStyle;

  return (
    <button className={`${baseStyle} ${styles}`}>
      {children}
    </button>
  );
}

