const mongoose = require('mongoose')

const savedJobsSchema = new mongoose.Schema({
    // Who saved it
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true 
    },
    // What they saved
    job:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Job",
        required:true
    },
    // What time it was saved
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model("SavedJobs", savedJobsSchema)