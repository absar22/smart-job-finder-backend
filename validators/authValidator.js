const Joi = require('joi');

const signupSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Name is required'
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Invalid email format',
    'string.empty': 'Email is required'
  }),
  password: Joi.string().min(8).required().messages({
    'string.min': 'Password must be at least 8 characters long',
    'string.empty': 'Password is required'
  }),
  role: Joi.string().valid('user', 'admin').optional()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Invalid email format',
    'string.empty': 'Email is required'
  }),
  password: Joi.string().required().messages({
    'string.empty': 'Password is required'
  })
});

const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Invalid email format',
    'string.empty': 'Email is required'
  })
});

const resetPasswordSchema = Joi.object({
  password: Joi.string().min(8).required().messages({
    'string.min': 'Password must be at least 8 characters long',
    'string.empty': 'Password is required'
  }),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.only': 'Passwords do not match',
    'string.empty': 'Confirm Password is required'
  })
});

module.exports = {
  signupSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema
};
