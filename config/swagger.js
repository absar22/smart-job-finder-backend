const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Smart Job Finder API',
      version: '1.0.0',
      description: 'API documentation for Smart Job Finder',
    },
    servers: [
      {
        url: 'http://localhost:8000/api',
        description: 'Local Development',
      },
      {
        url: 'https://smart-job-finder-backend-git-main-absar22s-projects.vercel.app/api',
        description: 'Production',
      },
    ]
  },

  apis: [
    './routes/*.js',           // if routes are in /routes/
    './routes/**/*.js',        // if nested like /routes/authRoutes.js
    './controllers/*.js',      // if you define handlers here with JSDoc
  ],
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;