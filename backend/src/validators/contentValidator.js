const validator = require('validator');

const validateServiceInput = (data) => {
  const errors = [];
  const title = data.title ? String(data.title).trim() : '';
  const shortDescription = data.shortDescription ? String(data.shortDescription).trim() : '';

  if (validator.isEmpty(title)) {
    errors.push('Service title is required.');
  }

  if (validator.isEmpty(shortDescription)) {
    errors.push('Short description is required.');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

const validateProjectInput = (data) => {
  const errors = [];
  const title = data.title ? String(data.title).trim() : '';

  if (validator.isEmpty(title)) {
    errors.push('Project title is required.');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

module.exports = { validateServiceInput, validateProjectInput };
