import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateQuiz } from "../services/api";

const CategoryCard = ({ category, label, description }) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleGenerateQuiz = async () => {
    try {
      // Call your backend API to generate quiz questions for this category.
      await generateQuiz(category);
      setShowModal(false);
      // Navigate to the Quiz page.
      navigate("/quiz");
    } catch (error) {
      console.error("Error generating quiz:", error);
    }
  };

  return (
    <>
      <div
        className="card category-card mb-3"
        onClick={() => setShowModal(true)}
        style={{ cursor: "pointer" }}
      >
        <div className="card-body">
          <h5 className="card-title">{label}</h5>
          <p className="card-text">{description}</p>
        </div>
      </div>

      {showModal && (
        <div
          className="modal d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{label} Quiz Details</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  This quiz for <strong>{label}</strong> will include AI-generated questions based on the selected category.
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleGenerateQuiz}
                >
                  Generate Quiz
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CategoryCard;
