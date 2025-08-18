import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";
import ProductItemSkeleton from "../components/ProductSkeleton";
import { motion } from "framer-motion";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProduct, setLatestProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setLatestProduct(products.slice(0, 10));
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [products]);

  return (
    <div className="py-12">
      <div className="text-center mb-8">
        <motion.h1
          className="text-4xl sm:text-5xl font-bold text-gray-800 tracking-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-gray-800">LATEST</span>{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-500">
            COLLECTIONS
          </span>
        </motion.h1>
        <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto mt-4">
          Shop the newest styles that combine comfort and elegance for every occasion.
        </p>
      </div>

      <motion.div
        layout
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
      >
        {loading
          ? Array.from({ length: 10 }).map((_, i) => <ProductItemSkeleton key={i} />)
          : latestProduct.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <ProductItem
                  id={item._id}
                  image={item.image}
                  name={item.name}
                  price={item.price}
                />
              </motion.div>
            ))}
      </motion.div>
    </div>
  );
};

export default LatestCollection;