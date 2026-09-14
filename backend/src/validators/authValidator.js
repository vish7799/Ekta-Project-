const validator = require('validator');

const validateLoginInput = (data) => {
  const errors = [];
  const email = data.email ? String(data.email).trim() : '';
  const password = data.password ? String(data.password) : '';

  if (validator.isEmpty(email)) {
    errors.push('Email address is required.');
  } else if (!validator.isEmail(email)) {
    errors.push('Please enter a valid email address.');
  }

  if (validator.isEmpty(password)) {
    errors.push('Password is required.');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

module.exports = { validateLoginInput };
