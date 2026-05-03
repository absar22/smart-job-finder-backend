const express = require('express')
const router = express.Router()

const {fetchAndStoreJobs, getJobs, getJobsBySlug, getJobsPaginated,createJobs,deleteJob} = require('../controllers/jobController')
router.get('/fetch', fetchAndStoreJobs)
router.get('/', getJobsPaginated)
router.get('/:slug', getJobsBySlug)
router.post('/', createJobs)
router.delete('/:id', deleteJob)

module.exports = router