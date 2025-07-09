const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
    try {
        // 1. Extract token
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                EM: 'Access denied. No token provided.'
            });
        }

        const token = authHeader.split(' ')[1];

        // 2. Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 3. Get user from database (optional - for fresh user data)
        const user = await User.findById(decoded.userId).select('-password');
        if (!user) {
            return res.status(401).json({
                success: false,
                EM: 'Invalid token. User not found.'
            });
        }

        // 4. Set user info in request
        req.user = {
            userId: decoded.userId,
            email: user.email,
            name: user.name
        };

        next(); // Continue to route handler

    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                EM: 'Token expired. Please login again.'
            });
        }

        return res.status(401).json({
            success: false,
            EM: 'Invalid token.'
        });
    }
};

module.exports = authMiddleware;