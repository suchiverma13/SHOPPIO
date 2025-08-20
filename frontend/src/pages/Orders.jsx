import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";

const Orders = () => {
  const { currency, backendUrl, token } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const statusColors = {
    "order placed": "bg-gray-400",
    "packing": "bg-blue-400",
    "shipped": "bg-yellow-400",
    "out for delivery": "bg-orange-400",
    "delivered": "bg-green-500",
  };

  const loadOrderData = async () => {
    try {
      if (!token) return;

      const response = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        const allOrdersItem = [];
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            allOrdersItem.push({
              ...item,
              status: order.status.toLowerCase(),
              payment: order.payment,
              paymentMethod: order.paymentMethod,
              date: order.date,
            });
          });
        });
        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  if (!orderData.length)
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-gray-500 px-4">
        <p className="text-2xl font-semibold mb-2">No Orders Found</p>
        <p className="text-gray-400 text-center mb-6">
          You haven’t placed any orders yet. Start shopping to see your orders here.
        </p>
      </div>
    );

  return (
    <div className="border-t px-4 max-w-7xl mx-auto">
      <div className="text-2xl mb-6">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      <div className="flex flex-col gap-6">
        {orderData.map((item, index) => (
          <div
            key={index}
            className="py-4 border rounded-lg shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-4"
          >
            {/* Left side: Product Info */}
            <div className="flex items-start gap-4 md:gap-6 text-sm md:text-base">
              <img src={item.image} className="w-16 sm:w-20 rounded-lg" alt={item.name} />
              <div className="flex flex-col gap-1">
                <p className="font-medium">{item.name}</p>
                <div className="flex items-center gap-3 text-gray-700">
                  <p>{currency}{item.price}</p>
                  <p>Qty: {item.quantity}</p>
                  <p>Size: {item.size}</p>
                </div>
                <p className="text-gray-500 text-sm">
                  Date: {new Date(item.date).toLocaleDateString()}
                </p>
                <p className="text-gray-500 text-sm">
                  Payment: {item.paymentMethod}
                </p>
              </div>
            </div>

            {/* Right side: Status & Track */}
            <div className="flex flex-col md:flex-row md:items-center md:gap-6 mt-2 md:mt-0">
              <div className="flex items-center gap-2">
                <span
                  className={`w-3 h-3 rounded-full ${statusColors[item.status] || "bg-gray-400"}`}
                ></span>
                <p className="text-sm md:text-base font-medium capitalize">{item.status}</p>
              </div>
              <button
                onClick={loadOrderData}
                className="border px-4 py-2 text-sm font-medium rounded hover:bg-gray-100 transition mt-2 md:mt-0"
              >
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
