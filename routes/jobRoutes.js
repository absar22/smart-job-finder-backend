const express = require('express')
const router = express.Router()

const {fetchAndStoreJobs, getJobs, getJobsBySlug} = require('../controllers/jobController')
router.get('/fetch', fetchAndStoreJobs)
router.get('/', getJobs)
router.get('/:slug', getJobsBySlug)
module.exports = router