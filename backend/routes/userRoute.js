import express from 'express'
import { loginUser, registerUser, updateProfile, adminLogin, userProfile } from '../controllers/userController.js'
import auth from "../middleware/auth.js"; // Make sure you have this middleware

const userRouter = express.Router();
userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/admin', adminLogin)

// New route for user profile
userRouter.post('/profile', auth, userProfile)
userRouter.post("/update-profile", auth, updateProfile);     // Profile update route
export default userRouter;