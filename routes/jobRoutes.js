const express = require('express')
const router = express.Router()

const {fetchAndStoreJobs, getJobs, getJobsBySlug, getJobsPaginated,createJobs,deleteJob} = require('../controllers/jobController')
const protect = require('../middleware/authMiddleware')
router.get('/fetch', fetchAndStoreJobs)
router.get('/', getJobsPaginated)
router.get('/:slug', getJobsBySlug)
router.post('/', protect, createJobs)
router.delete('/:id', protect, deleteJob)

module.exports = router