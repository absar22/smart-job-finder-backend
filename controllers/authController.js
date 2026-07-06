const User = require('../models/User')
const bcrypt = require('bcryptjs')
const generateToken = require('../utils/generateToken')
const cloudinary = require('../config/cloudinary')
const { sendPasswordResetEmail } = require('../services/email.service')
const crypto = require('crypto')
// Create new user
const createUser = async(req,res,next) => {
    try{
        const {name, email, password} = req.body
        if(!name || !email || !password){
            return res.status(400).json({message:"All the fields are required!"})
        }
        if(!email.includes('@')){
            return res.status(400).json({message:"Invalid email format!"})
        }
        if(password.length < 8){
            return res.status(400).json({message:"Password must be at least 8 characters long!"})
        }
        const userExists = await User.findOne({email: email.toLowerCase()})
        if(userExists){
            return res.status(400).json({message:"User already exists!"})
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await User.create({
            name,
            email: email.toLowerCase(),
            password: hashedPassword,
            profileImage: null  // Initialize with null
        })
        
        const token = generateToken(newUser._id)
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 5 * 24 * 60 * 60 * 1000 // 5 days
        })
        
        res.status(201).json({
            user: {  
                _id: newUser._id,
                email: newUser.email,
                name: newUser.name,
                profileImage: null
            },
            message: "User created successfully!"
        })
    }catch(err){
        next(err)
    }
}

// Login user
const loginUser = async(req,res,next) => {
    try{
        const {email, password} = req.body
        if(!email || !password){
            return res.status(400).json({message:"all fields are required"})
        }
        const user = await User.findOne({email: email.toLowerCase()})
        if(!user){
            return res.status(400).json({message:"User not found"})
        } 
        const isMatch = await bcrypt.compare(password, user.password)  
        if(!isMatch){
            return res.status(400).json({message:"Password is incorrect"})
        }
        
        const token = generateToken(user._id)
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 5 * 24 * 60 * 60 * 1000
        })
        
        res.status(200).json({
            user: { 
                _id: user._id,
                email: user.email.toLowerCase(),
                name: user.name,
                profileImage: user.profileImage || null
            },
            message: "Login successful!"
        })
    }catch(err){
        next(err)
    }
}

// Get current user /me
const getMe = async (req,res,next) => {
    try{
        const user = await User.findById(req.user.id).select('-password')
        
        if(!user){
            return res.status(404).json({message:'User not found'})
        }

        return res.status(200).json({
            user: {
                _id: user._id,
                email: user.email,
                name: user.name,
                role: user.role,
                profileImage: user.profileImage || null  
            },
            message: 'User retrieved successfully'
        })
    }catch(err){
      next(err)
    }
}

// Logout
const logoutUser = async(req,res,next) => {
    try{
        res.clearCookie('token', {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        })
        res.status(200).json({message:'Logout successful'})
    }catch(err){
        next(err)
    }
}

// Upload image 
const uploadProfile = async(req,res,next) => {
    try{
        if(!req.file) {
            return res.status(400).json({message:"No file uploaded"})
        }
        
        const result = await cloudinary.uploader.upload(req.file.path)
        
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { profileImage: result.secure_url },
            { new: true }  // Return updated document
        ).select('-password')
        
       
        res.json({
            user: {
                _id: user._id,
                email: user.email,
                name: user.name,
                profileImage: user.profileImage
            },
            message: "Profile image uploaded successfully!"
        })
    }catch(err){
        next(err)
    }
}

const createForgotPassword = async(req,res,next)=>{
    let user 
    try{
        if(!req.body.email){
            return res.status(400).json({message:"Email is required"})
        }
        user = await User.findOne({email:req.body.email.toLowerCase()})

        if(!user){
            return res.status(404).json({message:"User not found"})
        }
 
        const resetToken = user.createPasswordResetToken()
        const resetURL = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
        console.log("Reset URL:", resetURL);
        await user.save({validateBeforeSave:false})
        
        await sendPasswordResetEmail({
            email: user.email,
            resetURL,
            subject: "Reset your password",
            message: `Click the link below to reset your password:${resetURL}This link expires in 10 minutes.`
        })

        res.status(200).json({
            message: "If an account with that email exists, we've sent a password reset link."
        })
    }catch(err){
     
        if (user) {
            try {
                user.passwordResetToken = undefined
                user.passwordResetExpires = undefined
                await user.save({validateBeforeSave:false})
            } catch (cleanupErr) {
                console.error('Cleanup failed:', cleanupErr)
            }
        }
        next(err)
    }
}

const resetPassword = async (req,res,next) => {
    try{
        const { token } = req.params
        const { password, confirmPassword } = req.body
        
      
        if(!token){
            return res.status(400).json({message:"Reset token is required"})
        }
        if(!password || !confirmPassword){
            return res.status(400).json({message:"Please provide both password and confirm password"})
        }
        if(password !== confirmPassword){
            return res.status(400).json({message:"Passwords do not match"})
        }
        if(password.length < 8){ 
            return res.status(400).json({message:"Password must be at least 8 characters long"})
        }
        
        // Hash the token to compare with stored hash
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex')
        
        const user = await User.findOne({
            passwordResetToken: hashedToken,
            passwordResetExpires: { $gt: Date.now() }
        })
        
        if(!user){
            return res.status(400).json({message:"Token is invalid or has expired"})
        }
        
        // Hash password manually (if no pre-save hook)
        const hashedPassword = await bcrypt.hash(password, 10)
        user.password = hashedPassword
        
        //  Option 2: If you have pre-save hook, just set and let hook handle it
        // user.password = password // Only if you have pre('save') hook
        
        user.passwordResetToken = undefined
        user.passwordResetExpires = undefined
        user.passwordChangedAt = Date.now() //  Track when password was changed
        
        await user.save()
        
        //  Optional: Clear any existing sessions/tokens
        await clearUserSessions(user._id)
        
        res.status(200).json({
            message: "Password reset successful! You can now log in with your new password."
        })
    }catch(err){
        next(err)
    }
}


module.exports = {createUser, loginUser, getMe, logoutUser, uploadProfile, createForgotPassword, resetPassword}