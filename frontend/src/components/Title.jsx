import React from "react";
import { motion } from "framer-motion";

const Title = ({ text1, text2 }) => {
  return (
    <div className="w-full text-center my-8">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl md:text-3xl font-bold tracking-wide"
      >
        <span className="text-gray-900">{text1}</span>{" "}
        <span className="text-primary">{text2}</span>
      </motion.h2>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="h-1 w-16 bg-primary mx-auto mt-2 rounded-full origin-left"
      />
    </div>
  );
};

export default Title;
