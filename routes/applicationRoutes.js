const express = require('express')
const router = express.Router()
const {jobApplicationTracking, getApplications,updateApplicationStatus,deleteApplication}  = require('../controllers/applicationTrackingController')
const protect = require('../middleware/authMiddleware')

router.post('/', protect, jobApplicationTracking)
router.get('/',protect, getApplications)
router.patch('/:id',protect,updateApplicationStatus)
router.delete('/:id',protect,deleteApplication)

module.exports = router