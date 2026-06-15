const ApplicationTracking = require('../models/ApplicationTracking')
const Job = require('../models/Jobs')

const jobApplicationTracking = async(req,res,next) => {
    try{
        const {jobId} = req.body
        
        if(!jobId){
            return res.status(400).json({message:"Job ID is required"})
        }

        const job = await Job.findById(jobId)
        if(!job){
            return res.status(404).json({message:"Job not found"})
        }
        
        const existing = await ApplicationTracking.findOne({
            user:req.user.id,
            job:jobId
        })
        if(existing){
            return res.status(409).json({message:"You have already applied for this job"})
        }
        const createApplication = await ApplicationTracking.create({
            user:req.user.id,
            job:jobId
        })
        return res.status(201).json({message:"Application created successfully", data:createApplication})
    }catch(err){
        next(err)
    }

}

const getApplications = async(req,res,next)=> {
    try{
       const applications = await ApplicationTracking.find({user:req.user.id}).populate('job')
       if(!applications || applications.length === 0){
           return res.status(204).json({message:"No applications found", data:[]})
       }
       return res.status(200).json({message:"Applications fetched successfully", data:applications})        
      
    }catch(err){
        next(err)
    }
  }

module.exports = { jobApplicationTracking,getApplications }