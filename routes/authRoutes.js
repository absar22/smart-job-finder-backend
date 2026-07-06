const express = require('express')
const router = express.Router()
const rateLimit =require('express-rate-limit')
const protect = require('../middleware/authMiddleware')
const upload = require('../middleware/upload')
const {createUser, loginUser,getMe,logoutUser,uploadProfile,createForgotPassword, resetPassword} = require('../controllers/authController')
const authRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20, // Limit each IP to 20 requests per windowMs
    message: 'Too many requests, please try again later.'
})

router.post('/signup', authRateLimiter, createUser)
router.post('/login', authRateLimiter, loginUser)
router.get('/me', protect, getMe)
router.post('/logout', protect, logoutUser)
router.put('/upload-profile', protect, upload.single('image'), uploadProfile)
router.post('/forgot-password', authRateLimiter, createForgotPassword)
router.patch('/reset-password/:token', authRateLimiter, resetPassword)

module.exports = router