import React from 'react';
import video from '../assets/video.mp4';

const About = () => {
  return (
    <div className="px-6 sm:px-12 lg:px-24 py-16 bg-white font-sans">
      <div className="flex flex-col lg:flex-row items-center gap-12 mb-24">
        {/* Video */}
        <video
          src={video}
          autoPlay
          loop
          muted
          controls
          className="w-full lg:w-[500px] rounded-lg shadow-lg"
        />
        {/* Text */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Our Story</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Since our inception, we've worked tirelessly to curate a diverse selection
            of high-quality products that cater to every taste and preference.
            From fashion and beauty to electronics and home essentials, we offer
            an extensive collection sourced from trusted brands and suppliers.
          </p>

          <h3 className="text-2xl font-bold mb-4 text-gray-800">Our Mission</h3>
          <p className="text-gray-600 leading-relaxed">
            Our mission at Shoppio is to empower customers with choice, convenience,
            and confidence. We're dedicated to providing a seamless shopping experience
            that exceeds expectations, from browsing and ordering to delivery and beyond.
          </p>
        </div>
      </div>
      <div className="text-center mb-16">
        <h2 className="text-3xl font-semibold mb-12 text-gray-800">
          Why <span className="border-b-4 border-gray-900">Choose Us</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-8">
          <div className="flex-1 min-w-[250px] max-w-[300px] p-8 bg-gray-50 border border-gray-200 rounded-lg shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer">
            <h4 className="text-xl font-semibold mb-3 text-gray-900">Quality Assurance</h4>
            <p className="text-gray-600 leading-relaxed">
              We meticulously select and vet each product to ensure it meets our
              stringent quality standards.
            </p>
          </div>
          <div className="flex-1 min-w-[250px] max-w-[300px] p-8 bg-gray-50 border border-gray-200 rounded-lg shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer">
            <h4 className="text-xl font-semibold mb-3 text-gray-900">Convenience</h4>
            <p className="text-gray-600 leading-relaxed">
              With our user-friendly interface and hassle-free ordering process,
              shopping has never been easier.
            </p>
          </div>
          <div className="flex-1 min-w-[250px] max-w-[300px] p-8 bg-gray-50 border border-gray-200 rounded-lg shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer">
            <h4 className="text-xl font-semibold mb-3 text-gray-900">
              Exceptional Customer Service
            </h4>
            <p className="text-gray-600 leading-relaxed">
              Our team of dedicated professionals is here to assist you every step of the way,
              ensuring your satisfaction is our top priority.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
