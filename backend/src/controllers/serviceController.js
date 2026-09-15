const Service = require('../models/Service');
const ApiError = require('../utils/apiError');
const { sendResponse } = require('../utils/apiResponse');
const slugify = require('../utils/slugify');

const SERVICE_FIELDS = [
  'title',
  'slug',
  'shortDescription',
  'fullDescription',
  'icon',
  'featuredImage',
  'gallery',
  'keyFeatures',
  'specifications',
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

// Public: Get published services
const getPublishedServices = async (req, res, next) => {
  try {
    const services = await Service.find({ status: 'published' })
      .populate('featuredImage')
      .populate('gallery')
      .sort({ displayOrder: 1, createdAt: -1 });

    return sendResponse(
      res,
      200,
      'Published services fetched successfully',
      services
    );
  } catch (error) {
    next(error);
  }
};

// Public: Get service by slug
const getServiceBySlug = async (req, res, next) => {
  try {
    const service = await Service.findOne({
      slug: req.params.slug,
      status: 'published',
    }).populate('featuredImage').populate('gallery');

    if (!service) {
      return next(new ApiError(404, 'Service not found'));
    }

    return sendResponse(
      res,
      200,
      'Service details fetched successfully',
      service
    );
  } catch (error) {
    next(error);
  }
};

// Admin: Get all services
const getAllServicesAdmin = async (req, res, next) => {
  try {
    const services = await Service.find()
      .populate('featuredImage')
      .populate('gallery')
      .sort({ displayOrder: 1, createdAt: -1 });

    return sendResponse(
      res,
      200,
      'All services fetched successfully',
      services
    );
  } catch (error) {
    next(error);
  }
};

// Admin: Create service
const createService = async (req, res, next) => {
  try {
    const data = pickAllowedFields(req.body, SERVICE_FIELDS);

    if (data.slug) {
      data.slug = slugify(data.slug);
    } else if (data.title) {
      data.slug = slugify(data.title);
    }

    const existing = await Service.findOne({ slug: data.slug });

    if (existing) {
      return next(
        new ApiError(
          400,
          `Service with slug '${data.slug}' already exists.`
        )
      );
    }

    if (data.displayOrder === undefined) {
      data.displayOrder = 0;
    }

    if (data.status === undefined) {
      data.status = 'draft';
    }

    const service = await Service.create(data);

    return sendResponse(
      res,
      201,
      'Service created successfully',
      service
    );
  } catch (error) {
    next(error);
  }
};

// Admin: Update service
const updateService = async (req, res, next) => {
  try {
    const updateData = pickAllowedFields(req.body, SERVICE_FIELDS);

    if (Object.prototype.hasOwnProperty.call(updateData, 'slug')) {
      updateData.slug = slugify(updateData.slug);
    }

    if (
      !Object.prototype.hasOwnProperty.call(updateData, 'slug') &&
      Object.prototype.hasOwnProperty.call(updateData, 'title')
    ) {
      updateData.slug = slugify(updateData.title);
    }

    if (Object.keys(updateData).length === 0) {
      return next(
        new ApiError(400, 'No valid service fields provided for update.')
      );
    }

    if (updateData.slug) {
      const existing = await Service.findOne({
        slug: updateData.slug,
        _id: { $ne: req.params.id },
      });

      if (existing) {
        return next(
          new ApiError(
            400,
            `Service with slug '${updateData.slug}' already exists.`
          )
        );
      }
    }

    const service = await Service.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!service) {
      return next(new ApiError(404, 'Service not found'));
    }

    return sendResponse(
      res,
      200,
      'Service updated successfully',
      service
    );
  } catch (error) {
    next(error);
  }
};

// Admin: Delete service
const deleteService = async (req, res, next) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);

    if (!service) {
      return next(new ApiError(404, 'Service not found'));
    }

    return sendResponse(res, 200, 'Service deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPublishedServices,
  getServiceBySlug,
  getAllServicesAdmin,
  createService,
  updateService,
  deleteService,
};