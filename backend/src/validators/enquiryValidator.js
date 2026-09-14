const validator = require('validator');

const validateEnquiryInput = (data) => {
  const errors = [];
  const fullName = data.fullName ? String(data.fullName).trim() : '';
  const email = data.email ? String(data.email).trim() : '';
  const phone = data.phone ? String(data.phone).trim() : '';
  const subject = data.subject ? String(data.subject).trim() : '';
  const message = data.message ? String(data.message).trim() : '';

  if (validator.isEmpty(fullName)) {
    errors.push('Full name is required.');
  }

  if (validator.isEmpty(email)) {
    errors.push('Email address is required.');
  } else if (!validator.isEmail(email)) {
    errors.push('Please enter a valid email address.');
  }

  if (validator.isEmpty(phone)) {
    errors.push('Phone number is required.');
  }

  if (validator.isEmpty(subject)) {
    errors.push('Enquiry subject is required.');
  }

  if (validator.isEmpty(message)) {
    errors.push('Message body is required.');
  } else if (message.length < 10) {
    errors.push('Message body must be at least 10 characters long.');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

module.exports = { validateEnquiryInput };
