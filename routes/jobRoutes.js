const express = require('express')
const router = express.Router()

const {fetchAndStoreJobs, getJobs, getJobsBySlug, getJobsPaginated} = require('../controllers/jobController')
router.get('/fetch', fetchAndStoreJobs)
router.get('/', getJobsPaginated)
router.get('/:slug', getJobsBySlug)
module.exports = router