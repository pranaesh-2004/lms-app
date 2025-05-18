import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from 'react-router-dom';

import Register from './components/Register';
import Login from './components/Login';

import CourseList from './components/CourseList';
import CourseDetails from './components/CourseDetails';
import Assessment from './components/Assessment';

import defaultCourses from './data/courses'; // ✅ Correct path to your course data

export default function App() {
  const [user, setUser] = useState(localStorage.getItem('loggedInUser') || null);

  // ✅ Initialize courses from localStorage or fallback to defaultCourses
  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem('courses');
    return saved ? JSON.parse(saved) : defaultCourses;
  });

  // ✅ Keep localStorage in sync with state
  useEffect(() => {
    localStorage.setItem('courses', JSON.stringify(courses));
  }, [courses]);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setUser(null);
  };

  // ✅ Authentication wrapper
  const RequireAuth = ({ children }) => {
    if (!user) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <Router>
      <div className="app" style={{ maxWidth: 960, margin: 'auto', padding: 20 }}>
        <header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 20,
          }}
        >
          <h1>LMS App</h1>

          {user ? (
            <div>
              <span>
                Welcome, <strong>{user}</strong>
              </span>
              <button
                className="logout-btn"
                onClick={handleLogout}
                style={{ marginLeft: 15 }}
              >
                Logout
              </button>
            </div>
          ) : (
            <nav>
              <Link className="link" to="/login" style={{ marginRight: '1rem' }}>
                Login
              </Link>
              <Link className="link" to="/register">
                Register
              </Link>
            </nav>
          )}
        </header>

        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth>
                <CourseList courses={courses} />
              </RequireAuth>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route
            path="/courses/:id"
            element={
              <RequireAuth>
                <CourseDetails courses={courses} />
              </RequireAuth>
            }
          />
          <Route
            path="/courses/:id/assessment"
            element={
              <RequireAuth>
                <Assessment courses={courses} />
              </RequireAuth>
            }
          />
          {/* ✅ Redirect unknown routes */}
          <Route path="*" element={<Navigate to={user ? '/' : '/login'} />} />
        </Routes>
      </div>
    </Router>
  );
}
