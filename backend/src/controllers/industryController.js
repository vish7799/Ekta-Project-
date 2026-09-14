const Industry = require('../models/Industry');
const ApiError = require('../utils/apiError');
const { sendResponse } = require('../utils/apiResponse');
const slugify = require('../utils/slugify');

const INDUSTRY_FIELDS = [
  'name',
  'slug',
  'shortDescription',
  'overview',
  'solutionsProvided',
  'icon',
  'featuredImage',
  'displayOrder',
  'status',
  'seo',
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

// Public: Get published industries
const getPublishedIndustries = async (req, res, next) => {
  try {
    const industries = await Industry.find({ status: 'published' })
      .populate('featuredImage')
      .sort({ displayOrder: 1, createdAt: -1 });

    return sendResponse(
      res,
      200,
      'Published industries fetched successfully',
      industries
    );
  } catch (error) {
    next(error);
  }
};

// Public: Get industry by slug
const getIndustryBySlug = async (req, res, next) => {
  try {
    const industry = await Industry.findOne({
      slug: req.params.slug,
      status: 'published',
    }).populate('featuredImage');

    if (!industry) {
      return next(new ApiError(404, 'Industry not found'));
    }

    return sendResponse(
      res,
      200,
      'Industry details fetched successfully',
      industry
    );
  } catch (error) {
    next(error);
  }
};

// Admin: Get all industries
const getAllIndustriesAdmin = async (req, res, next) => {
  try {
    const industries = await Industry.find().sort({
      displayOrder: 1,
      createdAt: -1,
    });

    return sendResponse(
      res,
      200,
      'All industries fetched successfully',
      industries
    );
  } catch (error) {
    next(error);
  }
};

// Admin: Create industry
const createIndustry = async (req, res, next) => {
  try {
    const data = pickAllowedFields(req.body, INDUSTRY_FIELDS);

    if (data.slug) {
      data.slug = slugify(data.slug);
    } else if (data.name) {
      data.slug = slugify(data.name);
    }

    const existing = await Industry.findOne({ slug: data.slug });

    if (existing) {
      return next(
        new ApiError(
          400,
          `Industry with slug '${data.slug}' already exists.`
        )
      );
    }

    if (data.displayOrder === undefined) {
      data.displayOrder = 0;
    }

    if (data.status === undefined) {
      data.status = 'draft';
    }

    const industry = await Industry.create(data);

    return sendResponse(
      res,
      201,
      'Industry created successfully',
      industry
    );
  } catch (error) {
    next(error);
  }
};

// Admin: Update industry
const updateIndustry = async (req, res, next) => {
  try {
    const updateData = pickAllowedFields(req.body, INDUSTRY_FIELDS);

    if (Object.prototype.hasOwnProperty.call(updateData, 'slug')) {
      updateData.slug = slugify(updateData.slug);
    }

    if (
      !Object.prototype.hasOwnProperty.call(updateData, 'slug') &&
      Object.prototype.hasOwnProperty.call(updateData, 'name')
    ) {
      updateData.slug = slugify(updateData.name);
    }

    if (Object.keys(updateData).length === 0) {
      return next(
        new ApiError(400, 'No valid industry fields provided for update.')
      );
    }

    if (updateData.slug) {
      const existing = await Industry.findOne({
        slug: updateData.slug,
        _id: { $ne: req.params.id },
      });

      if (existing) {
        return next(
          new ApiError(
            400,
            `Industry with slug '${updateData.slug}' already exists.`
          )
        );
      }
    }

    const industry = await Industry.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!industry) {
      return next(new ApiError(404, 'Industry not found'));
    }

    return sendResponse(
      res,
      200,
      'Industry updated successfully',
      industry
    );
  } catch (error) {
    next(error);
  }
};

// Admin: Delete industry
const deleteIndustry = async (req, res, next) => {
  try {
    const industry = await Industry.findByIdAndDelete(req.params.id);

    if (!industry) {
      return next(new ApiError(404, 'Industry not found'));
    }

    return sendResponse(res, 200, 'Industry deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPublishedIndustries,
  getIndustryBySlug,
  getAllIndustriesAdmin,
  createIndustry,
  updateIndustry,
  deleteIndustry,
};