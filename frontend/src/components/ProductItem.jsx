import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);
  const productImage = Array.isArray(image) ? image[0] : image || "/default.jpg";

  return (
    <Link to={`/product/${id}`} className="block group">
      <div className="w-full h-52 sm:h-72  overflow-hidden rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
        <img
          src={productImage}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <p className="pt-2 text-sm text-gray-700">{name}</p>
      <p className="text-sm font-semibold">{currency}{price}</p>
    </Link>
  );
};

export default ProductItem;
