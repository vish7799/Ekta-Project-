const express = require('express');
const router = express.Router();
const {
  getPublishedServices,
  getServiceBySlug,
  getAllServicesAdmin,
  createService,
  updateService,
  deleteService,
} = require('../controllers/serviceController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

// Public
router.get('/', getPublishedServices);
router.get('/slug/:slug', getServiceBySlug);

// Admin Protected
router.get('/admin/all', protect, authorize('admin', 'editor'), getAllServicesAdmin);
router.post('/', protect, authorize('admin', 'editor'), createService);
router.put('/:id', protect, authorize('admin', 'editor'), updateService);
router.delete('/:id', protect, authorize('admin'), deleteService);

module.exports = router;
