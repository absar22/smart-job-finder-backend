/**
 * @swagger
 * /test:
 *   get:
 *     summary: Test route
 *     responses:
 *       200:
 *         description: Test successful
 */
const express = require('express')
const router = express.Router()

const {fetchAndStoreJobs, getJobs, getJobsBySlug, getJobsPaginated,createJobs,deleteJob} = require('../controllers/jobController')
const protect = require('../middleware/authMiddleware')
const isAdmin = require('../middleware/adminMiddleware')
router.get('/fetch', protect, isAdmin, fetchAndStoreJobs)
router.get('/', getJobsPaginated)
router.get('/:slug', getJobsBySlug)
router.post('/', protect, isAdmin, createJobs)
router.delete('/:id', protect, isAdmin, deleteJob)

module.exports = router