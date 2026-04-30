import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Student API calls
export const studentAPI = {
  getAll: async () => {
    const response = await axios.get(`${API_BASE_URL}/students`);
    return response.data;
  },
  getById: async (id) => {
    const response = await axios.get(`${API_BASE_URL}/students/${id}`);
    return response.data;
  },
  create: async (studentData) => {
    const response = await axios.post(`${API_BASE_URL}/students`, studentData);
    return response.data;
  },
  update: async (id, studentData) => {
    const response = await axios.put(`${API_BASE_URL}/students/${id}`, studentData);
    return response.data;
  },
  delete: async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/students/${id}`);
    return response.data;
  },
  getEnrolledCourses: async (id) => {
    const response = await axios.get(`${API_BASE_URL}/students/${id}/courses`);
    return response.data;
  },
};

// Course API calls
export const courseAPI = {
  getAll: async () => {
    const response = await axios.get(`${API_BASE_URL}/courses`);
    return response.data;
  },
  getById: async (id) => {
    const response = await axios.get(`${API_BASE_URL}/courses/${id}`);
    return response.data;
  },
  create: async (courseData) => {
    const response = await axios.post(`${API_BASE_URL}/courses`, courseData);
    return response.data;
  },
  update: async (id, courseData) => {
    const response = await axios.put(`${API_BASE_URL}/courses/${id}`, courseData);
    return response.data;
  },
  delete: async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/courses/${id}`);
    return response.data;
  },
  getByCategory: async (category) => {
    const response = await axios.get(`${API_BASE_URL}/courses/category/${category}`);
    return response.data;
  },
};

// Enrollment API calls
export const enrollmentAPI = {
  getAll: async () => {
    const response = await axios.get(`${API_BASE_URL}/enrollments`);
    return response.data;
  },
  enrollStudent: async (enrollmentData) => {
    const response = await axios.post(`${API_BASE_URL}/enrollments`, enrollmentData);
    return response.data;
  },
  getByStudent: async (studentId) => {
    const response = await axios.get(`${API_BASE_URL}/enrollments/student/${studentId}`);
    return response.data;
  },
  getByCourse: async (courseId) => {
    const response = await axios.get(`${API_BASE_URL}/enrollments/course/${courseId}`);
    return response.data;
  },
  updateStatus: async (enrollmentId, statusData) => {
    const response = await axios.put(`${API_BASE_URL}/enrollments/${enrollmentId}`, statusData);
    return response.data;
  },
  cancel: async (enrollmentId) => {
    const response = await axios.delete(`${API_BASE_URL}/enrollments/${enrollmentId}`);
    return response.data;
  },
};

export default { studentAPI, courseAPI, enrollmentAPI };
