# 🚀 Quick Start Guide - MERN Learning Platform

## ⚡ 5-Minute Setup

### Step 1: Backend Installation
```bash
cd backend
npm install
cp .env.example .env
```

### Step 2: Start MongoDB
```bash
# Windows with MongoDB installed
mongod

# OR use MongoDB Atlas (cloud)
# Update MONGODB_URI in .env
```

### Step 3: Seed Sample Data (Optional)
```bash
npm run seed
```

### Step 4: Start Backend
```bash
npm run dev
```
✅ Backend running at: http://localhost:5000

### Step 5: Frontend Installation
```bash
cd frontend
npm install
npm start
```
✅ Frontend running at: http://localhost:3000

---

## 📊 Project Overview

| Component | Technology | Port |
|-----------|-----------|------|
| Backend API | Node.js + Express | 5000 |
| Frontend | React 18 | 3000 |
| Database | MongoDB | 27017 |

---

## 🎯 Key Features

### ✅ Backend
- RESTful APIs for Students, Courses, Enrollments
- MongoDB with Mongoose ODM
- Many-to-Many student-course relationships
- Course capacity management
- Enrollment status tracking
- Progress monitoring

### ✅ Frontend
- Dashboard with student management
- Course listing and browsing
- Student registration form
- Enrollment management
- Real-time data fetching
- Responsive design

---

## 📝 API Quick Reference

### Health Check
```bash
GET http://localhost:5000/api/health
```

### Create Student
```bash
POST http://localhost:5000/api/students
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "123-456-7890"
}
```

### Get All Courses
```bash
GET http://localhost:5000/api/courses
```

### Enroll Student
```bash
POST http://localhost:5000/api/enrollments
{
  "studentId": "course_id_here",
  "courseId": "student_id_here"
}
```

---

## 🎨 Frontend Features

| Page | Features |
|------|----------|
| **Dashboard** | View all students, their enrollments, progress tracking |
| **Courses** | Browse all available courses, view details |
| **Register** | Register new students |
| **Enroll** | Enroll students in courses |

---

## 💾 Database Models

### Student
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  phone: String,
  enrolledCourses: [ObjectId],
  enrollmentDate: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Course
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  instructor: String,
  duration: Number,
  level: String,
  capacity: Number,
  enrolledStudents: [ObjectId],
  price: Number,
  category: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Enrollment
```javascript
{
  _id: ObjectId,
  student: ObjectId,
  course: ObjectId,
  enrollmentDate: Date,
  status: String,
  progress: Number,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔧 Environment Variables

Create `.env` in backend directory:
```
MONGODB_URI=mongodb://localhost:27017/learning-platform
PORT=5000
NODE_ENV=development
```

---

## 📦 Dependencies

### Backend
- express: Web framework
- mongoose: MongoDB ODM
- cors: Cross-origin requests
- dotenv: Environment variables
- nodemon: Auto-restart (dev)

### Frontend
- react: UI library
- axios: HTTP client
- react-router-dom: Routing

---

## 🧪 Testing with cURL

### Test API Connection
```bash
curl http://localhost:5000/api/health
```

### Create Test Student
```bash
curl -X POST http://localhost:5000/api/students \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","phone":"555-0000"}'
```

### Create Test Course
```bash
curl -X POST http://localhost:5000/api/courses \
  -H "Content-Type: application/json" \
  -d '{
    "title":"Test Course",
    "description":"Test Description",
    "instructor":"Test Instructor",
    "duration":10,
    "level":"Beginner",
    "capacity":30,
    "price":99,
    "category":"Test"
  }'
```

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| MongoDB connection error | Start MongoDB with `mongod` or update MONGODB_URI |
| Port 5000 in use | Change PORT in .env or kill process using port |
| API 404 errors | Ensure backend is running on port 5000 |
| CORS errors | Check proxy in frontend package.json |
| Module not found | Run `npm install` in both directories |

---

## 📚 Project Structure

```
mongodb/
├── backend/
│   ├── config/db.js
│   ├── models/(Student, Course, Enrollment).js
│   ├── controllers/(student, course, enrollment).js
│   ├── routes/(student, course, enrollment)Routes.js
│   ├── middleware/errorHandler.js
│   ├── server.js
│   ├── seed.js
│   ├── package.json
│   └── .env.example
│
└── frontend/
    ├── public/index.html
    ├── src/
    │   ├── components/(CourseList, StudentForm, EnrollmentForm).js
    │   ├── pages/Dashboard.js
    │   ├── services/api.js
    │   ├── styles/
    │   ├── App.js
    │   └── index.js
    └── package.json
```

---

## 🚀 Next Steps

1. ✅ Start backend and frontend
2. ✅ Test API endpoints
3. ✅ Register a test student
4. ✅ Create a test course
5. ✅ Enroll student in course
6. ✅ Monitor progress in dashboard

---

## 📖 Full Documentation

See:
- [README.md](./README.md) - Complete documentation
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment guide

---

**Ready to go!** Open http://localhost:3000 in your browser 🎉
