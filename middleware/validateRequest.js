const validateRequest = (schema, property = 'body') => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property], { abortEarly: false });
    
    if (error) {
      const errors = {};
      error.details.forEach(detail => {
        errors[detail.context.key] = detail.message;
      });
      
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors
      });
    }
    next();
  };
};

module.exports = validateRequest;
