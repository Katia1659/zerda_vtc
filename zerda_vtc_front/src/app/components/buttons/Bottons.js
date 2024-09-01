import React from 'react';

export function Button({ children,onClick , variant = 'primary', type, }) {
    
  const baseStyle =
    "px-4 py-2 rounded-md font-Nunito font-bold focus:outline-none transition-colors duration-200";
  const primaryStyle = "bg-white text-indigo hover:bg-indigo-lighter";
  const secondaryStyle = "text-white bg-indigo hover:bg-indigo-light";

  const styles = variant === 'secondary' ? secondaryStyle : primaryStyle;

  return (
    <button type={type} disabled= {false} onClick={onClick}  className={`${baseStyle} ${styles}`}>
      {children}
    </button>
  );
}

