const express = require('express');
const router = express.Router();

// TODO: Import auth controllers
// const { register, login, getProfile } = require('../controllers/authController');

// Placeholder routes
router.post('/register', (req, res) => {
  res.json({ message: 'Register route - TODO' });
});

router.post('/login', (req, res) => {
  res.json({ message: 'Login route - TODO' });
});

router.get('/account', (req, res) => {
  res.json({ message: 'Profile route - TODO' });
});

module.exports = router;
