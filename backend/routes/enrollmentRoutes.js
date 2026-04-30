const express = require('express');
const router = express.Router();
const {
  enrollStudent,
  getAllEnrollments,
  getEnrollmentsByStudent,
  getEnrollmentsByCourse,
  updateEnrollmentStatus,
  cancelEnrollment,
} = require('../controllers/enrollmentController');

router.post('/', enrollStudent);
router.get('/', getAllEnrollments);
router.get('/student/:studentId', getEnrollmentsByStudent);
router.get('/course/:courseId', getEnrollmentsByCourse);
router.put('/:id', updateEnrollmentStatus);
router.delete('/:id', cancelEnrollment);

module.exports = router;
