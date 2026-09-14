const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const pageRoutes = require('./pageRoutes');
const serviceRoutes = require('./serviceRoutes');
const projectRoutes = require('./projectRoutes');
const industryRoutes = require('./industryRoutes');
const clientRoutes = require('./clientRoutes');
const testimonialRoutes = require('./testimonialRoutes');
const enquiryRoutes = require('./enquiryRoutes');
const mediaRoutes = require('./mediaRoutes');
const siteSettingsRoutes = require('./siteSettingsRoutes');

// API Version 1 Router Aggregator
router.use('/auth', authRoutes);
router.use('/pages', pageRoutes);
router.use('/services', serviceRoutes);
router.use('/projects', projectRoutes);
router.use('/industries', industryRoutes);
router.use('/clients', clientRoutes);
router.use('/testimonials', testimonialRoutes);
router.use('/enquiries', enquiryRoutes);
router.use('/media', mediaRoutes);
router.use('/site-settings', siteSettingsRoutes);

// Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    service: 'EKTA ELECTRICAL WORKS API v1',
  });
});

module.exports = router;
