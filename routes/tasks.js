const express = require('express');
const router = express.Router();

// TODO: Import task controllers and auth middleware

// Placeholder routes
router.get('/tasks', (req, res) => {
  res.json({ message: 'Get tasks route - TODO' });
});

router.post('/tasks', (req, res) => {
  res.json({ message: 'Create task route - TODO' });
});

module.exports = router;
