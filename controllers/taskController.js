const Task = require('../models/Task');

// Fetch all tasks for list/dashboard view
const getTasks = async (req, res) => {
    try {
        // req.user.userId from JWT middleware
        const tasks = await Task.find({ user: req.user.userId }).sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            tasks
        })
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching tasks'
        });
    }
};
// Fetch single task by ID for detail view
const getTaskById = async (req, res) => {
    try {
        const {id} = req.params;

        // Find task by ID and ensure it belongs to the user
        const task = await Task.findOne({ _id: id, user: req.user.userId });
        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found or you do not have permission to view it'
            });
        }
        res.status(200).json({
            success: true,
            task
        });
    } catch (error) {
        console.error('Get task by ID error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching task'
        });
    }
}

 // Create a new task for current user
    const createTask = async (req, res) => {
        try {
            const { title, description, status, priority, dueDate } = req.body;

            // Validate required fields
            if (!title || !dueDate) {
                return res.status(400).json({
                    success: false,
                    EM: 'Title and due date are required'
                });
            }

            // Create new task
            const task = await Task.create({
                title: title.trim(),
                description: description ? description.trim() : '',
                status: status || 'pending',
                priority: priority || 'medium',
                dueDate,
                user: req.user.userId
            });

            res.status(201).json({
                success: true,
                message: 'Task created successfully',
                task
            });

        } catch (error) {
            console.error('Create task error:', error);
            res.status(500).json({
                success: false,
                EM: 'Server error. Please try again.'
            });
        }
    };
 // Update task ( owner can update only their own tasks )
 const updateTask = async (req, res) => {
     try {
         const { id } = req.params;
         const { title, description, status, priority, dueDate } = req.body;

         // Find task by ID and ensure it belongs to the user
         const task = await Task.findOne(
                { _id: id, user: req.user.userId }
         )
         if(!task){
                return res.status(404).json({
                    success: false,
                    EM: 'Task not found or you do not have permission to update it'
                });
         }
            // Update task fields
         const updatedTask = await Task.findByIdAndUpdate(
             id,
             {
                 title: title?.trim(),
                 description: description?.trim(),
                 status,
                 priority,
                 dueDate
             },
             { new: true, runValidators: true} // validator in schema
         );
         res.status(200).json({
             success: true,
             message: 'Task updated successfully',
             task: updatedTask
         });
     } catch (error) {
            console.error('Update task error:', error);
            res.status(500).json({
                success: false,
                EM: 'Server error while updating task'
            });
     }
 };
 // Delete task ( owner can delete only their own tasks )
 const deleteTask = async (req, res) => {
        try {
            const { id } = req.params;

            // Find task by ID and ensure it belongs to the user
            const task = await Task.findOneAndDelete({
                _id: id,
                user: req.user.userId
            });
            if (!task) {
                return res.status(404).json({
                    success: false,
                    EM: 'Task not found or you do not have permission to delete it'
                });
            }
            res.status(200).json({
                success: true,
                message: 'Task deleted successfully'
            });
        } catch (error) {
            console.error('Delete task error:', error);
            res.status(500).json({
                success: false,
                EM: 'Server error while deleting task'
            });
        }
 }
module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
    getTaskById
}