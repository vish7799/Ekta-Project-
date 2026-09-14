const Testimonial = require('../models/Testimonial');
const ApiError = require('../utils/apiError');
const { sendResponse } = require('../utils/apiResponse');

const TESTIMONIAL_FIELDS = [
  'clientName',
  'designation',
  'companyName',
  'statement',
  'rating',
  'avatar',
  'projectRef',
  'displayOrder',
  'status',
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

// Public: Get published testimonials
const getPublishedTestimonials = async (req, res, next) => {
  try {
    const testimonials = await Testimonial.find({ status: 'published' })
      .populate('avatar')
      .populate('projectRef', 'title slug')
      .sort({ displayOrder: 1, createdAt: -1 });

    return sendResponse(
      res,
      200,
      'Published testimonials fetched successfully',
      testimonials
    );
  } catch (error) {
    next(error);
  }
};

// Admin: Get all testimonials
const getAllTestimonialsAdmin = async (req, res, next) => {
  try {
    const testimonials = await Testimonial.find()
      .populate('avatar')
      .populate('projectRef', 'title')
      .sort({ displayOrder: 1, createdAt: -1 });

    return sendResponse(
      res,
      200,
      'All testimonials fetched successfully',
      testimonials
    );
  } catch (error) {
    next(error);
  }
};

// Admin: Create testimonial
const createTestimonial = async (req, res, next) => {
  try {
    const testimonialData = pickAllowedFields(
      req.body,
      TESTIMONIAL_FIELDS
    );

    const testimonial = await Testimonial.create(testimonialData);

    return sendResponse(
      res,
      201,
      'Testimonial created successfully',
      testimonial
    );
  } catch (error) {
    next(error);
  }
};

// Admin: Update testimonial
const updateTestimonial = async (req, res, next) => {
  try {
    const updateData = pickAllowedFields(
      req.body,
      TESTIMONIAL_FIELDS
    );

    if (Object.keys(updateData).length === 0) {
      return next(
        new ApiError(
          400,
          'No valid testimonial fields provided for update.'
        )
      );
    }

    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!testimonial) {
      return next(new ApiError(404, 'Testimonial not found'));
    }

    return sendResponse(
      res,
      200,
      'Testimonial updated successfully',
      testimonial
    );
  } catch (error) {
    next(error);
  }
};

// Admin: Delete testimonial
const deleteTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);

    if (!testimonial) {
      return next(new ApiError(404, 'Testimonial not found'));
    }

    return sendResponse(
      res,
      200,
      'Testimonial deleted successfully'
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPublishedTestimonials,
  getAllTestimonialsAdmin,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
};