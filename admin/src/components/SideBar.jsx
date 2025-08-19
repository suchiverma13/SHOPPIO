import React from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';

const SideBar = () => {
  return (
    <aside className="w-60 min-h-screen bg-gray-50 border-r border-gray-300 shadow-sm p-4 hidden md:block">
      <nav className="flex flex-col gap-3">
        {[
          { name: 'Add Items', to: '/', icon: assets.add_icon },
          { name: 'List Items', to: 'list', icon: assets.order_icon },
          { name: 'Orders', to: 'orders', icon: assets.order_icon },
        ].map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg border-l-4 border-transparent hover:bg-gray-100 ${
                isActive ? 'bg-gray-200 border-l-black font-semibold' : ''
              }`
            }
          >
            <img src={item.icon} alt={item.name} className="w-5 h-5" />
            <span className="text-gray-700">{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default SideBar;
