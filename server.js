
const express = require('express');
const connectDB = require('./config/database')
const Job = require('./models/Jobs')
const jobRoutes = require('./routes/jobRoutes')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const PORT = process.env.PORT

connectDB();


app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.get('/' , (req,res) => {
 res.send('hello World')
})

app.get('/test-jobs', async(req,res) => {
    try{
        const jobs = await Job.create({
            title: "Software Engineer",
            company: "Tech Corp",
            location: "New York",
            salary: 120000,
            description: "Develop and maintain web applications.",
            skills: ["JavaScript", "React", "Node.js"]
        })
    }catch(error){
        console.error("Error creating job:", error);
        res.status(500).send("Internal Server Error");
    }
})
app.get('/jobs', async(req,res) => {
    try{
        const jobs = await Job.find();
        res.json(jobs);
    }catch(error){
        console.error("Error fetching jobs:", error);
        res.status(500).send("Internal Server Error");
    }
})

app.use('/api/jobs', jobRoutes);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
