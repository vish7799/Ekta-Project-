const express = require('express');
const router = express.Router();
const { login, getMe, logout } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { authLimiter } = require('../middleware/rateLimiter');
const validate = require('../middleware/validateMiddleware');
const { validateLoginInput } = require('../validators/authValidator');

router.post('/login', authLimiter, validate(validateLoginInput), login);
router.get('/me', protect, getMe);
router.post('/logout', protect, logout);

module.exports = router;
