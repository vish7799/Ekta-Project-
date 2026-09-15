const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Client company name is required'],
      trim: true,
      maxlength: [150, 'Client name cannot exceed 150 characters'],
    },
    logo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Media',
    },
    websiteUrl: {
      type: String,
      trim: true,
    },
    industrySector: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    scope: {
      type: String,
      trim: true,
    },
    displayOrder: {
      type: Number,
      default: 0,
      index: true,
    },
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'published',
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Client', ClientSchema);
