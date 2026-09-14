const ApiError = require('../utils/apiError');

/**
 * Request validation runner middleware using schema function
 * @param {Function} validatorFn
 */
const validate = (validatorFn) => {
  return (req, res, next) => {
    const { isValid, errors } = validatorFn(req.body);
    if (!isValid) {
      return next(new ApiError(400, 'Invalid request data.', errors));
    }
    next();
  };
};

module.exports = validate;
