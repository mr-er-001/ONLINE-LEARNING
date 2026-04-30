require('dotenv').config();
const mongoose = require('mongoose');
const Student = require('./models/Student');
const Course = require('./models/Course');
const Enrollment = require('./models/Enrollment');
const connectDB = require('./config/db');

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Student.deleteMany({});
    await Course.deleteMany({});
    await Enrollment.deleteMany({});

    // Create sample courses
    const courses = await Course.insertMany([
      {
        title: 'Web Development Fundamentals',
        description: 'Learn HTML, CSS, and JavaScript basics for web development',
        instructor: 'Sarah Johnson',
        duration: 8,
        level: 'Beginner',
        capacity: 30,
        price: 99.99,
        category: 'Web Development',
      },
      {
        title: 'Advanced React.js',
        description: 'Master React hooks, context API, and performance optimization',
        instructor: 'Mike Chen',
        duration: 10,
        level: 'Advanced',
        capacity: 20,
        price: 149.99,
        category: 'Frontend',
      },
      {
        title: 'Node.js & Express',
        description: 'Build scalable backend applications with Node.js and Express',
        instructor: 'Emma Davis',
        duration: 10,
        level: 'Intermediate',
        capacity: 25,
        price: 129.99,
        category: 'Backend',
      },
      {
        title: 'MongoDB Mastery',
        description: 'Learn document-based database design and optimization',
        instructor: 'John Smith',
        duration: 6,
        level: 'Intermediate',
        capacity: 25,
        price: 89.99,
        category: 'Database',
      },
      {
        title: 'Full Stack MERN',
        description: 'Complete MERN stack development from frontend to database',
        instructor: 'Alex Martinez',
        duration: 16,
        level: 'Advanced',
        capacity: 15,
        price: 199.99,
        category: 'Full Stack',
      },
    ]);

    // Create sample students
    const students = await Student.insertMany([
      {
        name: 'Alice Johnson',
        email: 'alice@example.com',
        phone: '555-0101',
      },
      {
        name: 'Bob Williams',
        email: 'bob@example.com',
        phone: '555-0102',
      },
      {
        name: 'Carol White',
        email: 'carol@example.com',
        phone: '555-0103',
      },
      {
        name: 'David Brown',
        email: 'david@example.com',
        phone: '555-0104',
      },
      {
        name: 'Emma Wilson',
        email: 'emma@example.com',
        phone: '555-0105',
      },
    ]);

    // Create sample enrollments
    const enrollments = [
      { student: students[0]._id, course: courses[0]._id, status: 'Active', progress: 75 },
      { student: students[0]._id, course: courses[1]._id, status: 'Active', progress: 50 },
      { student: students[1]._id, course: courses[0]._id, status: 'Completed', progress: 100 },
      { student: students[1]._id, course: courses[2]._id, status: 'Active', progress: 60 },
      { student: students[2]._id, course: courses[3]._id, status: 'Active', progress: 40 },
      { student: students[3]._id, course: courses[4]._id, status: 'Active', progress: 30 },
      { student: students[4]._id, course: courses[0]._id, status: 'Active', progress: 90 },
      { student: students[4]._id, course: courses[2]._id, status: 'Active', progress: 45 },
    ];

    await Enrollment.insertMany(enrollments);

    // Update students' enrolledCourses array
    for (const enrollment of enrollments) {
      await Student.findByIdAndUpdate(
        enrollment.student,
        { $addToSet: { enrolledCourses: enrollment.course } }
      );
    }

    // Update courses' enrolledStudents array
    for (const enrollment of enrollments) {
      await Course.findByIdAndUpdate(
        enrollment.course,
        { $addToSet: { enrolledStudents: enrollment.student } }
      );
    }

    console.log('✅ Database seeded successfully!');
    console.log(`📚 Created ${courses.length} courses`);
    console.log(`👥 Created ${students.length} students`);
    console.log(`📝 Created ${enrollments.length} enrollments`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
