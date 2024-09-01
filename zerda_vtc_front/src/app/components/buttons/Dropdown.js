import React, {useEffect, useRef} from "react";

export function Dropdown({ children, isOpen, onClose, message }) {
  const dropdownRef = useRef(null);

   // Fermeture automatique du dropdown en cliquant à l'extérieur
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose(); // Fermeture du dropdown
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <div
      ref={dropdownRef}
      className={`absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg overflow-hidden z-50 transition transform ease-in-out duration-200 ${
        isOpen
          ? "opacity-100 scale-100"
          : "opacity-0 scale-95 pointer-events-none"
      }`}
      role="menu"
      aria-hidden={!isOpen}
    >
      {children}
     
    </div>
  );
}