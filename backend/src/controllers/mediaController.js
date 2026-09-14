const Media = require('../models/Media');
const ApiError = require('../utils/apiError');
const { sendResponse } = require('../utils/apiResponse');
const fs = require('fs');
const path = require('path');

const UPLOAD_DIR = path.resolve(__dirname, '../../uploads');

const uploadMedia = async (req, res, next) => {
  let uploadedFilePath = null;

  try {
    if (!req.file) {
      return next(new ApiError(400, 'No file uploaded.'));
    }

    uploadedFilePath = path.join(UPLOAD_DIR, req.file.filename);

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

    const media = await Media.create({
      originalName: req.file.originalname,
      fileName: req.file.filename,
      mimeType: req.file.mimetype,
      sizeBytes: req.file.size,
      filePath: `/uploads/${req.file.filename}`,
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