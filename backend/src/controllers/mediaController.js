const Media = require('../models/Media');
const ApiError = require('../utils/apiError');
const { sendResponse } = require('../utils/apiResponse');
const config = require('../config/env');
const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;

const UPLOAD_DIR = config.uploads.uploadDir;
const useCloudinary = Boolean(
  config.cloudinary.cloudName &&
  config.cloudinary.apiKey &&
  config.cloudinary.apiSecret
);

if (useCloudinary) {
  cloudinary.config({
    cloud_name: config.cloudinary.cloudName,
    api_key: config.cloudinary.apiKey,
    api_secret: config.cloudinary.apiSecret,
  });
}

const uploadToCloudinary = (file) => new Promise((resolve, reject) => {
  const uploadStream = cloudinary.uploader.upload_stream(
    {
      folder: 'ekta-electrical-works',
      resource_type: 'auto',
      public_id: `ekta-${Date.now()}-${Math.round(Math.random() * 1e9)}`,
    },
    (error, result) => (error ? reject(error) : resolve(result))
  );

  uploadStream.end(file.buffer);
});

const uploadMedia = async (req, res, next) => {
  let uploadedFilePath = null;
  let cloudinaryPublicId = null;
  let cloudinaryResourceType = null;

  try {
    if (!req.file) {
      return next(new ApiError(400, 'No file uploaded.'));
    }

    if (!useCloudinary) {
      uploadedFilePath = path.join(UPLOAD_DIR, req.file.filename);
    }

    const { altText = '', caption = '' } = req.body;

    if (typeof altText !== 'string' || altText.length > 500) {
      if (uploadedFilePath && fs.existsSync(uploadedFilePath)) {
        fs.unlinkSync(uploadedFilePath);
      }

      return next(
        new ApiError(400, 'Alt text must be a string with a maximum of 500 characters.')
      );
    }

    if (typeof caption !== 'string' || caption.length > 1000) {
      if (uploadedFilePath && fs.existsSync(uploadedFilePath)) {
        fs.unlinkSync(uploadedFilePath);
      }

      return next(
        new ApiError(400, 'Caption must be a string with a maximum of 1000 characters.')
      );
    }

    let fileName = req.file.filename;
    let filePath = `/uploads/${req.file.filename}`;
    let storageProvider = 'local';

    if (useCloudinary) {
      const cloudinaryFile = await uploadToCloudinary(req.file);
      cloudinaryPublicId = cloudinaryFile.public_id;
      fileName = path.basename(cloudinaryFile.public_id);
      filePath = cloudinaryFile.secure_url;
      storageProvider = 'cloudinary';
      cloudinaryResourceType = cloudinaryFile.resource_type;
    }

    const media = await Media.create({
      originalName: req.file.originalname,
      fileName,
      mimeType: req.file.mimetype,
      sizeBytes: req.file.size,
      filePath,
      storageProvider,
      cloudinaryPublicId,
      cloudinaryResourceType,
      altText: altText.trim(),
      caption: caption.trim(),
      uploadedBy: req.user._id,
    });

    return sendResponse(
      res,
      201,
      'Media uploaded successfully',
      media
    );
  } catch (error) {
    if (cloudinaryPublicId) {
      try {
        await cloudinary.uploader.destroy(cloudinaryPublicId, { resource_type: cloudinaryResourceType || 'image' });
      } catch (cleanupError) {
        console.error('[Cloudinary Cleanup Error]:', cleanupError);
      }
    }

    // Remove the physical file if database creation fails.
    if (uploadedFilePath && fs.existsSync(uploadedFilePath)) {
      try {
        fs.unlinkSync(uploadedFilePath);
      } catch (cleanupError) {
        console.error(
          '[Media Cleanup Error]:',
          cleanupError
        );
      }
    }

    next(error);
  }
};

const getAllMedia = async (req, res, next) => {
  try {
    const mediaList = await Media.find()
      .sort({ createdAt: -1 })
      .lean();

    return sendResponse(
      res,
      200,
      'Media library fetched successfully',
      mediaList
    );
  } catch (error) {
    next(error);
  }
};

const deleteMedia = async (req, res, next) => {
  try {
    const media = await Media.findById(req.params.id);

    if (!media) {
      return next(
        new ApiError(404, 'Media asset not found.')
      );
    }

    if (media.storageProvider === 'cloudinary' && media.cloudinaryPublicId) {
      await cloudinary.uploader.destroy(media.cloudinaryPublicId, { resource_type: media.cloudinaryResourceType || 'image' });
      await Media.findByIdAndDelete(media._id);

      return sendResponse(
        res,
        200,
        'Media asset deleted successfully'
      );
    }

    // Only use the stored filename, never a user-controlled path.
    const safeFileName = path.basename(media.fileName);

    if (safeFileName !== media.fileName) {
      console.error(
        '[Media Security Warning] Invalid stored filename:',
        media.fileName
      );

      return next(
        new ApiError(500, 'Stored media file reference is invalid.')
      );
    }

    const fullPath = path.join(
      UPLOAD_DIR,
      safeFileName
    );

    // Make sure the resolved path remains inside uploads/.
    const resolvedUploadDir = path.resolve(UPLOAD_DIR);
    const resolvedFilePath = path.resolve(fullPath);

    if (
      !resolvedFilePath.startsWith(
        `${resolvedUploadDir}${path.sep}`
      )
    ) {
      return next(
        new ApiError(500, 'Invalid media file path.')
      );
    }

    if (fs.existsSync(resolvedFilePath)) {
      await fs.promises.unlink(resolvedFilePath);
    }

    await Media.findByIdAndDelete(media._id);

    return sendResponse(
      res,
      200,
      'Media asset deleted successfully'
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadMedia,
  getAllMedia,
  deleteMedia,
};