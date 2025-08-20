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
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="backdrop-blur-md sticky top-0 z-30 border-b shadow-sm"
        >
          <div className="flex items-center justify-center px-4 py-1 sm:py-2 relative">
            <div className="w-full sm:w-[500px] relative">
              {/* Search Input */}
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for products..."
                className="w-full px-5 py-2.5 sm:py-3 rounded-full border border-gray-300 
                           shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 
                           pr-10 transition-all duration-200 bg-white/80 backdrop-blur"
              />

            

              {/* Close Button (Right) */}
              {search.length > 0 && (
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  src={assets.cross_icon}
                  alt="clear"
                  className="w-4 absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer opacity-80 hover:opacity-100"
                  onClick={() => setSearch("")}
                />
              )}
            </div>

            {/* Hide SearchBar button (X outside input) */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="ml-3 text-sm text-gray-500 hover:text-gray-800 transition"
              onClick={() => setShowSearch(false)}
            >
              Close
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchBar;
