const express = require('express');
const router = express.Router();
const {
  getPublishedClients,
  getAllClientsAdmin,
  createClient,
  updateClient,
  deleteClient,
} = require('../controllers/clientController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

// Public
router.get('/', getPublishedClients);

// Admin Protected
router.get('/admin/all', protect, authorize('admin', 'editor'), getAllClientsAdmin);
router.post('/', protect, authorize('admin', 'editor'), createClient);
router.put('/:id', protect, authorize('admin', 'editor'), updateClient);
router.delete('/:id', protect, authorize('admin'), deleteClient);

module.exports = router;
