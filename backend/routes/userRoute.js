import express from 'express'
import { loginUser, registerUser, adminLogin, userProfile } from '../controllers/userController.js'
import authMiddleware from "../middleware/auth.js"; // Make sure you have this middleware

const userRouter = express.Router();
userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/admin', adminLogin)

// New route for user profile
userRouter.post('/profile', authMiddleware, userProfile)

export default userRouter;