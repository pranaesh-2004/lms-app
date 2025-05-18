import React from 'react';
import { Link } from 'react-router-dom';

export default function CourseList({ courses }) {
  return (
    <div>
      <h2>Available Courses</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 20
      }}>
        {courses.map(course => (
          <div key={course.id} style={{
            border: '1px solid #ddd',
            borderRadius: 8,
            padding: 16,
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
          }}>
            <img
              src={course.image}
              alt={course.title}
              style={{ width: '100%', height: 160, objectFit: 'cover', borderRadius: 4 }}
            />
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <Link to={`/courses/${course.id}`}>
              <button style={{ marginTop: 10 }}>View Details</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
