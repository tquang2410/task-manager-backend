const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { getProfile, updateProfile, updatePassword } = require('../controllers/profileController');
const authMiddleware = require('../middleware/auth');
// Replace placeholder with real controller
router.post('/register', register);

// Keep placeholders for now
router.post('/login', login);
// Profile routes
router.get('/account', authMiddleware, getProfile);
router.put('/account', authMiddleware, updateProfile);
router.put('/account/password', authMiddleware, updatePassword);
module.exports = router;