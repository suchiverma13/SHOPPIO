import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { motion, AnimatePresence } from 'framer-motion';

const Hero = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      image: assets.Girl1,
      title: 'SUMMER VIBES COLLECTION',
      subtitle: 'Discover the latest trends in lightweight fashion.',
    },
    {
      image: assets.Girl2,
      title: 'URBAN ELEGANCE',
      subtitle: 'Effortless style for the city dweller.',
    },
    {
      image: assets.Girl3,
      title: 'THE COZY ESSENTIALS',
      subtitle: 'Comfort meets chic with our new knitwear.',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative w-full h-[80vh] overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <img
            src={slides[currentIndex].image}
            alt={slides[currentIndex].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>
      </AnimatePresence>

      {/* Text Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <motion.h1
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-wide"
        >
          {slides[currentIndex].title}
        </motion.h1>
        <motion.p
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-lg sm:text-2xl text-gray-200 mt-4 max-w-2xl"
        >
          {slides[currentIndex].subtitle}
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/collection')}
          className="mt-8 px-8 py-3 bg-white text-gray-900 rounded-full font-semibold shadow-lg hover:shadow-xl transition"
        >
          Shop Now
        </motion.button>
      </div>
    </div>
  );
};

export default Hero;
