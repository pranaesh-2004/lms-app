// src/components/CourseDetails.js
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

export default function CourseDetails({ courses }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const course = courses.find((c) => c.id === id);

  if (!course) {
    return <p>Course not found</p>;
  }

  return (
    <div>
      <button onClick={() => navigate(-1)} style={{ marginBottom: 10 }}>
        ← Back
      </button>
      <h2>{course.title}</h2>
      <img
        src={course.image}
        alt={course.title}
        style={{ width: '100%', maxWidth: 400, borderRadius: 6 }}
      />
      <p>{course.description}</p>
      <ul>
        <li>
          <strong>Instructor:</strong> {course.instructor}
        </li>
        <li>
          <strong>Duration:</strong> {course.duration}
        </li>
        <li>
          <strong>Level:</strong> {course.level}
        </li>
        <li>
          <strong>Enrolled:</strong> {course.enrolled}
        </li>
        <li>
          <strong>Tags:</strong>{' '}
          {Array.isArray(course.tags) ? course.tags.join(', ') : 'No tags available'}
        </li>
      </ul>

      <Link to={`/courses/${id}/assessment`}>
        <button>Go to Assessment</button>
      </Link>
    </div>
  );
}
