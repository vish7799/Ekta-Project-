const validateSiteSettingsInput = (data) => {
  const errors = [];
  const companyName = data.companyName ? String(data.companyName).trim() : '';

  if (!companyName) {
    errors.push('Company name cannot be empty.');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

module.exports = { validateSiteSettingsInput };
