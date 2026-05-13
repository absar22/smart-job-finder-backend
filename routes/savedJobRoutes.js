const express = require('express')
const router = express.Router()
const {saveJob, removeSavedJob, getSavedJob} = require('../controllers/savedJobsController') 
const protect = require('../middleware/authMiddleware')
router.post('/save', protect, saveJob)
router.delete('/remove', protect, removeSavedJob)
router.get('/', protect, getSavedJob)

module.exports = router