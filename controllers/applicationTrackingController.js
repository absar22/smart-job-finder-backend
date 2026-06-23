const ApplicationTracking = require('../models/ApplicationTracking')
const Job = require('../models/Jobs')
const mongoose = require('mongoose')
// const user = require('../models/User')



const jobApplicationTracking = async(req,res,next) => {
    try{
        const {jobId} = req.body

         if(!mongoose.Types.ObjectId.isValid(jobId)){
    return res.status(400).json({message:"Invalid Job ID"})
}
        if(!jobId){
            return res.status(400).json({message:"Job ID is required"})
        }

        const job = await Job.findById(jobId)
        if(!job){
            return res.status(404).json({message:"Job not found"})
        }
        
        const existing = await ApplicationTracking.findOne({
            user:req.user.id,
            job:jobId,
            status:"applied"
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
           return res.status(200).json({message:"No applications found", data:[]})
       }
       return res.status(200).json({message:"Applications fetched successfully", data:applications})        
      
    }catch(err){
        next(err)
    }
  }

  const updateApplicationStatus = async(req,res,next) => {
    try{
      const {id} = req.params
      const{status} = req.body
      const options = [ 'applied','interviewing','offered','rejected']
       if(!options.includes(status)){
          return res.status(400).json({message:'Invalid status'})
       }
       const loggedUser = await ApplicationTracking.findOneAndUpdate({
        user:req.user.id ,
        _id: id,
        },{
         status
    },{
        new:true
    })
    if(!loggedUser){
        return res.status(404).json({message:'Application not found'})
    }
    return res.status(200).json({message:"User has succesfully update the status" , data:loggedUser})
    }catch(err){
        next(err)
    }
  }

  const deleteApplication = async(req,res,next) => {
    try{
        const {id} = req.params
        if(!id){
            return res.status(400).json({message:"Application not found"})
        }
     const applicationToDelete = await ApplicationTracking.findOneAndDelete({
        _id:id,
        user:req.user.id
     })
     if(!applicationToDelete){
   return res.status(404).json({
      message:"Application not found"
   })
}
     return res.status(200).json({message:"Succussefuly deleted the application", data:applicationToDelete})
    }
    catch(err){
        next(err)
    }
  }
module.exports = { jobApplicationTracking,getApplications, updateApplicationStatus,deleteApplication }