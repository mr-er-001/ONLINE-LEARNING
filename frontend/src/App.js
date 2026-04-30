import React, { useState } from 'react';
import CourseList from './components/CourseList';
import StudentForm from './components/StudentForm';
import EnrollmentForm from './components/EnrollmentForm';
import Dashboard from './pages/Dashboard';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'courses':
        return <CourseList />;
      case 'register':
        return <StudentForm />;
      case 'enroll':
        return <EnrollmentForm />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="App">
      <header className="app-header">
        <div className="header-container">
          <h1>📚 Learning Platform</h1>
          <nav className="nav-menu">
            <button
              className={`nav-btn ${currentView === 'dashboard' ? 'active' : ''}`}
              onClick={() => setCurrentView('dashboard')}
            >
              Dashboard
            </button>
            <button
              className={`nav-btn ${currentView === 'courses' ? 'active' : ''}`}
              onClick={() => setCurrentView('courses')}
            >
              Courses
            </button>
            <button
              className={`nav-btn ${currentView === 'register' ? 'active' : ''}`}
              onClick={() => setCurrentView('register')}
            >
              Register Student
            </button>
            <button
              className={`nav-btn ${currentView === 'enroll' ? 'active' : ''}`}
              onClick={() => setCurrentView('enroll')}
            >
              Enroll
            </button>
          </nav>
        </div>
      </header>

      <main className="app-main">
        <div className="container">
          {renderView()}
        </div>
      </main>

      <footer className="app-footer">
        <p>&copy; 2024 Learning Platform. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
