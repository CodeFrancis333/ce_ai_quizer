import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const QuizCard = ({ questionData }) => {
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div className="card shadow p-4 my-4">
      {questionData.image_url && (
        <img
          src={questionData.image_url}
          alt="Quiz Diagram"
          className="img-fluid mb-3"
        />
      )}
      <h5 className="card-title">{questionData.question}</h5>
      <div className="card-body">
        {["A", "B", "C", "D"].map((letter) => (
          <button
            key={letter}
            className={`btn btn-outline-primary w-100 text-start mb-2 ${
              selected === letter ? "active" : ""
            }`}
            onClick={() => setSelected(letter)}
            disabled={submitted}
          >
            {letter}. {questionData[`option_${letter.toLowerCase()}`]}
          </button>
        ))}

        {!submitted ? (
          <button
            className="btn btn-primary mt-3"
            onClick={handleSubmit}
            disabled={!selected}
          >
            Submit
          </button>
        ) : (
          <div className="mt-3">
            {selected === questionData.correct_answer ? (
              <div className="alert alert-success">
                <FontAwesomeIcon icon={faCheckCircle} /> Correct!
              </div>
            ) : (
              <div className="alert alert-danger">
                <FontAwesomeIcon icon={faTimesCircle} /> Incorrect. Correct answer:{" "}
                {questionData.correct_answer}
              </div>
            )}
            <button className="btn btn-info mt-2">
              View Step-by-Step Solution
            </button>
            <div className="mt-2">
              <p>
                <strong>Solution:</strong> {questionData.solution}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizCard;
