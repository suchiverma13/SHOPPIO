import express from 'express'
import {placeOrder,updateStatus,userorders,allorders,placeOrderRazorpay,placeOrderStripe,verifyRazorpay, verifyStripe} from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'

const orderRouter = express.Router()

// Admin Feature
orderRouter.post('/list',adminAuth,allorders)
orderRouter.post('/status',adminAuth,updateStatus)

// payment feature
orderRouter.post('/place',authUser,placeOrder)
orderRouter.post('/stripe',authUser,placeOrderStripe)
orderRouter.post('/razorpay',authUser,placeOrderRazorpay)

// user feature
orderRouter.post('/userorders',authUser,userorders)


// verify payment
orderRouter.post('/verifyStripe',authUser,verifyStripe)
orderRouter.post('/verifyRazorpay',authUser,verifyRazorpay)
export default orderRouter