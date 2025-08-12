const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { getTasks, createTask, updateTask, deleteTask, getTaskById, deleteBulkTasks } = require('../controllers/taskController');

// Bulk delete tasks
router.delete('/tasks/bulk', authMiddleware, deleteBulkTasks);

router.get('/tasks', authMiddleware, getTasks);
router.get('/tasks/:id', authMiddleware, getTaskById);

router.post('/tasks', authMiddleware, createTask);

router.put('/tasks/:id', authMiddleware, updateTask);

// Delete a single task
router.delete('/tasks/:id', authMiddleware, deleteTask);

module.exports = router;
