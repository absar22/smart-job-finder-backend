const express = require('express')
const router = express.Router()

const {fetchAndStoreJobs} = require('../controllers/jobController')
router.get('/fetch', fetchAndStoreJobs)
module.exports = router