import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";
import { Link } from "react-router-dom";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } =
    useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const prodId in cartItems) {
        for (const size in cartItems[prodId]) {
          if (cartItems[prodId][size] > 0) {
            tempData.push({
              _id: prodId,
              size: size,
              quantity: cartItems[prodId][size],
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  // If cart is empty, show message
  if (cartData.length === 0)
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-gray-500 px-4">
        <img
          src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQjfq1ju534VapeO-Q8_c1gxWFfgYmcQ78jQ&s"} // optional: add a cart empty image in assets
          alt="Empty Cart"
          className="w-32 mb-4"
        />
        <p className="text-xl font-semibold mb-2">Your Cart is Empty</p>
        <p className="text-gray-400 mb-6">Looks like you haven’t added any products yet.</p>
        <Link
          to="/"
          className="px-6 py-3 bg-black text-white rounded hover:bg-gray-800 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );

  return (
    <div className="border-t pt-14 px-4 sm:px-8 max-w-7xl mx-auto">
      <div className="text-2xl mb-6">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      <div className="flex flex-col gap-4">
        {cartData.map((item, index) => {
          const productData = products.find((p) => p._id === item._id);
          if (!productData) return null;

          return (
            <div
              key={index}
              className="py-4 border rounded-lg px-4 grid grid-cols-1 sm:grid-cols-[4fr_1fr_0.5fr] items-center gap-4"
            >
              {/* Product Info */}
              <div className="flex items-start gap-4">
                <img
                  src={productData.image?.[0]}
                  alt={productData.name}
                  className="w-16 sm:w-20 rounded-lg object-cover"
                />
                <div className="flex flex-col gap-2">
                  <p className="text-sm sm:text-lg font-medium">
                    {productData.name}
                  </p>
                  <div className="flex items-center gap-4">
                    <p className="text-gray-700 font-semibold">
                      {currency}
                      {productData.price}
                    </p>
                    <span className="px-2 py-1 border rounded bg-gray-100 text-sm">
                      {item.size}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quantity */}
              <input
                type="number"
                min={1}
                defaultValue={item.quantity}
                onChange={(e) =>
                  e.target.value !== "" &&
                  e.target.value !== "0" &&
                  updateQuantity(item._id, item.size, Number(e.target.value))
                }
                className="border px-2 py-1 w-20 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              />

              {/* Delete */}
              <img
                src={assets.bin_icon}
                alt="Remove"
                onClick={() => updateQuantity(item._id, item.size, 0)}
                className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer hover:scale-110 transition-transform"
              />
            </div>
          );
        })}
      </div>

      {/* Cart Total */}
      <div className="flex justify-end mt-12">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="text-end mt-6">
            <button
              onClick={() => navigate("/place-order")}
              className="bg-black text-white text-sm px-8 py-3 rounded hover:bg-gray-800 transition-colors"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
