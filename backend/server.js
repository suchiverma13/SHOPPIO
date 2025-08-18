import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/Cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import dashboardRouter from './routes/dashboardRoute.js'
import adminRoutes from "./routes/adminRoutes.js";

// App Config
const app =express()
const port =process.env.PORT ||4000
connectDB()
connectCloudinary()

// Middlewares
app.use(express.json())
app.use(cors())

// API endpoint
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)

app.get('/',(req,res)=>{
    res.send("API WORKING")
})

app.use("/api/admin", adminRoutes);

app.listen(port,()=>console.log('server started at port number:'+port))

