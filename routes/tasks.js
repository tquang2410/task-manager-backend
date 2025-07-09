const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { getTasks, createTask, updateTask, deleteTask, getTaskById } = require('../controllers/taskController');
// TODO: Import task controllers and auth middleware

router.get('/tasks', authMiddleware, getTasks);
router.get('/tasks/:id', authMiddleware, getTaskById);

router.post('/tasks', authMiddleware, createTask);

router.put('/tasks/:id', authMiddleware, updateTask);

router.delete('/tasks/:id', authMiddleware, deleteTask);

module.exports = router;
