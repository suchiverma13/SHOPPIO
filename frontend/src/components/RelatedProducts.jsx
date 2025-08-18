import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    const filtered = products.filter(item => item.category === category && item.subCategory === subCategory);
    setRelated(filtered.slice(0, 5));
  }, [products, category, subCategory]);

  if (!related.length) return null;

  return (
    <div className='my-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
      <div className='text-center text-3xl py-2'>
        <Title text1={'Related'} text2={'Collections'} />
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6'>
        {related.map((item, idx) => (
          <ProductItem
            key={idx}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
