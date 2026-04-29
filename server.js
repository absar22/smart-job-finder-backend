
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

app.use('/api/jobs', jobRoutes);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
