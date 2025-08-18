import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setVisible(location.pathname.includes('collection'));
  }, [location]);

  return (
    <AnimatePresence>
      {showSearch && visible && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="bg-white border-t border-b py-4"
        >
          <div className="flex items-center justify-center relative mx-4 sm:mx-0">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-3/4 sm:w-1/2 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <img
              className="w-4 absolute right-[25%] sm:right-[25%] cursor-pointer"
              src={assets.cross_icon}
              alt="close"
              onClick={() => setShowSearch(false)}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchBar;
