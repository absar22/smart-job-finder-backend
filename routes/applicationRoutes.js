const express = require('express')
const router = express.Router()
const { jobApplicationTracking, getApplications, updateApplicationStatus, deleteApplication } = require('../controllers/applicationTrackingController')
const protect = require('../middleware/authMiddleware')

/**
 * @swagger
 * /applications:
 *   get:
 *     summary: Get all applications
 *     tags: [Applications]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of applications
 */
/**
 * @swagger
 * /applications:
 *   post:
 *     summary: Create a new application
 *     tags: [Applications]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       201:
 *         description: Application created successfully
 */
router.post('/', protect, jobApplicationTracking)
/**
 * @swagger
 * /applications/{id}:
 *   patch:
 *     summary: Update an application
 *     tags: [Applications]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Application updated successfully
 */
router.patch('/:id', protect, updateApplicationStatus)
/**
 * @swagger
 * /applications/{id}:
 *   delete:
 *     summary: Delete an application
 *     tags: [Applications]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Application deleted successfully
 */
router.delete('/:id', protect, deleteApplication)

module.exports = router