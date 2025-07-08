#!/bin/bash

# Task Manager Backend Setup Script
echo "🚀 Setting up Task Manager Backend..."

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Create project directory
echo -e "${BLUE}📁 Creating project directory...${NC}"
cd /Users/justicepencil/IdeaProjects
mkdir -p task-manager-backend
cd task-manager-backend

# Initialize npm project
echo -e "${BLUE}📦 Initializing npm project...${NC}"
npm init -y

# Install dependencies
echo -e "${BLUE}📥 Installing dependencies...${NC}"
npm install express mongoose bcryptjs jsonwebtoken cors dotenv

echo -e "${BLUE}🔧 Installing dev dependencies...${NC}"
npm install --save-dev nodemon

# Create directory structure
echo -e "${BLUE}📂 Creating directory structure...${NC}"
mkdir -p config models routes middleware controllers

# Create main files with basic structure
echo -e "${BLUE}📄 Creating main server file...${NC}"
cat > server.js << 'EOF'
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/v1/api', require('./routes/auth'));
app.use('/v1/api', require('./routes/tasks'));

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Task Manager API is running!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Connect to database and start server
const PORT = process.env.PORT || 8080;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Failed to connect to database:', error);
    process.exit(1);
  });
EOF

# Create environment file
echo -e "${BLUE}🔐 Creating environment file...${NC}"
cat > .env << 'EOF'
# Server Configuration
NODE_ENV=development
PORT=8080

# Database Configuration
MONGO_URI=mongodb://localhost:27017/taskmanager

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d

# CORS Configuration
CLIENT_URL=http://localhost:5173
EOF

# Create database config
echo -e "${BLUE}🗄️ Creating database configuration...${NC}"
cat > config/database.js << 'EOF'
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ Database connection error:', error);
    throw error;
  }
};

module.exports = connectDB;
EOF

# Create User model
echo -e "${BLUE}👤 Creating User model...${NC}"
cat > models/User.js << 'EOF'
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [6, 'Password must be at least 6 characters']
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
EOF

# Create Task model
echo -e "${BLUE}📋 Creating Task model...${NC}"
cat > models/Task.js << 'EOF'
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a task title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  dueDate: {
    type: Date,
    required: [true, 'Please provide a due date']
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Task', taskSchema);
EOF

# Create placeholder route files
echo -e "${BLUE}🛣️ Creating route files...${NC}"
cat > routes/auth.js << 'EOF'
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
EOF

cat > routes/tasks.js << 'EOF'
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
EOF

# Create placeholder middleware and controllers
echo -e "${BLUE}🔒 Creating middleware and controllers...${NC}"
touch middleware/auth.js
touch controllers/authController.js
touch controllers/taskController.js

# Update package.json scripts
echo -e "${BLUE}⚙️ Updating package.json scripts...${NC}"
node -e "
const pkg = require('./package.json');
pkg.scripts = {
  'start': 'node server.js',
  'dev': 'nodemon server.js',
  'test': 'echo \"Error: no test specified\" && exit 1'
};
pkg.main = 'server.js';
require('fs').writeFileSync('./package.json', JSON.stringify(pkg, null, 2));
"

# Create .gitignore
echo -e "${BLUE}📝 Creating .gitignore...${NC}"
cat > .gitignore << 'EOF'
# Dependencies
node_modules/

# Environment variables
.env
.env.local
.env.production

# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/

# nyc test coverage
.nyc_output

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db
EOF

echo -e "${GREEN}✅ Backend setup complete!${NC}"
echo -e "${YELLOW}📋 Next steps:${NC}"
echo -e "  1. cd task-manager-backend"
echo -e "  2. Install MongoDB (locally or use MongoDB Atlas)"
echo -e "  3. Update MONGO_URI in .env file"
echo -e "  4. Run: npm run dev"
echo -e "  5. Visit: http://localhost:8080"
echo ""
echo -e "${BLUE}🎯 Ready to start coding controllers and authentication!${NC}"