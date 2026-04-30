import React, { useEffect, useState } from 'react';
import { studentAPI, courseAPI, enrollmentAPI } from '../services/api';
import '../styles/EnrollmentForm.css';

const EnrollmentForm = () => {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [studentsRes, coursesRes] = await Promise.all([
        studentAPI.getAll(),
        courseAPI.getAll(),
      ]);
      setStudents(studentsRes.data);
      setCourses(coursesRes.data);
    } catch (err) {
      setError('Failed to fetch data');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!selectedStudent || !selectedCourse) {
      setError('Please select both student and course');
      return;
    }

    try {
      setLoading(true);
      await enrollmentAPI.enrollStudent({
        studentId: selectedStudent,
        courseId: selectedCourse,
      });
      setSuccess('Student enrolled successfully!');
      setSelectedStudent('');
      setSelectedCourse('');
      fetchData();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to enroll student');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="enrollment-form">
      <h2>Enroll Student in Course</h2>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="student">Select Student</label>
          <select
            id="student"
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
            required
          >
            <option value="">-- Choose a student --</option>
            {students.map((student) => (
              <option key={student._id} value={student._id}>
                {student.name} ({student.email})
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="course">Select Course</label>
          <select
            id="course"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            required
          >
            <option value="">-- Choose a course --</option>
            {courses.map((course) => (
              <option key={course._id} value={course._id}>
                {course.title} ({course.category})
              </option>
            ))}
          </select>
        </div>

        <button type="submit" disabled={loading} className="btn-submit">
          {loading ? 'Enrolling...' : 'Enroll'}
        </button>
      </form>
    </div>
  );
};

export default EnrollmentForm;
