📚 **MERN Learning Platform** - Complete Setup

## 📦 Project Structure

```
mongodb/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── studentController.js  # Student logic
│   │   ├── courseController.js   # Course logic
│   │   └── enrollmentController.js # Enrollment logic
│   ├── middleware/
│   │   └── errorHandler.js       # Error handling
│   ├── models/
│   │   ├── Student.js            # Student schema
│   │   ├── Course.js             # Course schema
│   │   └── Enrollment.js         # Enrollment schema
│   ├── routes/
│   │   ├── studentRoutes.js      # Student endpoints
│   │   ├── courseRoutes.js       # Course endpoints
│   │   └── enrollmentRoutes.js   # Enrollment endpoints
│   ├── .env.example              # Environment template
│   ├── package.json              # Backend dependencies
│   └── server.js                 # Express server
│
└── frontend/
    ├── public/
    │   └── index.html            # HTML template
    ├── src/
    │   ├── components/
    │   │   ├── CourseList.js      # Course display
    │   │   ├── StudentForm.js     # Student registration
    │   │   └── EnrollmentForm.js  # Enrollment form
    │   ├── pages/
    │   │   └── Dashboard.js       # Dashboard view
    │   ├── services/
    │   │   └── api.js             # API integration
    │   ├── styles/
    │   │   ├── CourseList.css     # Course styles
    │   │   ├── StudentForm.css    # Form styles
    │   │   ├── Dashboard.css      # Dashboard styles
    │   │   └── EnrollmentForm.css # Enrollment styles
    │   ├── App.js                 # Main component
    │   ├── App.css                # App styles
    │   ├── index.js               # React entry
    │   └── index.css              # Global styles
    └── package.json              # Frontend dependencies
```

---

## 🚀 Getting Started

### **Backend Setup**

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Create `.env` file** (from `.env.example`):
   ```
   MONGODB_URI=mongodb://localhost:27017/learning-platform
   PORT=5000
   NODE_ENV=development
   ```

3. **Start MongoDB** (ensure MongoDB is running):
   ```bash
   # Windows (if using MongoDB community)
   mongod
   ```

4. **Start the server:**
   ```bash
   npm run dev
   ```
   Server will run on: `http://localhost:5000`

### **Frontend Setup**

1. **Install dependencies:**
   ```bash
   cd frontend
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```
   Frontend will run on: `http://localhost:3000`

---

## 📡 API Endpoints

### **Students**
- `GET /api/students` - Get all students
- `GET /api/students/:id` - Get student by ID
- `GET /api/students/:id/courses` - Get student's courses
- `POST /api/students` - Create new student
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student

### **Courses**
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get course by ID
- `GET /api/courses/category/:category` - Get courses by category
- `POST /api/courses` - Create new course
- `PUT /api/courses/:id` - Update course
- `DELETE /api/courses/:id` - Delete course

### **Enrollments**
- `GET /api/enrollments` - Get all enrollments
- `GET /api/enrollments/student/:studentId` - Get enrollments for a student
- `GET /api/enrollments/course/:courseId` - Get enrollments for a course
- `POST /api/enrollments` - Enroll student in course
- `PUT /api/enrollments/:id` - Update enrollment status
- `DELETE /api/enrollments/:id` - Cancel enrollment

---

## 🗄️ Database Schema

### **Student**
```javascript
{
  name: String,
  email: String (unique),
  phone: String,
  enrolledCourses: [ObjectId refs to Course],
  enrollmentDate: Date,
  timestamps
}
```

### **Course**
```javascript
{
  title: String,
  description: String,
  instructor: String,
  duration: Number (weeks),
  level: String (Beginner/Intermediate/Advanced),
  capacity: Number,
  enrolledStudents: [ObjectId refs to Student],
  price: Number,
  category: String,
  timestamps
}
```

### **Enrollment**
```javascript
{
  student: ObjectId ref to Student,
  course: ObjectId ref to Course,
  enrollmentDate: Date,
  status: String (Active/Completed/Dropped),
  progress: Number (0-100),
  timestamps
}
```

---

## 🎨 Frontend Features

✅ **Dashboard** - View all students and their enrollment details
✅ **Course List** - Browse available courses
✅ **Student Registration** - Register new students
✅ **Course Enrollment** - Enroll students in courses
✅ **Responsive Design** - Works on all devices
✅ **Real-time Updates** - Live API integration

---

## 🧪 Testing the API

### **Create a Student:**
```bash
POST http://localhost:5000/api/students
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890"
}
```

### **Create a Course:**
```bash
POST http://localhost:5000/api/courses
Content-Type: application/json

{
  "title": "Web Development 101",
  "description": "Learn modern web development",
  "instructor": "Jane Smith",
  "duration": 12,
  "level": "Beginner",
  "capacity": 30,
  "price": 99.99,
  "category": "Web Development"
}
```

### **Enroll a Student:**
```bash
POST http://localhost:5000/api/enrollments
Content-Type: application/json

{
  "studentId": "{studentId}",
  "courseId": "{courseId}"
}
```

---

## 🔒 Key Features

✅ **Many-to-Many Relationships** - Students can enroll in multiple courses
✅ **RESTful API** - Clean, organized endpoints
✅ **Error Handling** - Comprehensive error messages
✅ **Validation** - Input validation on models
✅ **CORS Support** - Cross-origin requests enabled
✅ **Responsive UI** - Mobile-friendly interface
✅ **Course Capacity** - Limit students per course
✅ **Progress Tracking** - Monitor student progress

---

## 📝 Notes

- Ensure MongoDB is running before starting the backend
- Update `.env` file with your MongoDB URI
- Frontend runs on `3000`, Backend on `5000`
- All timestamps are automatic via Mongoose
- Unique student email ensures no duplicates
- Course capacity prevents over-enrollment

---

## 🆘 Troubleshooting

**Backend won't start:**
- Check if MongoDB is running
- Verify port 5000 is available
- Check `.env` file configuration

**Frontend won't connect to API:**
- Ensure backend is running on port 5000
- Check proxy setting in package.json
- Verify CORS is enabled in backend

**Database connection issues:**
- Verify MongoDB connection string
- Ensure MongoDB service is running
- Check network connectivity

---

Happy Learning! 📚
