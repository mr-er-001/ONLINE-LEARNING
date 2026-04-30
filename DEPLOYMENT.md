# MERN Learning Platform - Deployment Guide

## Prerequisites
- Node.js v14 or higher
- MongoDB v4.4 or higher
- npm or yarn

## Installation & Setup

### Backend

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your MongoDB URI and port
# MONGODB_URI=mongodb://localhost:27017/learning-platform
# PORT=5000

# Seed the database (optional - adds sample data)
npm run seed

# Start development server
npm run dev

# OR start production server
npm start
```

### Frontend

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

## Features Implemented

### Backend (REST API)
- ✅ Student Management (CRUD)
- ✅ Course Management (CRUD)
- ✅ Enrollment Management
- ✅ Many-to-Many Student-Course relationships
- ✅ MongoDB with Mongoose
- ✅ Express error handling
- ✅ CORS enabled
- ✅ Input validation

### Frontend (React)
- ✅ Student Registration Form
- ✅ Course Listing & Display
- ✅ Course Enrollment System
- ✅ Student Dashboard
- ✅ Enrollment Management
- ✅ Responsive UI Design
- ✅ Error Handling & Validation
- ✅ Real-time API Integration

## Database Seed Data

Run `npm run seed` in the backend directory to populate the database with:
- 5 Sample Courses (Web Dev, React, Node.js, MongoDB, MERN)
- 5 Sample Students
- 8 Sample Enrollments with various statuses

## API Documentation

### Base URL: http://localhost:5000/api

### Endpoints

#### Students
```
GET    /students              # Get all students
POST   /students              # Create new student
GET    /students/:id          # Get specific student
PUT    /students/:id          # Update student
DELETE /students/:id          # Delete student
GET    /students/:id/courses  # Get student's courses
```

#### Courses
```
GET    /courses                    # Get all courses
POST   /courses                    # Create new course
GET    /courses/:id                # Get specific course
PUT    /courses/:id                # Update course
DELETE /courses/:id                # Delete course
GET    /courses/category/:category # Get courses by category
```

#### Enrollments
```
GET    /enrollments                      # Get all enrollments
POST   /enrollments                      # Enroll student
GET    /enrollments/student/:studentId   # Get student enrollments
GET    /enrollments/course/:courseId     # Get course enrollments
PUT    /enrollments/:id                  # Update enrollment status
DELETE /enrollments/:id                  # Cancel enrollment
```

## Sample Requests

### Create Student
```bash
curl -X POST http://localhost:5000/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "555-0000"
  }'
```

### Create Course
```bash
curl -X POST http://localhost:5000/api/courses \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Web Development",
    "description": "Learn web development",
    "instructor": "Jane Smith",
    "duration": 12,
    "level": "Beginner",
    "capacity": 30,
    "price": 99.99,
    "category": "Web Development"
  }'
```

### Enroll Student
```bash
curl -X POST http://localhost:5000/api/enrollments \
  -H "Content-Type: application/json" \
  -d '{
    "studentId": "STUDENT_ID",
    "courseId": "COURSE_ID"
  }'
```

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod`
- Check MONGODB_URI in .env file
- Verify MongoDB credentials if using authentication

### Port Already in Use
- Change PORT in .env file (default: 5000)
- Or kill process using the port

### CORS Errors
- Ensure backend is running on correct port
- Check proxy setting in frontend package.json
- Verify CORS is enabled in server.js

### Module Not Found
- Run `npm install` in both backend and frontend directories
- Clear node_modules and reinstall if issues persist

## Production Deployment

### Backend
1. Set NODE_ENV=production
2. Use managed database (MongoDB Atlas, AWS DocumentDB, etc.)
3. Deploy to service like Heroku, AWS, DigitalOcean
4. Set appropriate environment variables

### Frontend
1. Build: `npm run build`
2. Deploy build folder to CDN or static hosting (Netlify, Vercel, AWS S3)
3. Update API URL to production backend

## Performance Tips

- Use database indexes for frequently queried fields
- Implement pagination for large datasets
- Cache frequently accessed data
- Use compression middleware
- Implement rate limiting

## Security Considerations

- Add JWT authentication for user security
- Implement input sanitization
- Use HTTPS in production
- Add request validation and sanitization
- Implement CSRF protection
- Use helmet.js for security headers
- Add proper error messages (don't expose sensitive data)
