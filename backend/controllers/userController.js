import validator from "validator"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import userModel from "../models/userModel.js";


const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

// user login route
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "user doesn't exists" })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = createToken(user._id)
            res.json({ success: true, token })
        }
        else {
            res.json({ success: false, message: "invalid credentials!" })
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })

    }
}

//user register route
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        //existing user check
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }

        // Validate email
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter valid email" });
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a Strong password" })
        }

        // hashing password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
        })
        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({ success: true, token })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })

    }

}
// admin login
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET);
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "invalid credentials!" })
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error })
    }
}

// New function to get user profile
const userProfile = async (req, res) => {
    try {
        const userId = req.body.userId;
        const user = await userModel.findById(userId).select('-password');
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }
        res.json({ success: true, user });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error fetching user profile" });
    }
};

export { loginUser, registerUser, adminLogin, userProfile };