const Enrollment = require('../models/Enrollment');
const Student = require('../models/Student');
const Course = require('../models/Course');

// Enroll a student in a course
exports.enrollStudent = async (req, res) => {
  try {
    const { studentId, courseId } = req.body;

    // Check if student exists
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found',
      });
    }

    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
      });
    }

    // Check if course capacity is full
    if (course.enrolledStudents.length >= course.capacity) {
      return res.status(400).json({
        success: false,
        message: 'Course is at full capacity',
      });
    }

    // Check if already enrolled
    const existingEnrollment = await Enrollment.findOne({ student: studentId, course: courseId });
    if (existingEnrollment) {
      return res.status(400).json({
        success: false,
        message: 'Student already enrolled in this course',
      });
    }

    // Create enrollment
    const enrollment = new Enrollment({
      student: studentId,
      course: courseId,
    });

    // Add to student's enrolledCourses
    student.enrolledCourses.push(courseId);
    await student.save();

    // Add to course's enrolledStudents
    course.enrolledStudents.push(studentId);
    await course.save();

    const savedEnrollment = await enrollment.save();
    await savedEnrollment.populate(['student', 'course']);

    res.status(201).json({
      success: true,
      message: 'Student enrolled successfully',
      data: savedEnrollment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all enrollments
exports.getAllEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find()
      .populate('student', 'name email')
      .populate('course', 'title category');

    res.status(200).json({
      success: true,
      data: enrollments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get enrollments by student
exports.getEnrollmentsByStudent = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ student: req.params.studentId })
      .populate('student', 'name email')
      .populate('course', 'title description instructor');

    res.status(200).json({
      success: true,
      data: enrollments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get enrollments by course
exports.getEnrollmentsByCourse = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ course: req.params.courseId })
      .populate('student', 'name email phone')
      .populate('course', 'title instructor');

    res.status(200).json({
      success: true,
      data: enrollments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update enrollment status
exports.updateEnrollmentStatus = async (req, res) => {
  try {
    const { status, progress } = req.body;
    const enrollment = await Enrollment.findByIdAndUpdate(
      req.params.id,
      { status, progress },
      { new: true, runValidators: true }
    ).populate('student', 'name email').populate('course', 'title');

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: 'Enrollment not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Enrollment updated successfully',
      data: enrollment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Cancel enrollment (drop course)
exports.cancelEnrollment = async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id);
    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: 'Enrollment not found',
      });
    }

    const { student: studentId, course: courseId } = enrollment;

    // Remove from student's enrolledCourses
    await Student.findByIdAndUpdate(
      studentId,
      { $pull: { enrolledCourses: courseId } }
    );

    // Remove from course's enrolledStudents
    await Course.findByIdAndUpdate(
      courseId,
      { $pull: { enrolledStudents: studentId } }
    );

    // Delete enrollment
    await Enrollment.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Enrollment cancelled successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
