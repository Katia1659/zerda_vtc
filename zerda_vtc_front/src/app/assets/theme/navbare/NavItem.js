import React from 'react';
import './Nav.css';

export default function NavItem({ href, children }) {
  return (
    <a
      href={href}
      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
    >
      {children}
    </a>
  );
}