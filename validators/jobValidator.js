const Joi = require('joi');

const createJobSchema = Joi.object({
  title: Joi.string().required().messages({
    'string.empty': 'Job title is required'
  }),
  company: Joi.string().required().messages({
    'string.empty': 'Company name is required'
  }),
  location: Joi.string().required().messages({
    'string.empty': 'Location is required'
  }),
  description: Joi.string().required().messages({
    'string.empty': 'Description is required'
  }),
  salary: Joi.string().required().messages({
    'string.empty': 'Salary is required'
  }),
  jobType: Joi.string().valid('Full-time', 'Part-time', 'Contract', 'Internship', 'Remote').required().messages({
    'any.only': 'Invalid job type',
    'string.empty': 'Job type is required'
  }),
  requirements: Joi.alternatives().try(
    Joi.array().items(Joi.string()),
    Joi.string()
  ).required().messages({
    'any.required': 'Requirements are required'
  }),
  responsibilities: Joi.alternatives().try(
    Joi.array().items(Joi.string()),
    Joi.string()
  ).optional()
});

module.exports = {
  createJobSchema
};
