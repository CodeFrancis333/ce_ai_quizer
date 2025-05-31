// src/components/CategoryCard.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { generateQuiz } from "../services/api";
import { AuthContext } from "../context/AuthContext"; 
import LoginPromptModal from "./LoginPromptModal";

const CategoryCard = ({ category, label, description }) => {
  const [showModal, setShowModal] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleGenerateQuiz = async () => {
    // If not logged in, show the login prompt
    if (!token) {
      setShowLoginPrompt(true);
      return;
    }
    try {
      console.log("Generating quiz for category:", category);
      const data = await generateQuiz(category);
      console.log("Quiz generated successfully:", data);
      setShowModal(false);
      navigate("/quiz");
    } catch (error) {
      console.error("Error generating quiz:", error);
      alert("Error generating quiz. Please try again later.");
    }
  };

  return (
    <>
      <div
        className="card category-card mb-3"
        onClick={() => {
          if (!token) {
            setShowLoginPrompt(true);
          } else {
            setShowModal(true);
          }
        }}
        style={{ cursor: "pointer" }}
      >
        <div className="card-body">
          <h5 className="card-title">{label}</h5>
          <p className="card-text">{description}</p>
        </div>
      </div>

      {showModal && token && (
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
                  This quiz for <strong>{label}</strong> will include AI-generated
                  questions based on the selected category.
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

      {showLoginPrompt && !token && (
        <LoginPromptModal onClose={() => setShowLoginPrompt(false)} />
      )}
    </>
  );
};

export default CategoryCard;
