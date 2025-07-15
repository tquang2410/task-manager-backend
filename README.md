# Task Manager - Full Stack Application

## 📁 Cấu trúc Project

```
task-manager-system/
├── task-manager-backend/     # Node.js + Express + MongoDB
└── task-manager-frontend/    # React + Vite + Ant Design
```

## 🔄 Luồng tương tác Frontend ↔ Backend

### **Authentication**

**Register:**
Frontend: `RegisterForm.jsx` → Backend: `authController.js` → Frontend: `AuthContext.jsx`

**Login:**
Frontend: `LoginForm.jsx` → Backend: `authController.js` → Frontend: `AuthContext.jsx`

**Profile Update:**
Frontend: `ProfileForm.jsx` → Backend: `profileController.js` → Frontend: `AuthContext.jsx`

### **Task Management**

**Load Tasks:**
Frontend: `TaskContext.jsx` → Backend: `taskController.js` → Frontend: `TaskContext.jsx`

**Create Task:**
Frontend: `TaskModal.jsx` → Backend: `taskController.js` → Frontend: `TaskContext.jsx`

**Update Task:**
Frontend: `TaskList.jsx` → Backend: `taskController.js` → Frontend: `TaskContext.jsx`

**Delete Task:**
Frontend: `TasksPage.jsx` → Backend: `taskController.js` → Frontend: `TaskContext.jsx`

## 🛡️ Security Flow

**Protected Routes:**
Frontend: `ProtectedRoute.jsx` → Backend: `middleware/auth.js` → Frontend: Components

**API Requests:**
Frontend: `axios.config.js` (add JWT) → Backend: `middleware/auth.js` (verify JWT) → Controllers

## 📊 State Management

**Frontend:**
- `AuthContext.jsx` - User authentication state
- `TaskContext.jsx` - Task data với useReducer

**Backend:**
- `models/User.js` - User data trong MongoDB
- `models/Task.js` - Task data trong MongoDB

## 🔗 API Endpoints

| Action | Frontend Method | Backend Route | 
|--------|----------------|---------------|
| Register | `authAPI.register()` | `POST /v1/api/register` |
| Login | `authAPI.login()` | `POST /v1/api/login` |
| Get Profile | `authAPI.getProfile()` | `GET /v1/api/account` |
| Update Profile | `authAPI.updateProfile()` | `PUT /v1/api/account` |
| Get Tasks | `taskAPI.getTasks()` | `GET /v1/api/tasks` |
| Create Task | `taskAPI.createTask()` | `POST /v1/api/tasks` |
| Update Task | `taskAPI.updateTask()` | `PUT /v1/api/tasks/:id` |
| Delete Task | `taskAPI.deleteTask()` | `DELETE /v1/api/tasks/:id` |

## 🚀 Development

**Backend:**
```bash
cd task-manager-backend
npm run dev  # Port 8080
```

**Frontend:**
```bash
cd task-manager-frontend  
npm run dev  # Port 5173
```

**Tech Stack:**
- Backend: Node.js + Express + MongoDB + JWT
- Frontend: React + Vite + Ant Design + Axios