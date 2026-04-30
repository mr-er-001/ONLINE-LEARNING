import React, { useEffect, useState } from 'react';
import { courseAPI } from '../services/api';
import '../styles/CourseList.css';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const result = await courseAPI.getAll();
      setCourses(result.data);
    } catch (err) {
      setError('Failed to fetch courses');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading courses...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="course-list">
      <h2>Available Courses</h2>
      <div className="courses-grid">
        {courses.map((course) => (
          <div key={course._id} className="course-card">
            <div className="course-header">
              <h3>{course.title}</h3>
              <span className="course-level">{course.level}</span>
            </div>
            <p className="course-description">{course.description}</p>
            <div className="course-info">
              <div><strong>Instructor:</strong> {course.instructor}</div>
              <div><strong>Duration:</strong> {course.duration} weeks</div>
              <div><strong>Category:</strong> {course.category}</div>
              <div><strong>Price:</strong> ${course.price}</div>
              <div><strong>Enrolled:</strong> {course.enrolledStudents.length}/{course.capacity}</div>
            </div>
            <button 
              className="btn-enroll"
              disabled={course.enrolledStudents.length >= course.capacity}
            >
              {course.enrolledStudents.length >= course.capacity ? 'Course Full' : 'Enroll Now'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;
