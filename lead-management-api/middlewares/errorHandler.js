const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    
    let error = { ...err };
    error.message = err.message;
  
    // Mongoose bad ObjectId
    if (err.name === 'CastError') {
      const message = `Resource not found with id of ${err.value}`;
      return res.status(404).json({ success: false, message });
    }
  
    // Mongoose validation error
    if (err.name === 'ValidationError') {
      const message = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({ success: false, message });
    }
  
    res.status(error.statusCode || 500).json({
      success: false,
      error: error.message || 'Server Error'
    });
  };
  
  module.exports = errorHandler;