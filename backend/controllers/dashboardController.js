import orderModel from '../models/orderModel.js';
import productModels from '../models/productModels.js';
import userModel from '../models/userModel.js';

const getDashboardData = async (req, res) => {
    try {
        const totalUsers = await userModel.countDocuments();
        const totalProducts = await productModels.countDocuments();
        const totalOrders = await orderModel.countDocuments();
        
        res.json({
            success: true,
            data: {
                totalUsers,
                totalProducts,
                totalOrders
            }
        });
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export { getDashboardData };