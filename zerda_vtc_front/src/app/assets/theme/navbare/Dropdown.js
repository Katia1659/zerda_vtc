import React from "react";
import "./Nav.css";



export default function Dropdown({ children }) {
  return (
    <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg overflow-hidden z-50">
      {children}
    </div>
  );
}