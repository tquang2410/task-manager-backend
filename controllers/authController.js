const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Generate JWT token
const generateToken = (userId) => {
    return jwt.sign(
        { userId },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE }
    );
};

// Register new user
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                EM: 'Please provide name, email and password'
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                EM: 'Email already exists'
            });
        }

        // Create new user
        const user = await User.create({
            name: name.trim(),
            email: email.toLowerCase().trim(),
            password
        });

        // Generate token
        const token = generateToken(user._id);

        // Return user info (excluding password) and token
        const userResponse = {
            id: user._id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt
        };

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            user: userResponse,
            accessToken: token
        });

    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({
            success: false,
            EM: 'Server error. Please try again.'
        });
    }
};

// Login user
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                EM: 'Please provide email and password'
            });
        }

        // Find user by email
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(401).json({
                success: false,
                EM: 'Invalid email or password'
            });
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                EM: 'Invalid email or password'
            });
        }

        // Generate token
        const token = generateToken(user._id);

        // Return user info (excluding password) and token
        const userResponse = {
            id: user._id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
        };

        res.status(200).json({
            success: true,
            message: 'Login successful',
            user: userResponse,
            accessToken: token
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            EM: 'Server error. Please try again.'
        });
    }
};

module.exports = {
    generateToken,
    register,
    login
};