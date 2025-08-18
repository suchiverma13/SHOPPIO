import React from 'react';
import { motion } from 'framer-motion';

const NewsLetterBox = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
    // keep your existing submission logic if added later
  };

  return (
    <div className="py-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto max-w-2xl rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"
      >
        <p className="text-2xl font-semibold text-gray-900 text-center">Subscribe now!</p>
        <p className="text-gray-500 mt-3 text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, suscipit commodi blanditiis quam quod enim veritatis rerum minima culpa doloremque perspiciatis, ipsa voluptatibus eius, illo eos qui aut autem est.
        </p>

        <form
          onSubmit={onSubmitHandler}
          className="mt-6 flex flex-col sm:flex-row items-stretch gap-3"
        >
          <input
            className="flex-1 rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-gray-900/10"
            type="email"
            placeholder="Enter your email"
            aria-label="Email"
          />
          <button
            type="submit"
            className="rounded-xl bg-black text-white text-sm px-6 py-3 font-medium hover:opacity-90 transition"
          >
            Subscribe
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default NewsLetterBox;
