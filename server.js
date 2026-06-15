const dotenv = require('dotenv')
dotenv.config()
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database')
const Job = require('./models/Jobs')
const jobRoutes = require('./routes/jobRoutes')
const authRoutes = require('./routes/authRoutes')
const savedJobRoutes = require('./routes/savedJobRoutes')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const logger = require('morgan')
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const errorHandler = require('./middleware/errorHandler')
const applicationRoutes = require('./routes/applicationRoutes')

const app = express()

const PORT = process.env.PORT

connectDB();



app.use(cors({
    origin: [process.env.CORS_ORIGIN, "http://localhost:3000"],
    credentials: true
}));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(helmet())
app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests, please try again later.'
}));
app.use(logger('dev'));


// Routes
app.use('/api/jobs', jobRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/saved-jobs', savedJobRoutes);
app.use('/api/applications', applicationRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));   // this is for later
// 404 Catch-All
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
    console.log(`API URL: http://localhost:${PORT}`)
})
