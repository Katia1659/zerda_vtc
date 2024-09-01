import React from 'react';

export function NavItem({ href, children, icone, message }) {
  return (
    <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6  hover:bg-gray-50">
      {icone && (
        <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg">
          {icone}
        </div>
      )}
      <div className="flex-auto">
        <a href={href} className="block font-Nunito font-bold text-justify  text-gray-900">
          {children}  
        </a>
        <p className="mt-1 text-gray-600">{message}</p>
      </div>
    </div>
  );
}


//  <a
//    href={href}
//    className="-mx-3 flex items-center space-x-2 rounded-lg px-4 py-3 font-Nunito font-bold leading-5 text-gray-900 hover:bg-indigo-hover"
//  >
//    {children}
//  </a>;