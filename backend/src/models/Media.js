const mongoose = require('mongoose');

const MediaSchema = new mongoose.Schema(
  {
    originalName: {
      type: String,
      required: true,
      trim: true,
      maxlength: [255, 'Original filename cannot exceed 255 characters'],
    },

    fileName: {
      type: String,
      required: false,
      unique: true,
      trim: true,
      maxlength: [255, 'Filename cannot exceed 255 characters'],
      validate: {
        validator: (value) => !value || /^[^\\/\\]+$/.test(value),
        message: 'Invalid media filename format',
      },
    },

    mimeType: {
      type: String,
      required: true,
      trim: true,
      enum: [
        'image/jpeg',
        'image/png',
        'image/webp',
        'application/pdf',
      ],
    },

    sizeBytes: {
      type: Number,
      required: true,
      min: [1, 'File size must be greater than zero'],
      max: [209715200, 'File size cannot exceed 200 MB'],
    },

    filePath: {
      type: String,
      required: true,
      trim: true,
      maxlength: [300, 'File path cannot exceed 300 characters'],
      validate: {
        validator: (value) => (
          /^\/uploads\/ekta-\d+-\d+\.(jpg|jpeg|png|webp|pdf)$/i.test(value)
          || /^https:\/\/res\.cloudinary\.com\//i.test(value)
        ),
        message: 'Invalid media file path',
      },
    },

    storageProvider: {
      type: String,
      enum: ['local', 'cloudinary'],
      default: 'local',
      index: true,
    },

    cloudinaryPublicId: {
      type: String,
      trim: true,
      maxlength: 255,
    },

    cloudinaryResourceType: {
      type: String,
      enum: ['image', 'raw', 'video', 'auto'],
    },

    altText: {
      type: String,
      trim: true,
      maxlength: [500, 'Alt text cannot exceed 500 characters'],
      default: '',
    },

    caption: {
      type: String,
      trim: true,
      maxlength: [1000, 'Caption cannot exceed 1000 characters'],
      default: '',
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

MediaSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Media', MediaSchema);