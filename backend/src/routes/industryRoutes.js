const express = require('express');
const router = express.Router();
const {
  getPublishedIndustries,
  getIndustryBySlug,
  getAllIndustriesAdmin,
  createIndustry,
  updateIndustry,
  deleteIndustry,
} = require('../controllers/industryController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

// Public
router.get('/', getPublishedIndustries);
router.get('/slug/:slug', getIndustryBySlug);

// Admin Protected
router.get('/admin/all', protect, authorize('admin', 'editor'), getAllIndustriesAdmin);
router.post('/', protect, authorize('admin', 'editor'), createIndustry);
router.put('/:id', protect, authorize('admin', 'editor'), updateIndustry);
router.delete('/:id', protect, authorize('admin'), deleteIndustry);

module.exports = router;
