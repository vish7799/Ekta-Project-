const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Service title is required'],
      trim: true,
      maxlength: [150, 'Service title cannot exceed 150 characters'],
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    shortDescription: {
      type: String,
      required: [true, 'Short description is required'],
      trim: true,
      maxlength: [300, 'Short description cannot exceed 300 characters'],
    },
    fullDescription: {
      type: String,
      trim: true,
    },
    icon: {
      type: String,
      trim: true, // Icon identifier or URL
    },
    featuredImage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Media',
    },
    gallery: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Media',
      },
    ],
    keyFeatures: [{ type: String, trim: true }],
    specifications: [
      {
        label: { type: String, trim: true },
        value: { type: String, trim: true },
      },
    ],
    displayOrder: {
      type: Number,
      default: 0,
      index: true,
    },
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'draft',
      index: true,
    },
    seo: {
      metaTitle: { type: String, trim: true, maxlength: 70 },
      metaDescription: { type: String, trim: true, maxlength: 160 },
      keywords: [{ type: String, trim: true }],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Service', ServiceSchema);
