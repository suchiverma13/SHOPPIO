// routes/adminRoutes.js
import express from "express";
import orderModel from "../models/orderModel.js";
import productModel from "../models/productModels.js";
import userModel from "../models/userModel.js";
import adminAuth  from "../middleware/adminAuth.js";

const router = express.Router();

// Dashboard data API
router.get("/dashboard-data", adminAuth, async (req, res) => {
  try {
    const totalOrders = await orderModel.countDocuments();
    const totalProducts = await productModel.countDocuments();
    const totalUsers = await userModel.countDocuments();

    const recentOrders = await orderModel
      .find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      totalOrders,
      totalProducts,
      totalUsers,
      recentOrders,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
