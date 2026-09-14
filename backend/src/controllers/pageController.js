const Page = require('../models/Page');
const ApiError = require('../utils/apiError');
const { sendResponse } = require('../utils/apiResponse');
const slugify = require('../utils/slugify');

// Public: Get published page by slug
const getPageBySlug = async (req, res, next) => {
  try {
    const page = await Page.findOne({ slug: req.params.slug, status: 'published' });
    if (!page) {
      return next(new ApiError(404, 'Page not found'));
    }
    return sendResponse(res, 200, 'Page retrieved successfully', page);
  } catch (error) {
    next(error);
  }
};

// Admin: Get all pages
const getAllPagesAdmin = async (req, res, next) => {
  try {
    const pages = await Page.find().sort({ createdAt: -1 });
    return sendResponse(res, 200, 'Pages retrieved successfully', pages);
  } catch (error) {
    next(error);
  }
};

// Admin: Create page
const createPage = async (req, res, next) => {
  try {
    const { title, summary, content, status, seo } = req.body;
    const slug = req.body.slug ? slugify(req.body.slug) : slugify(title);

    const existing = await Page.findOne({ slug });
    if (existing) {
      return next(new ApiError(400, `Page with slug '${slug}' already exists.`));
    }

    const page = await Page.create({
      title,
      slug,
      summary,
      content,
      status: status || 'draft',
      seo,
      createdBy: req.user._id,
      updatedBy: req.user._id,
    });

    return sendResponse(res, 201, 'Page created successfully', page);
  } catch (error) {
    next(error);
  }
};

// Admin: Update page
const updatePage = async (req, res, next) => {
  try {
    const { title, summary, content, status, seo } = req.body;
    const page = await Page.findById(req.params.id);

    if (!page) {
      return next(new ApiError(404, 'Page not found'));
    }

    if (title) page.title = title;
    if (summary !== undefined) page.summary = summary;
    if (content !== undefined) page.content = content;
    if (status) page.status = status;
    if (seo) page.seo = { ...page.seo, ...seo };
    page.updatedBy = req.user._id;

    await page.save();
    return sendResponse(res, 200, 'Page updated successfully', page);
  } catch (error) {
    next(error);
  }
};

// Admin: Delete page
const deletePage = async (req, res, next) => {
  try {
    const page = await Page.findByIdAndDelete(req.params.id);
    if (!page) {
      return next(new ApiError(404, 'Page not found'));
    }
    return sendResponse(res, 200, 'Page deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPageBySlug,
  getAllPagesAdmin,
  createPage,
  updatePage,
  deletePage,
};
