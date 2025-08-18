import React from 'react';
import { assets } from '../assets/assets';

const NavBar = ({ setToken }) => {
  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('token');
  };

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-white shadow-md">
      <img src={assets.logo} alt="Logo" className="w-24 sm:w-32" />
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg text-sm sm:text-base transition"
      >
        Logout
      </button>
    </nav>
  );
};

export default NavBar;
