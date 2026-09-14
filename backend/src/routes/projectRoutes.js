const express = require('express');
const router = express.Router();
const {
  getPublishedProjects,
  getProjectBySlug,
  getAllProjectsAdmin,
  createProject,
  updateProject,
  deleteProject,
} = require('../controllers/projectController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

// Public
router.get('/', getPublishedProjects);
router.get('/slug/:slug', getProjectBySlug);

// Admin Protected
router.get('/admin/all', protect, authorize('admin', 'editor'), getAllProjectsAdmin);
router.post('/', protect, authorize('admin', 'editor'), createProject);
router.put('/:id', protect, authorize('admin', 'editor'), updateProject);
router.delete('/:id', protect, authorize('admin'), deleteProject);

module.exports = router;
