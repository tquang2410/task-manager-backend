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

        // Create new user with detailed logging
        console.log('About to create user with data:', {
            name: name.trim(),
            email: email.toLowerCase().trim(),
            password: 'HIDDEN'
        });
        
        const user = await User.create({
            name: name.trim(),
            email: email.toLowerCase().trim(),
            password
        });
        
        console.log('User.create returned:', {
            id: user._id,
            name: user.name,
            email: user.email,
            isNew: user.isNew
        });
        
        // Force save and verify
        await user.save();
        console.log('Manual save completed');
        
        // Verify user creation
        const savedUser = await User.findById(user._id);
        console.log('Database verification:', savedUser ? 'FOUND' : 'NOT FOUND');
        
        // Count total users
        const totalUsers = await User.countDocuments();
        console.log('Total users in database:', totalUsers);
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
    console.log('LOGIN CONTROLLER DUOC GOI');
    try {
        const { email, password } = req.body;
        console.log('Login attempt with:', { email, password });

        // Validate input
        if (!email || !password) {
            console.log('Validation failed: missing fields');
            return res.status(400).json({
                success: false,
                EM: 'Please provide email and password'
            });
        }
        console.log('Validation passed');

        // Find user by email
        console.log('Finding user with email:', email.toLowerCase());
        const user = await User.findOne({ email: email.toLowerCase() });
        console.log('User found:', user ? 'YES' : 'NO');

        if (!user) {
            console.log('User not found, returning 401');
            return res.status(401).json({
                success: false,
                EM: 'Invalid email or password'
            });
        }

        // Check password
        console.log('Checking password...');
        const isMatch = await user.comparePassword(password);
        console.log('Password match:', isMatch ? 'YES' : 'NO');

        if (!isMatch) {
            console.log('Password mismatch, returning 401');
            return res.status(401).json({
                success: false,
                EM: 'Invalid email or password'
            });
        }

        // Generate token
        console.log('Generating token...');
        const token = generateToken(user._id);

        // Return user info (excluding password) and token
        const userResponse = {
            id: user._id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
        };

        console.log('Login successful, sending response');
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