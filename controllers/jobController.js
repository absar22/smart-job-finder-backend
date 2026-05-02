const Jobs = require('../models/Jobs')
const fetchJobs = require('../utils/fetchJobs')


const fetchAndStoreJobs = async (req,res) => {
    try{
        const jobs = await fetchJobs()
        let newJobsCount = 0
        for(const job of jobs){
            const existingJob = await Jobs.findOne({link:job.link})
            if(!existingJob){
              const slug = `${job.title}-${job.company}`
              .toLowerCase().replaceAll(',', '').replaceAll('.', '').split(' ').join('-') 
              await Jobs.create({...job, slug})
              newJobsCount++
            }
       
        }
        res.json({ message: "Fetch completed", newJobsCount })
    }catch(error){
        console.error("Error storing jobs:", error);
        res.status(500).send("Internal Server Error");
    }
}

const getJobs = async (req,res) => {
    try{
        const jobs = await Jobs.find().sort({createdAt: -1})  
        res.status(200).json({
            jobs,
        })
    }catch(error){
        console.error("Error fetching jobs:", error);
        res.status(500).send("Internal Server Error");
    }
}

const getJobsBySlug = async (req,res) => {
    try{
        const {slug} = req.params
        const job = await Jobs.findOne({slug})
            if(!job){
                return res.status(400).json({message:'Jobs not found'})
            }
        res.status(200).json({job})
    }catch(error){
        console.error("Error fetching job by slug:", error);
        res.status(500).send("Internal Server Error");
    }
}
// Pagination

const getJobsPaginated = async (req,res) => {
    try{
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit)|| 10
        const skip =(page - 1) * limit
        const jobs = await Jobs.find().sort({createdAt:-1}).skip(skip).limit(limit)
        const totalJobs = await Jobs.countDocuments()
        res.status(200).json({
            jobs,
            totalJobs,
            totalPages: Math.ceil(totalJobs / limit),
            currentPage: page
        })



    }catch(error){
        console.error('Error fetching paginated jobs', error)
        res.status(500).send('Internal Server Error')
    }
}



module.exports = {fetchAndStoreJobs, getJobs, getJobsBySlug, getJobsPaginated   }