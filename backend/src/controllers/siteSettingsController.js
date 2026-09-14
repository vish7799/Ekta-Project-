const SiteSettings = require('../models/SiteSettings');
const ApiError = require('../utils/apiError');
const { sendResponse } = require('../utils/apiResponse');

const SITE_SETTINGS_FIELDS = [
  'companyName',
  'tagline',
  'corporateAddress',
  'primaryPhone',
  'emergencyPhone',
  'email',
  'businessHours',
  'socialLinks',
  'seoDefaults',
];

const pickAllowedFields = (body, fields) => {
  const data = {};

  for (const field of fields) {
    if (Object.prototype.hasOwnProperty.call(body, field)) {
      data[field] = body[field];
    }
  }

  return data;
};

// Public/Admin: Get singleton site settings
const getSiteSettings = async (req, res, next) => {
  try {
    let settings = await SiteSettings.findOne();

    if (!settings) {
      settings = await SiteSettings.create({});
    }

    return sendResponse(
      res,
      200,
      'Site settings fetched successfully',
      settings
    );
  } catch (error) {
    next(error);
  }
};

// Admin: Update site settings
const updateSiteSettings = async (req, res, next) => {
  try {
    const updateData = pickAllowedFields(
      req.body,
      SITE_SETTINGS_FIELDS
    );

    if (Object.keys(updateData).length === 0) {
      return next(
        new ApiError(
          400,
          'No valid site settings fields provided for update.'
        )
      );
    }

    let settings = await SiteSettings.findOne();

    if (!settings) {
      settings = new SiteSettings(updateData);
    } else {
      for (const [field, value] of Object.entries(updateData)) {
        settings[field] = value;
      }
    }

    await settings.save();

    return sendResponse(
      res,
      200,
      'Site settings updated successfully',
      settings
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSiteSettings,
  updateSiteSettings,
};