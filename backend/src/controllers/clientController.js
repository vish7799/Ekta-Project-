const Client = require('../models/Client');
const ApiError = require('../utils/apiError');
const { sendResponse } = require('../utils/apiResponse');

const CLIENT_FIELDS = [
  'name',
  'logo',
  'websiteUrl',
  'industrySector',
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

// Public: Get published clients
const getPublishedClients = async (req, res, next) => {
  try {
    const clients = await Client.find({ status: 'published' })
      .populate('logo')
      .sort({ displayOrder: 1, createdAt: -1 });

    return sendResponse(
      res,
      200,
      'Published clients fetched successfully',
      clients
    );
  } catch (error) {
    next(error);
  }
};

// Admin: Get all clients
const getAllClientsAdmin = async (req, res, next) => {
  try {
    const clients = await Client.find()
      .populate('logo')
      .sort({ displayOrder: 1, createdAt: -1 });

    return sendResponse(res, 200, 'All clients fetched successfully', clients);
  } catch (error) {
    next(error);
  }
};

// Admin: Create client
const createClient = async (req, res, next) => {
  try {
    const clientData = pickAllowedFields(req.body, CLIENT_FIELDS);

    const client = await Client.create(clientData);

    return sendResponse(res, 201, 'Client created successfully', client);
  } catch (error) {
    next(error);
  }
};

// Admin: Update client
const updateClient = async (req, res, next) => {
  try {
    const updateData = pickAllowedFields(req.body, CLIENT_FIELDS);

    if (Object.keys(updateData).length === 0) {
      return next(new ApiError(400, 'No valid client fields provided for update.'));
    }

    const client = await Client.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!client) {
      return next(new ApiError(404, 'Client not found'));
    }

    return sendResponse(res, 200, 'Client updated successfully', client);
  } catch (error) {
    next(error);
  }
};

// Admin: Delete client
const deleteClient = async (req, res, next) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);

    if (!client) {
      return next(new ApiError(404, 'Client not found'));
    }

    return sendResponse(res, 200, 'Client deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPublishedClients,
  getAllClientsAdmin,
  createClient,
  updateClient,
  deleteClient,
};