const User = require('../models/User');

// GET /v1/api/account - Get current user profile
const getProfile = async (req, res) => {
    try {
        // req.user.userId is set by auth middleware
        const user = await User.findById(req.user.userId).select('-password -__v');
        if (!user) {
            return res.status(404).json({
                success: false,
                EM: 'User not found',
            });
        }
        res.status(200).json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            }
        });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({
            success: false,
            EM: 'Internal server error',
        });
}
};

// PUT /v1/api/account - Update user profile
const updateProfile = async (req, res) => {
    try {
        const { name } = req.body;
        // Validate input
        if (!name || name.trim().length === 0) {
            return res.status(400).json({
                success: false,
                EM: 'Name is required',
            });
        }
        if (name.trim().length < 2 || name.trim().length > 50) {
            return res.status(400).json({
                success: false,
                EM: 'Name must be between 2 and 50 characters',
            });
        }
        // update user profile
        const updatedUser = await User.findByIdAndUpdate(
            req.user.userId,
            {
                name: name.trim(),
                updatedAt: new Date(),
            },
            {
                new: true, // return the updated document
                runValidators: true, // validate against schema
            }
        ).select('-password -__v');
        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                EM: 'User not found',
            });
        }
        res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            user: {
                id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                createdAt: updatedUser.createdAt,
                updatedAt: updatedUser.updatedAt,
            }
        });
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).json({
            success: false,
            EM: 'Internal server error',
        });
    }
};
module.exports = {
    getProfile,
    updateProfile,
};