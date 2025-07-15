const User = require('../models/User');
const bcryptjs = require('bcryptjs');

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
                avatarId: user.avatarId || 1, // Default avatar ID if not set
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
        const { name,avatarId } = req.body;
        // Validate input
        if (!name || name.trim().length === 0) {
            return res.status(400).json({
                success: false,
                EM: 'Name is required',
            });
        }
        // Validate avatarId if provided
        if (avatarId !== undefined) {
            if (!Number.isInteger(avatarId) || avatarId < 1 || avatarId > 10) {
                return res.status(400).json({
                    success: false,
                    EM: 'Avatar ID must be between 1 and 10',
                });
            }
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
                ...(avatarId !== undefined && { avatarId }),
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
                avatarId: updatedUser.avatarId || 1, // Default avatar ID if not set
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

// PUT /v1/api/account/password - Update password
const updatePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;

        // Validation
        if (!oldPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                EM: 'Current password and new password are required'
            });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({
                success: false,
                EM: 'New password must be at least 6 characters'
            });
        }

        // Get user with password để verify
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                EM: 'User not found'
            });
        }

        // Verify current password
        const isValidPassword = await bcryptjs.compare(oldPassword, user.password);
        if (!isValidPassword) {
            return res.status(400).json({
                success: false,
                EM: 'Current password is incorrect'
            });
        }

        // Hash new password
        const saltRounds = 10;
        const hashedNewPassword = await bcryptjs.hash(newPassword, saltRounds);

        // Update password
        await User.findByIdAndUpdate(
            req.user.userId,
            {
                password: hashedNewPassword,
                updatedAt: new Date()
            },
            { runValidators: true }
        );

        res.status(200).json({
            success: true,
            message: 'Password updated successfully'
        });

    } catch (error) {
        console.error('Update password error:', error);
        res.status(500).json({
            success: false,
            EM: 'Server error while updating password'
        });
    }
};

module.exports = {
    getProfile,
    updateProfile,
    updatePassword  // ← Export thêm function mới
};
