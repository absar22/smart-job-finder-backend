const express = require('express')
const router = express.Router()
const {jobApplicationTracking, getApplications}  = require('../controllers/applicationTrackingController')
const protect = require('../middleware/authMiddleware')

router.post('/', protect, jobApplicationTracking)
router.get('/',protect, getApplications)

module.exports = router