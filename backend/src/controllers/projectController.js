const Project = require('../models/Project');
const ApiError = require('../utils/apiError');
const { sendResponse } = require('../utils/apiResponse');
const slugify = require('../utils/slugify');

const PROJECT_FIELDS = [
  'title',
  'slug',
  'clientName',
  'industry',
  'serviceCategory',
  'location',
  'completionDate',
  'summary',
  'description',
  'highlights',
  'featuredImage',
  'gallery',
  'isFeatured',
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

// Public: Get published projects
const getPublishedProjects = async (req, res, next) => {
  try {
    const projects = await Project.find({ status: 'published' })
      .populate('industry', 'name slug')
      .populate('serviceCategory', 'title slug')
      .populate('featuredImage')
      .populate('gallery')
      .sort({ completionDate: -1, createdAt: -1 });

    return sendResponse(
      res,
      200,
      'Published projects fetched successfully',
      projects
    );
  } catch (error) {
    next(error);
  }
};

// Public: Get project by slug
const getProjectBySlug = async (req, res, next) => {
  try {
    const project = await Project.findOne({
      slug: req.params.slug,
      status: 'published',
    })
      .populate('industry')
      .populate('serviceCategory')
      .populate('featuredImage')
      .populate('gallery');

    if (!project) {
      return next(new ApiError(404, 'Project not found'));
    }

    return sendResponse(
      res,
      200,
      'Project details fetched successfully',
      project
    );
  } catch (error) {
    next(error);
  }
};

// Admin: Get all projects
const getAllProjectsAdmin = async (req, res, next) => {
  try {
    const projects = await Project.find()
      .populate('industry', 'name')
      .populate('serviceCategory', 'title')
      .populate('featuredImage')
      .populate('gallery')
      .sort({ createdAt: -1 });

    return sendResponse(
      res,
      200,
      'All projects fetched successfully',
      projects
    );
  } catch (error) {
    next(error);
  }
};

// Admin: Create project
const createProject = async (req, res, next) => {
  try {
    const data = pickAllowedFields(req.body, PROJECT_FIELDS);

    if (data.slug) {
      data.slug = slugify(data.slug);
    } else if (data.title) {
      data.slug = slugify(data.title);
    }

    const existing = await Project.findOne({ slug: data.slug });

    if (existing) {
      return next(
        new ApiError(
          400,
          `Project with slug '${data.slug}' already exists.`
        )
      );
    }

    if (data.isFeatured === undefined) {
      data.isFeatured = false;
    }

    if (data.status === undefined) {
      data.status = 'draft';
    }

    const project = await Project.create(data);

    return sendResponse(
      res,
      201,
      'Project created successfully',
      project
    );
  } catch (error) {
    next(error);
  }
};

// Admin: Update project
const updateProject = async (req, res, next) => {
  try {
    const updateData = pickAllowedFields(req.body, PROJECT_FIELDS);

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
        new ApiError(400, 'No valid project fields provided for update.')
      );
    }

    if (updateData.slug) {
      const existing = await Project.findOne({
        slug: updateData.slug,
        _id: { $ne: req.params.id },
      });

      if (existing) {
        return next(
          new ApiError(
            400,
            `Project with slug '${updateData.slug}' already exists.`
          )
        );
      }
    }

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!project) {
      return next(new ApiError(404, 'Project not found'));
    }

    return sendResponse(
      res,
      200,
      'Project updated successfully',
      project
    );
  } catch (error) {
    next(error);
  }
};

// Admin: Delete project
const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return next(new ApiError(404, 'Project not found'));
    }

    return sendResponse(res, 200, 'Project deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPublishedProjects,
  getProjectBySlug,
  getAllProjectsAdmin,
  createProject,
  updateProject,
  deleteProject,
};