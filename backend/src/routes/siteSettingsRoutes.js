const express = require('express');
const router = express.Router();
const { getSiteSettings, updateSiteSettings } = require('../controllers/siteSettingsController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

// Public
router.get('/', getSiteSettings);

// Admin Protected
router.put('/', protect, authorize('admin'), updateSiteSettings);

module.exports = router;
