const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// Replace placeholder with real controller
router.post('/register', register);

// Keep placeholders for now
router.post('/login', login);

router.get('/account', (req, res) => {
  res.json({ message: 'Profile route - TODO' });
});

module.exports = router;