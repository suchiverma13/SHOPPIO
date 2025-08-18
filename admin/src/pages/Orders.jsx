import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendURL, currency } from "../App";
import { toast } from "react-toastify";

const statusColors = {
  "Order Placed": "bg-gray-200 text-gray-800",
  Packing: "bg-yellow-100 text-yellow-800",
  Shipped: "bg-blue-100 text-blue-800",
  "Out for Delivery": "bg-orange-100 text-orange-800",
  Delivered: "bg-green-100 text-green-800",
};

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    if (!token) return;

    try {
      const { data } = await axios.post(
        `${backendURL}/api/order/list`,
        {},
        { headers: { token } }
      );

      if (data.success) setOrders(data.orders.reverse());
      else toast.error(data.message);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch orders.");
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const { data } = await axios.post(
        `${backendURL}/api/order/status`,
        { orderId, status: newStatus },
        { headers: { token } }
      );
      if (data.success) fetchOrders();
      else toast.error(data.message);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status.");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [token]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h3 className="text-2xl font-semibold mb-6 text-gray-800">Orders</h3>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        <div className="flex flex-col gap-5">
          {orders.map((order) => (
            <div
              key={order._id}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center border border-gray-200 rounded-lg p-5 bg-white shadow-sm hover:shadow-md transition-all duration-300"
            >
              {/* Left Section */}
              <div className="flex items-start gap-4 flex-1">
                <img
                  src={
                    order.items[0]?.image?.[0] || "/default-product.png"
                  }
                  alt={order.items[0]?.name || "Product"}
                  className="h-26 object-cover rounded"
                />
                <div className="space-y-1">
                  <p className="text-gray-800 font-medium text-sm sm:text-base">
                    {order.items
                      .map(
                        (item) =>
                          `${item.name} x ${item.quantity} ${item.size || ""}`
                      )
                      .join(", ")}
                  </p>
                  <p className="font-semibold text-gray-700">
                    {order.address.firstName} {order.address.lastName}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {order.address.street}, {order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}
                  </p>
                </div>
              </div>

              {/* Right Section */}
              <div className="mt-4 sm:mt-0 flex flex-col sm:items-end gap-2">
                <p className={`text-sm font-semibold px-2 py-1 rounded ${order.payment ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {order.payment ? "Paid" : "Pending"}
                </p>
                <p className="text-gray-700 text-sm">
                  Items: {order.items.length}
                </p>
                <p className="text-gray-700 text-sm">
                  Method: {order.paymentMethod}
                </p>
                <p className="text-gray-700 text-sm">
                  Date: {new Date(order.date).toLocaleDateString()}
                </p>
                <p className="text-lg font-bold text-gray-900">
                  {currency}{order.amount}
                </p>
                <select
                  className={`border rounded cursor-pointer px-3 py-1 text-sm ${statusColors[order.status]} focus:outline-none`}
                  value={order.status}
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }
                >
                  {Object.keys(statusColors).map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
