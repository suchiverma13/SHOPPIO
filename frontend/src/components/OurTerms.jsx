import React from 'react';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion';

const items = [
  {
    img: 'exchange_icon',
    title: 'Easy Exchange Policy',
    desc: 'We offer a hassle-free exchange',
  },
  {
    img: 'quality_icon',
    title: '7 Days Return Policy',
    desc: 'We provide a 7-day free return policy',
  },
  {
    img: 'support_img',
    title: 'Best Customer Support',
    desc: 'We give 24/7 customer support',
  },
];

const OurTerms = () => {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-10">
          {items.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-gray-100 bg-gray-50 p-8 text-center shadow-sm hover:shadow-md transition"
            >
              <div className="mx-auto mb-4 w-16 h-16 grid place-items-center rounded-full bg-white shadow">
                <img
                  src={assets[card.img]}
                  alt={card.title}
                  className="w-8 h-8"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">{card.title}</h3>
              <p className="mt-1 text-sm text-gray-500">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurTerms;
