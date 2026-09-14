const ApiError = require('../utils/apiError');

/**
 * Centralized Error Handling Middleware
 */
const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message || 'Internal Server Error';
  error.statusCode = err.statusCode || 500;

  // Always log full error details on the server.
  // Never expose stack traces to API clients.
  console.error(
    `[API Error] ${req.method} ${req.originalUrl}:`,
    err
  );

  // Mongoose CastError (invalid ObjectId)
  if (err.name === 'CastError') {
    error = new ApiError(
      400,
      `Resource not found. Invalid ${err.path}: ${err.value}`
    );
  }

  // Mongoose Duplicate Key Error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'field';

    error = new ApiError(
      400,
      `A record with this ${field} already exists.`
    );
  }

  // Mongoose ValidationError
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(
      (val) => val.message
    );

    error = new ApiError(
      400,
      `Validation Error: ${messages.join('. ')}`,
      messages
    );
  }

  const response = {
    success: false,
    message: error.message,
  };

  if (error.errors && error.errors.length > 0) {
    response.errors = error.errors;
  }

  res.status(error.statusCode).json(response);
};

module.exports = errorHandler;