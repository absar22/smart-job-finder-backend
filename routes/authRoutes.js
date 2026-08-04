const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const protect = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');
const { createUser, loginUser, getMe, logoutUser, uploadProfile, createForgotPassword, resetPassword } = require('../controllers/authController');
const validateRequest = require('../middleware/validateRequest');
const { signupSchema, loginSchema, forgotPasswordSchema, resetPasswordSchema } = require('../validators/authValidator');

const authRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    message: 'Too many requests, please try again later.'
});

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication and user management
 */

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 6
 *                 example: secret123
 *               role:
 *                 type: string
 *                 enum: [user, admin]
 *                 example: user
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *       400:
 *         description: Validation error or user already exists
 *       429:
 *         description: Too many requests
 */
router.post('/signup', authRateLimiter, validateRequest(signupSchema), createUser);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login existing user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: secret123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *       401:
 *         description: Invalid credentials
 *       429:
 *         description: Too many requests
 */
router.post('/login', authRateLimiter, validateRequest(loginSchema), loginUser);

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Get current logged-in user
 *     tags: [Auth]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Current user data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 user:
 *                   type: object
 *       401:
 *         description: Not authenticated
 */
router.get('/me', protect, getMe);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout user and clear cookie
 *     tags: [Auth]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Logged out successfully
 *       401:
 *         description: Not authenticated
 */
router.post('/logout', protect, logoutUser);

/**
 * @swagger
 * /auth/upload-profile:
 *   put:
 *     summary: Upload profile picture
 *     tags: [Auth]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - image
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Profile image file (jpg, png)
 *     responses:
 *       200:
 *         description: Profile updated
 *       400:
 *         description: No file uploaded
 *       401:
 *         description: Not authenticated
 */
router.put('/upload-profile', protect, upload.single('image'), uploadProfile);

/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: Send password reset email
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@example.com
 *     responses:
 *       200:
 *         description: Reset email sent
 *       404:
 *         description: User not found
 *       429:
 *         description: Too many requests
 */
router.post('/forgot-password', authRateLimiter, validateRequest(forgotPasswordSchema), createForgotPassword);

/**
 * @swagger
 * /auth/reset-password/{token}:
 *   patch:
 *     summary: Reset password using token from email
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Reset token from email link
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *             properties:
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 6
 *                 example: newpassword123
 *     responses:
 *       200:
 *         description: Password reset successful
 *       400:
 *         description: Invalid or expired token
 *       429:
 *         description: Too many requests
 */
router.patch('/reset-password/:token', authRateLimiter, validateRequest(resetPasswordSchema), resetPassword);

module.exports = router;