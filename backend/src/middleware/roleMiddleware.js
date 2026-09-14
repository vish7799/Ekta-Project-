const ApiError = require('../utils/apiError');

/**
 * Role-Based Access Control (RBAC) Middleware
 * @param  {...string} allowedRoles
 */
const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new ApiError(401, 'Authentication required before checking roles.'));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(new ApiError(403, `User role '${req.user.role}' is not authorized to perform this action.`));
    }

    next();
  };
};

module.exports = { authorize };
