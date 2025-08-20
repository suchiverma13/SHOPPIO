import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";

const PlaceOrder = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);

  const [method, setMethod] = useState("cod");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  // If "Buy Now" product and size passed from Product page
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    if (location.state && location.state.product && location.state.size) {
      const { product, size } = location.state;
      setOrderItems([
        {
          productId: product._id,
          name: product.name,
          price: product.price,
          image: product.image[0],
          size: size,
          quantity: 1,
        },
      ]);
    } else {
      // Normal cart order flow
      let items = [];
      for (const productId in cartItems) {
        for (const sizeKey in cartItems[productId]) {
          if (cartItems[productId][sizeKey] > 0) {
            const product = products.find((p) => p._id === productId);
            if (product) {
              items.push({
                productId: product._id,
                name: product.name,
                price: product.price,
                image: product.image[0],
                size: sizeKey,
                quantity: cartItems[productId][sizeKey],
              });
            }
          }
        }
      }
      setOrderItems(items);
    }
  }, [location.state, cartItems, products]);

  const isCartEmpty = orderItems.length === 0;

  const onChangeHandler = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const initPay = (order, orderData) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Order Payment",
      description: "Order payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (PaymentResponse) => {
        try {
          // Backend ko payment verification ke liye call karte hain
          const verifyResponse = await axios.post(
            backendUrl + "/api/order/verifyRazorpay",
            { ...PaymentResponse, ...orderData },
            { headers: { token } }
          );

          if (verifyResponse.data.success) {
            toast.success("Payment verified and order placed successfully!");
            setCartItems({}); // cart empty karo frontend me
            navigate("/orders"); // order summary page pe le jao
          } else {
            toast.error("Payment verified but order placement failed");
          }
        } catch (error) {
          toast.error("Payment verification failed");
        }
      },
    };
    new window.Razorpay(options).open();
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (isCartEmpty) {
      toast.error("Your cart is empty!");
      return;
    }

    try {
      const amount =
        orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0) +
        delivery_fee;

      const orderData = {
        address: formData,
        items: orderItems,
        amount: amount,
      };

      switch (method) {
        case "cod":
          const response = await axios.post(
            backendUrl + "/api/order/place",
            orderData,
            { headers: { token } }
          );
          if (response.data.success) {
            toast.success(response.data.message);
            setCartItems({});
            navigate("/orders");
          } else toast.error(response.data.message);
          break;

        case "razorpay":
          const responseRazorpay = await axios.post(
            backendUrl + "/api/order/razorpay",
            orderData,
            { headers: { token } }
          );
          if (responseRazorpay.data.success)
            initPay(responseRazorpay.data.order, orderData);
          else toast.error("Failed to create Razorpay order");
          break;

        case "stripe":
          const responseStripe = await axios.post(
            `${backendUrl}/api/order/stripe`,
            orderData,
            { headers: { token } }
          );
          if (responseStripe.data.success)
            window.location.replace(responseStripe.data.session_url);
          else toast.error(responseStripe.data.message);
          break;

        default:
          break;
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (isCartEmpty)
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-gray-500 px-4">
        <img
          src={assets.cart_empty_icon}
          alt="Empty Cart"
          className="w-32 mb-4"
        />
        <p className="text-2xl font-semibold mb-2">Your Cart is Empty</p>
        <p className="text-gray-400 mb-6 text-center">
          Add some products to place an order.
        </p>
        <Link
          to="/"
          className="px-6 py-3 bg-black text-white rounded hover:bg-gray-800 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col lg:flex-row gap-8 min-h-[80vh] px-4 sm:px-8"
    >
      {/* Left Side - Delivery Form */}
      <div className="flex flex-col gap-4 w-full lg:w-1/2">
        <Title text1="DELIVERY" text2="INFORMATION" />
        <div className="flex gap-3">
          <input
            required
            name="firstName"
            value={formData.firstName}
            onChange={onChangeHandler}
            type="text"
            placeholder="First Name"
            className="flex-1 border w-1/2 rounded px-3 py-2"
          />
          <input
            name="lastName"
            value={formData.lastName}
            onChange={onChangeHandler}
            type="text"
            placeholder="Last Name"
            className="flex-1 border  w-1/2 rounded px-3 py-2"
          />
        </div>
        <input
          required
          name="email"
          value={formData.email}
          onChange={onChangeHandler}
          type="email"
          placeholder="Email Address"
          className="border rounded px-3 py-2 w-full"
        />
        <input
          required
          name="street"
          value={formData.street}
          onChange={onChangeHandler}
          type="text"
          placeholder="Street"
          className="border rounded px-3 py-2 w-full"
        />
        <div className="flex gap-3">
          <input
            required
            name="city"
            value={formData.city}
            onChange={onChangeHandler}
            type="text"
            placeholder="City"
            className="flex-1 border  w-1/2 rounded px-3 py-2"
          />
          <input
            required
            name="state"
            value={formData.state}
            onChange={onChangeHandler}
            type="text"
            placeholder="State"
            className="flex-1 border  w-1/2 rounded px-3 py-2"
          />
        </div>
        <div className="flex gap-3">
          <input
            required
            name="zipcode"
            value={formData.zipcode}
            onChange={onChangeHandler}
            type="number"
            placeholder="Zipcode"
            className="flex-1 border  w-1/2 rounded px-3 py-2"
          />
          <input
            required
            name="country"
            value={formData.country}
            onChange={onChangeHandler}
            type="text"
            placeholder="Country"
            className="flex-1 border  w-1/2 rounded px-3 py-2"
          />
        </div>
        <input
          required
          name="phone"
          value={formData.phone}
          onChange={onChangeHandler}
          type="number"
          placeholder="Phone"
          className="border rounded px-3 py-2 w-full"
        />
      </div>

      {/* Right Side - Cart Total & Payment */}
      <div className="flex flex-col w-full lg:w-1/2 gap-6 mt-8 lg:mt-0">
        <CartTotal />
        <div className="mt-6">
          <Title text1="PAYMENT" text2="METHOD" />
          <div className="flex flex-col lg:flex-row gap-4 mt-3">
            <div
              onClick={() => setMethod("stripe")}
              className={`flex items-center gap-3 p-2 border cursor-pointer rounded ${
                method === "stripe" ? "border-green-500" : ""
              }`}
            >
              <span
                className={`w-4 h-4 rounded-full border ${
                  method === "stripe" ? "bg-green-400" : ""
                }`}
              ></span>
              <img src={assets.stripe_logo} alt="" className="h-5" />
            </div>
            <div
              onClick={() => setMethod("razorpay")}
              className={`flex items-center gap-3 p-2 border cursor-pointer rounded ${
                method === "razorpay" ? "border-green-500" : ""
              }`}
            >
              <span
                className={`w-4 h-4 rounded-full border ${
                  method === "razorpay" ? "bg-green-400" : ""
                }`}
              ></span>
              <img src={assets.razorpay_logo} alt="" className="h-5" />
            </div>
            <div
              onClick={() => setMethod("cod")}
              className={`flex items-center gap-3 p-2 border cursor-pointer rounded ${
                method === "cod" ? "border-green-500" : ""
              }`}
            >
              <span
                className={`w-4 h-4 rounded-full border ${
                  method === "cod" ? "bg-green-400" : ""
                }`}
              ></span>
              <p className="text-black-500 text-sm font-medium">
                Cash on Delivery
              </p>
            </div>
          </div>
          <button
            type="submit"
            className="mt-6 w-full cursor-pointer bg-black text-white py-3 rounded hover:bg-gray-800 transition-colors"
          >
            PLACE ORDER
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
