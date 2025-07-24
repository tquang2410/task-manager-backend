# Task Manager - Full Stack Application
## 📝 Mô tả
Task Manager là ứng dụng quản lý công việc full-stack cho phép người dùng:
- Tạo, sửa, xóa tasks
- Quản lý profile cá nhân
- Authentication với JWT
- Responsive design với Ant Design
## ⚙️ Yêu cầu hệ thống
- Node.js >= 16.0.0
- MongoDB >= 5.0
- npm hoặc yarn

## 📁 Cấu trúc Project

```
**Frontend:**
task-manager-frontend/
├── src/
│   ├── components/  # Reusable components
│   ├── pages/      # Main pages
│   ├── hooks/      # Custom hooks
│   ├── store/      # Redux slices
│   └── api/        # API services

```
```
**Backend:**
task-manager-backend/
├── controllers/     # Business logic
├── models/         # Database schemas
├── routes/         # API routes
├── middleware/     # Auth, validation
└── config/         # Database config

```
## 🔄 Luồng tương tác Frontend ↔ Backend

### **Authentication**

**Register:**
Frontend: `RegisterForm.jsx` → Backend: `authController.js` → Frontend: `useAuth.js` → `authSlice.js`

**Login:**
Frontend: `LoginForm.jsx` → Backend: `authController.js` → Frontend: `useAuth.js` → `authSlice.js`

**Profile Update:**
Frontend: `ProfileForm.jsx` → Backend: `profileController.js` → Frontend: `useAuth.js` → `authSlice.js`

### **Task Management**

**Load Tasks:**
Frontend: `Tasks.jsx` → `useTask.js` → Backend: `taskController.js` → Frontend: `useTask.js` → `taskSlice.js`

**Create Task:**
Frontend: `TaskForm.jsx` → `useTask.js` → Backend: `taskController.js` → Frontend: `useTask.js` → `taskSlice.js`

**Update Task:**
Frontend: `TaskModal.jsx` → `useTask.js` → Backend: `taskController.js` → Frontend: `useTask.js` → `taskSlice.js`

**Delete Task:**
Frontend: `TaskList.jsx` → `useTask.js` → Backend: `taskController.js` → Frontend: `useTask.js` → `taskSlice.js`

## 🛡️ Security Flow

**Protected Routes:**
Frontend: `ProtectedRoute.jsx` → Backend: `middleware/auth.js` → Frontend: Components

**API Requests:**
Frontend: `axios.config.js` (add JWT) → Backend: `middleware/auth.js` (verify JWT) → Controllers

## 📊 State Management

**Frontend:**
- `authSlice.js` - User authentication state với Redux
- `taskSlice.js` - Task data với Redux
- `useAuth.js` - Custom hook cho authentication
- `useTask.js` - Custom hook cho task management

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
### Backend Setup:
```bash
cd task-manager-backend
npm install
cp .env.example .env  # Cấu hình database
npm run dev
```

**Tech Stack:**
- Backend: Node.js + Express + MongoDB + JWT
- Frontend: React + Vite + Ant Design + Axios