const express = require('express');
const router = express.Router();
const {
  getPublishedTestimonials,
  getAllTestimonialsAdmin,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} = require('../controllers/testimonialController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

// Public
router.get('/', getPublishedTestimonials);

// Admin Protected
router.get('/admin/all', protect, authorize('admin', 'editor'), getAllTestimonialsAdmin);
router.post('/', protect, authorize('admin', 'editor'), createTestimonial);
router.put('/:id', protect, authorize('admin', 'editor'), updateTestimonial);
router.delete('/:id', protect, authorize('admin'), deleteTestimonial);

module.exports = router;
