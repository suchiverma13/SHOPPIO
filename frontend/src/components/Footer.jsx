// Footer.jsx
import React from "react";
import { motion } from "framer-motion";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Logo & About */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-white text-2xl font-bold mb-3">Shoppio</h1>
          <p className="text-sm leading-relaxed max-w-xs">
            Your premium shopping destination. Explore top-quality products with fast delivery and secure payments.
          </p>
        </motion.div>

        {/* Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <h2 className="text-white text-lg font-semibold mb-3">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            {["Home", "Products", "About Us", "Contact"].map((link, i) => (
              <li key={i}>
                <a href="/" className="hover:text-primary transition-colors duration-200">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Social */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <h2 className="text-white text-lg font-semibold mb-3">Follow Us</h2>
          <div className="flex space-x-4">
            {[FaFacebook, FaInstagram, FaTwitter].map((Icon, i) => (
              <motion.a
                key={i}
                href="#"
                whileHover={{ scale: 1.1 }}
                className="p-2 bg-gray-800 rounded-full hover:bg-primary transition-colors"
              >
                <Icon />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="text-center text-xs text-gray-500 mt-10 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} Shoppio. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
