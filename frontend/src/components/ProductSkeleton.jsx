import React from 'react';

const ProductSkeleton = () => {
  return (
    <div className="w-full animate-pulse">
      <div className="rounded-lg overflow-hidden bg-gray-200 h-48 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-1"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
    </div>
  );
};

export default ProductSkeleton;
