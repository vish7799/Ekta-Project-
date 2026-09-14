const express = require('express');
const router = express.Router();
const {
  getPageBySlug,
  getAllPagesAdmin,
  createPage,
  updatePage,
  deletePage,
} = require('../controllers/pageController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

// Public
router.get('/slug/:slug', getPageBySlug);

// Admin Protected
router.use(protect, authorize('admin', 'editor'));
router.get('/', getAllPagesAdmin);
router.post('/', createPage);
router.put('/:id', updatePage);
router.delete('/:id', deletePage);

module.exports = router;
