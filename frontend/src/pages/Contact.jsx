import React from 'react';
import { assets } from '../assets/assets';

const About = () => {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-16 bg-white rounded-xl shadow-lg">
      
      {/* Left Side Image */}
      <div className="w-full md:w-1/2">
        <img
          src={assets.contact_img}
          alt="Laptop and Phone"
          className="w-full h-auto rounded-xl shadow-xl transition-transform duration-300 hover:scale-105 object-cover"
        />
      </div>

      {/* Right Side Text */}
      <div className="w-full md:w-1/2 flex flex-col px-4 md:px-0">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
          Our Store
        </h2>
        <p className="text-base text-gray-700 leading-relaxed">
          132103, ABC Station
        </p>
        <p className="text-base text-gray-700 leading-relaxed">
          India
        </p>

        <p className="text-base text-gray-700 font-medium mt-6">
          Tel: (+91) 8344534543
        </p>
        <p className="text-base text-gray-700 font-medium">
          Email: abc@gmail.com
        </p>

        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mt-10 mb-2">
          Careers at Forever
        </h3>
        <p className="text-base text-gray-700 leading-relaxed mb-6">
          Learn more about our teams and job openings at Forever.
        </p>

        <button className="self-start px-8 py-3 bg-black text-white font-bold rounded-full shadow-md hover:bg-gray-800 hover:shadow-lg transition-all duration-300">
          Explore Jobs
        </button>
      </div>
    </div>
  );
};

export default About;
