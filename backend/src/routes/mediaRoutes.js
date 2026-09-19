const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const config = require('../config/env');
const ApiError = require('../utils/apiError');
const { uploadMedia, getAllMedia, deleteMedia } = require('../controllers/mediaController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

// Storage strategy
const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploads.uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `ekta-${uniqueSuffix}${ext}`);
  },
});

const memoryStorage = multer.memoryStorage();
const useCloudinary = Boolean(
  config.cloudinary.cloudName &&
  config.cloudinary.apiKey &&
  config.cloudinary.apiSecret
);

// File filter (MIME & extension security check)
const fileFilter = (req, file, cb) => {
  if (
    config.uploads.allowedTypes.includes(file.mimetype) &&
    file.mimetype !== 'image/svg+xml'
  ) {
    cb(null, true);
  } else {
    cb(new ApiError(400, `Unsupported file type '${file.mimetype}'. Allowed types: ${config.uploads.allowedTypes.join(', ')}`), false);
  }
};

const upload = multer({
  storage: useCloudinary ? memoryStorage : diskStorage,
  limits: { fileSize: config.uploads.maxSizeBytes },
  fileFilter,
});

// Routes
router.use(protect, authorize('admin', 'editor'));
router.get('/', getAllMedia);
router.post('/upload', upload.single('file'), uploadMedia);
router.delete('/:id', deleteMedia);

module.exports = router;
