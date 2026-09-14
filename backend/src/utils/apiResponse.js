/**
 * Standard API Response Formatter
 */
const sendResponse = (res, statusCode, message, data = null, meta = null) => {
  const response = {
    success: statusCode >= 200 && statusCode < 300,
    message,
    ...(data !== null && { data }),
    ...(meta !== null && { meta }),
  };
  return res.status(statusCode).json(response);
};

module.exports = { sendResponse };
