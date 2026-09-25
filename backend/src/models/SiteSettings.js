const mongoose = require('mongoose');

const SiteSettingsSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      default: 'EKTA ELECTRICAL WORKS',
      trim: true,
    },
    tagline: {
      type: String,
      default: 'Turnkey Industrial Electrical & Power Engineering Solutions',
      trim: true,
    },
    corporateAddress: {
      type: String,
      trim: true,
      default: '',
    },
    primaryPhone: {
      type: String,
      trim: true,
      default: '',
    },
    primaryContactName: {
      type: String,
      trim: true,
      default: '',
    },
    emergencyPhone: {
      type: String,
      trim: true,
      default: '',
    },
    emergencyContactName: {
      type: String,
      trim: true,
      default: '',
    },
    email: {
      type: String,
      trim: true,
      default: '',
    },
    secondaryEmail: {
      type: String,
      trim: true,
      default: '',
    },
    businessHours: {
      type: String,
      trim: true,
      default: 'Mon - Sat: 9:00 AM - 6:00 PM',
    },
    socialLinks: {
      linkedin: { type: String, trim: true, default: '' },
      facebook: { type: String, trim: true, default: '' },
      twitter: { type: String, trim: true, default: '' },
    },
    seoDefaults: {
      metaTitle: { type: String, trim: true, default: 'EKTA ELECTRICAL WORKS | Industrial Electrical Engineers' },
      metaDescription: { type: String, trim: true, default: 'Turnkey industrial electrical, high-voltage substations, power distribution, and electrical automation services.' },
      ogImage: { type: String, trim: true, default: '' },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('SiteSettings', SiteSettingsSchema);
