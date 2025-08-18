import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await userModel.countDocuments();

    const newOrders = await orderModel.countDocuments({ status: "pending" });
    const packedOrders = await orderModel.countDocuments({ status: "packed" });
    const shippedOrders = await orderModel.countDocuments({ status: "shipped" });
    const deliveredOrders = await orderModel.countDocuments({ status: "delivered" });

    const totalIncomeAgg = await orderModel.aggregate([
      { $match: { paymentStatus: "paid" } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);
    const totalIncome = totalIncomeAgg[0]?.total || 0;

    const razorpayOrders = await orderModel.countDocuments({ paymentMethod: "razorpay" });
    const stripeOrders = await orderModel.countDocuments({ paymentMethod: "stripe" });
    const codOrders = await orderModel.countDocuments({ paymentMethod: "cod" });

    res.json({
      totalUsers,
      newOrders,
      packedOrders,
      shippedOrders,
      deliveredOrders,
      totalIncome,
      razorpayOrders,
      stripeOrders,
      codOrders
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching dashboard stats", error });
  }
};
