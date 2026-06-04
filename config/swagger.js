const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Smart Job Finder API",
      version: "1.0.0",
      description: "API documentation for Smart Job Finder",
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = swaggerSpec;