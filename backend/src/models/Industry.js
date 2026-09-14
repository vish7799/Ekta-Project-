const mongoose = require('mongoose');

const IndustrySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Industry name is required'],
      trim: true,
      unique: true,
      maxlength: [100, 'Industry name cannot exceed 100 characters'],
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
      trim: true,
      maxlength: [300, 'Short description cannot exceed 300 characters'],
    },
    overview: {
      type: String,
      trim: true,
    },
    solutionsProvided: [{ type: String, trim: true }],
    icon: {
      type: String,
      trim: true,
    },
    featuredImage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Media',
    },
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
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Industry', IndustrySchema);
