import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import QuizCard from "../components/QuizCard";
import { fetchQuizzes } from "../services/api";

const QuizPage = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuizzes().then((data) => {
      setQuizzes(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="container py-5">
      <h1 className="mb-4 text-primary">Quiz</h1>
      {loading ? (
        <p>Loading...</p>
      ) : quizzes.length > 0 ? (
        <QuizCard questionData={quizzes[0]} />
      ) : (
        <p>No quiz data available.</p>
      )}
      <div className="mt-3">
        <Link to="/" className="btn btn-secondary">
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default QuizPage;
