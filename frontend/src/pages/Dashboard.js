import React, { useEffect, useState } from 'react';
import { studentAPI, enrollmentAPI } from '../services/api';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [studentsRes, enrollmentsRes] = await Promise.all([
        studentAPI.getAll(),
        enrollmentAPI.getAll(),
      ]);
      setStudents(studentsRes.data);
      setEnrollments(enrollmentsRes.data);
    } catch (err) {
      setError('Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteStudent = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await studentAPI.delete(id);
        fetchData();
      } catch (err) {
        alert('Failed to delete student');
      }
    }
  };

  const handleViewStudent = (student) => {
    setSelectedStudent(student);
  };

  if (loading) return <div className="loading">Loading dashboard...</div>;
  if (error) return <div className="error">{error}</div>;

  const studentEnrollments = selectedStudent
    ? enrollments.filter((e) => e.student._id === selectedStudent._id)
    : [];

  return (
    <div className="dashboard">
      <h1>Learning Platform Dashboard</h1>
      
      <div className="dashboard-container">
        <div className="students-section">
          <h2>Students ({students.length})</h2>
          <div className="students-list">
            {students.map((student) => (
              <div
                key={student._id}
                className={`student-item ${
                  selectedStudent?._id === student._id ? 'active' : ''
                }`}
              >
                <div onClick={() => handleViewStudent(student)}>
                  <h4>{student.name}</h4>
                  <p>{student.email}</p>
                  <span className="course-count">
                    {student.enrolledCourses.length} courses
                  </span>
                </div>
                <button
                  className="btn-delete"
                  onClick={() => handleDeleteStudent(student._id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>

        {selectedStudent && (
          <div className="details-section">
            <h2>Student Details</h2>
            <div className="student-details">
              <h3>{selectedStudent.name}</h3>
              <p><strong>Email:</strong> {selectedStudent.email}</p>
              <p><strong>Phone:</strong> {selectedStudent.phone || 'N/A'}</p>
              <p><strong>Enrolled Since:</strong> {new Date(selectedStudent.enrollmentDate).toLocaleDateString()}</p>
              
              <h3>Enrolled Courses ({studentEnrollments.length})</h3>
              <div className="enrollments-list">
                {studentEnrollments.length > 0 ? (
                  studentEnrollments.map((enrollment) => (
                    <div key={enrollment._id} className="enrollment-item">
                      <h4>{enrollment.course.title}</h4>
                      <p><strong>Instructor:</strong> {enrollment.course.instructor}</p>
                      <p><strong>Status:</strong> {enrollment.status}</p>
                      <p><strong>Progress:</strong> {enrollment.progress}%</p>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{ width: `${enrollment.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No courses enrolled</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
