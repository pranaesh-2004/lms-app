import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function Assessment({ courses }) {
  const { id } = useParams();
  const course = courses.find(c => c.id === id);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  if (!course) return <p>Course not found.</p>;

  const handleChange = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
  };

  const score = course.questions.reduce((acc, q) => {
    if (
      answers[q.id] &&
      answers[q.id].trim().toLowerCase() === q.answer.trim().toLowerCase()
    ) {
      return acc + 1;
    }
    return acc;
  }, 0);

  return (
    <div>
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
      <h2>Assessment: {course.title}</h2>
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          {course.questions.map(q => (
            <div key={q.id} className="question-block">
              <label><strong>{q.question}</strong></label>
              <input
                type="text"
                value={answers[q.id] || ''}
                onChange={e => handleChange(q.id, e.target.value)}
                required
              />
            </div>
          ))}
          <button type="submit" className="submit-btn">Submit Answers</button>
        </form>
      ) : (
        <div className="results">
          <h3>
            You scored {score} out of {course.questions.length}
          </h3>
          <button className="assessment-btn" onClick={() => setSubmitted(false)}>
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}
