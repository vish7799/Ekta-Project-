const express = require('express');
const router = express.Router();
const {
  submitEnquiry,
  getEnquiriesAdmin,
  updateEnquiryStatus,
  deleteEnquiry,
} = require('../controllers/enquiryController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');
const { enquiryLimiter } = require('../middleware/rateLimiter');
const validate = require('../middleware/validateMiddleware');
const { validateEnquiryInput } = require('../validators/enquiryValidator');

// Public form submission
router.post('/', enquiryLimiter, validate(validateEnquiryInput), submitEnquiry);

// Admin Protected
router.get('/', protect, authorize('admin', 'editor'), getEnquiriesAdmin);
router.put('/:id', protect, authorize('admin', 'editor'), updateEnquiryStatus);
router.delete('/:id', protect, authorize('admin'), deleteEnquiry);

module.exports = router;
