const Enquiry = require('../models/Enquiry');
const ApiError = require('../utils/apiError');
const { sendResponse } = require('../utils/apiResponse');
const { sendEnquiryNotifications } = require('../utils/mailer');

// Public: Submit enquiry form
const submitEnquiry = async (req, res, next) => {
  try {
    const { fullName, email, phone, companyName, serviceRequested, subject, message } = req.body;
    const ipAddress = req.ip || req.connection.remoteAddress;

    const enquiry = await Enquiry.create({
      fullName,
      email,
      phone,
      companyName,
      serviceRequested,
      subject,
      message,
      ipAddress,
      status: 'new',
    });

    await sendEnquiryNotifications(enquiry);

    return sendResponse(res, 201, 'Thank you for your enquiry. Our engineering team will get back to you shortly.', {
      id: enquiry._id,
      createdAt: enquiry.createdAt,
    });
  } catch (error) {
    next(error);
  }
};

// Admin: Get all enquiries with filtering & pagination
const getEnquiriesAdmin = async (req, res, next) => {
  try {
    const { status, search, page = 1, limit = 20 } = req.query;
    const query = {};

        const cleanSearch = search ? String(search).trim() : '';
        const safePage = Math.max(parseInt(page, 10) || 1, 1);
        const safeLimit = Math.min(Math.max(parseInt(limit, 10) || 20, 1), 100);

        if (status) query.status = status;
        if (cleanSearch) {
          const escapedSearch = cleanSearch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          query.$or = ['fullName', 'email', 'companyName', 'subject'].map((field) => ({
            [field]: { $regex: escapedSearch, $options: 'i' },
          }));
        }

        const skip = (safePage - 1) * safeLimit;

    const enquiries = await Enquiry.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(safeLimit);

    const total = await Enquiry.countDocuments(query);

    return sendResponse(res, 200, 'Enquiries retrieved successfully', enquiries, {
      total,
      page: safePage,
      limit: safeLimit,
      totalPages: Math.max(Math.ceil(total / safeLimit), 1),
    });
  } catch (error) {
    next(error);
  }
};

// Admin: Update enquiry status/notes
const updateEnquiryStatus = async (req, res, next) => {
  try {
    const { status, adminNotes } = req.body;
    const enquiry = await Enquiry.findById(req.params.id);

    if (!enquiry) {
      return next(new ApiError(404, 'Enquiry record not found'));
    }

    if (status) enquiry.status = status;
    if (adminNotes !== undefined) enquiry.adminNotes = adminNotes;

    await enquiry.save();
    return sendResponse(res, 200, 'Enquiry record updated successfully', enquiry);
  } catch (error) {
    next(error);
  }
};

// Admin: Delete enquiry
const deleteEnquiry = async (req, res, next) => {
  try {
    const enquiry = await Enquiry.findByIdAndDelete(req.params.id);
    if (!enquiry) {
      return next(new ApiError(404, 'Enquiry record not found'));
    }
    return sendResponse(res, 200, 'Enquiry record deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  submitEnquiry,
  getEnquiriesAdmin,
  updateEnquiryStatus,
  deleteEnquiry,
};
