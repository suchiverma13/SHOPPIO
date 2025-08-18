import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendURL, currency } from "../App";
import { toast } from "react-toastify";

const List = ({ token }) => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const limit = 10;

  const fetchProducts = async (pageNumber = 1, append = false) => {
    setLoading(true);
    try {
      const res = await axios.get(`${backendURL}/api/product/list`, {
        params: { page: pageNumber, limit },
      });

      if (res.data.success) {
        const { products: newProducts, totalProducts } = res.data;
        setProducts((prev) =>
          append ? [...prev, ...newProducts] : newProducts
        );
        setHasMore(
          newProducts.length > 0 &&
            products.length + newProducts.length < totalProducts
        );
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (!loading && hasMore) setPage((prev) => prev + 1);
  };

  const removeProduct = async (id) => {
    try {
      const res = await axios.post(
        `${backendURL}/api/product/remove`,
        { id },
        { headers: { token } }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        fetchProducts();
      } else toast.error(res.data.message);
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (page > 1) fetchProducts(page, true);
  }, [page]);

  return (
    <div className="p-5 w-full">
      <h2 className="text-2xl font-semibold mb-5">Product List</h2>

      <div className="flex flex-col gap-4">
        {products.length === 0 ? (
          <p className="text-gray-500 text-center">
            {loading ? "Loading..." : "No products found."}
          </p>
        ) : (
          products.map((product) => (
            <div
              key={product._id}
              className="flex flex-col sm:flex-row items-center justify-between bg-white border rounded-lg p-4 shadow hover:shadow-lg transition-all duration-200 gap-4"
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="flex gap-1">
                  {product.image && product.image.length > 0 ? (
                    product.image.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={product.name}
                        className="h-26 object-cover rounded"
                      />
                    ))
                  ) : (
                    <span className="text-gray-400 italic">No image</span>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-semibold">{product.name}</p>
                  <p className="text-gray-500 text-sm">{product.category}</p>
                  <p className="text-gray-700 font-medium">
                    {currency}
                    {product.price}
                  </p>
                  <p className="text-gray-600 text-sm">
                    Sizes: {product.sizes?.join(", ") || "N/A"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => removeProduct(product._id)}
                className="bg-red-500 hover:bg-red-600 cursor-pointer text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>

      {hasMore && !loading && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleLoadMore}
            className="bg-black text-white px-8 py-3 rounded hover:bg-gray-800 transition-all"
          >
            Load More
          </button>
        </div>
      )}
      {loading && page > 1 && <p className="text-center mt-4">Loading more...</p>}
    </div>
  );
};

export default List;
