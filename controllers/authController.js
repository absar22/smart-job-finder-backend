    const User = require('../models/User')
    const bcrypt = require('bcryptjs')
    const generateToken = require('../utils/generateToken')
    const cloudinary = require('../config/cloudinary')
    // Create new user
    const createUser = async(req,res) => {
    try{
        const {name,email,password}= req.body
        if(!name||!email||!password){
            return res.status(400).json({message:"All the fields are required!"})
        }
        if(!email.includes('@')){
            return res.status(400).json({message:"Invalid email format!"})
        }
        if(password.length< 8){
            return res.status(400).json({message:"Password must be at least 8 characters long!"})
        }
        const userExists = await User.findOne({email:email.toLowerCase()})
        if(userExists){
            return res.status(400).json({message:"User already exists!"})
        }
        const hashedPassword = await bcrypt.hash(password,10)
        const newUser = await User.create({
            name,
            email:email.toLowerCase(),
            password:hashedPassword
        })
    //      res.status(201).json({
    //        _id:newUser._id,
    //        email:newUser.email,
    //        token:generateToken(newUser._id),
    //        message:"User created successfully!"
    //    })
            const token = generateToken(newUser._id)
            res.cookie('token',token, {
                httpOnly:true,
                secure:process.env.NODE_ENV === 'production',
                sameSite:'lax',
                maxAge: 5 * 24 * 60 * 60 * 1000 // 5 days
            })
            //  Send res without token
            res.status(201).json({
                _id:newUser._id,
                email:newUser.email,
                message:"User created successfully!"
            })
    }catch(err){
        console.log(err)
        return res.status(500).json({message:"Internal server error"})
    }
    }

    // Login user
    const loginUser = async(req,res)=>{
        try{
            const {email,password}= req.body
            if(!email || !password){
                return res.status(400).json({message:"all fields are required"})
            }
            const user = await User.findOne({email:email.toLowerCase()})
            if(!user){
                return res.status(400).json({message:"User not found"})
            } 
            const isMatch = await bcrypt.compare(password,user.password)  
            if(!isMatch){
                return res.status(400).json({message:"Password is incorrect"})
            }
            // res.status(200).json({
            //     _id:user._id,
            //     email:user.email.toLowerCase(),
            //     token:generateToken(user._id)
            // })
            const token = generateToken(user._id)
            res.cookie('token',token,{
                httpOnly:true,
                secure:process.env.NODE_ENV === 'production',
                sameSite:'lax',
                maxAge: 5 * 24 * 60 * 60 * 1000 // 5 days
            })
            // Seend res without token
            res.status(200).json({
                _id:user._id,
                email:user.email.toLowerCase(),
                message:"Login successful!"
            })

        }catch(err){
            console.log(err)
            return res.status(500).json({message:"Internal server error"})
        }
    }

    const getMe = async (req,res) => {
        try{
            const user = await User.findById(req.user.id)

            if(!user){
                return res.status(404).json({message:'User not found'})
            }

        return res.status(200).json({
         user: {
           _id:user._id,
           email:user.email,
           name:user.name    
         },
        message: 'User retrieved successfully' })
        }catch(err){
            console.log(err)
            return res.status(500).json({message:"Internal server error"})
        }
    }

    //    Logout
    const logoutUser = async(req,res) => {
        try{
            res.clearCookie('token', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax'
            })
            res.status(200).json({message:'Logout successful'})
        }catch(err){
        console.log(err)
        return res.status(500).json({message:"Internal server error"})
        }
    }

    // Upload image
    const uploadProfile = async(req,res)=>{
        try{
         const result = await cloudinary.uploader.upload(req.file.path) 
         const user = await User.findByIdAndUpdate(req.user.id,{
            profileImage: result.secure_url
         },{new:true}).select('-password')    // this is user so that password is not in response
         res.json(({user,message:"Profile image uploaded successfully!"}))

        }catch(err){
           console.log(err)
           return res.status(400).json({message:"Bad request"})
        }
    }

    module.exports ={createUser, loginUser, getMe, logoutUser,uploadProfile}