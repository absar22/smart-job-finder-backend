const Jobs = require('../models/Jobs')
const fetchJobs = require('../utils/fetchJobs')


const fetchAndStoreJobs = async (req,res) => {
    try{
        const jobs = await fetchJobs()
        for(const job of jobs){
            const existingJob = await Jobs.findOne({link:job.link})
            if(!existingJob){
             await Jobs.create(job)
            }
       
        }
        res.json({ message: "Jobs Stored successfully" })
    }catch(error){
        console.error("Error storing jobs:", error);
        res.status(500).send("Internal Server Error");
    }
}
module.exports = {fetchAndStoreJobs}