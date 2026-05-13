
const SavedJobs = require('../models/SavedJobs')
const Jobs = require('../models/Jobs')

const saveJob = async(req,res) => {
    console.log(req.user)
    const {jobId} = req.body
    try{
     const job = await Jobs.findById(jobId)
     if(!job){
        return res.status(404).json({message:"job not found"})

     }
     const alreadySaved = await SavedJobs.findOne({
      
        user:req.user.id,
        job:job.id
     
     })

     if(alreadySaved){
        return res.status(409).json({message:"job already saved"})
     }
     const savedJob = await SavedJobs.create({
        
        user:req.user.id,
        job:job.id
     })
     
     res.status(201).json({message:"job saved successfully"})
    }catch(err){
       console.error(err)
       res.status(500).json({message:"internal server error"})
    }
}

const removeSavedJob = async(req,res) => {
    const {jobId} = req.body
    try{
        const savedJob = await SavedJobs.findOneAndDelete({
            user:req.user.id,
            job:jobId
        })
        if(!savedJob){
            return res.status(404).json({message:"saved job not found"})
        }
        
        return res.status(200).json({message:"saved job removed successfully"})
    }catch(err){
        console.log(err)
        return res.status(500).json({message:"internal server error"})
    }
}

const getSavedJob = async(req,res) => {
    try{
       const getJobs = await SavedJobs.find({
        user:req.user.id
        
       }).populate('job').sort({createdAt:-1})
       return res.status(200).json(getJobs)
    }catch(err){
        console.log(err)
        return res.status(500).json({message:"internal server error"})
    }
}

module.exports = { saveJob, removeSavedJob, getSavedJob }