
const express = require('express');
const connectDB = require('./config/database')
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

app.get('/about', (req, res) => {
    res.send('About Us')
})
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
