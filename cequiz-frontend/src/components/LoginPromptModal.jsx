// src/components/LoginPromptModal.jsx
import React from "react";
import { Link } from "react-router-dom";

const LoginPromptModal = ({ onClose }) => {
  return (
    <div
      className="modal d-block"
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Authentication Required</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <p>Please log in or sign up to start a quiz.</p>
          </div>
          <div className="modal-footer">
            <Link className="btn btn-outline-primary" to="/login" onClick={onClose}>
              Login
            </Link>
            <Link className="btn btn-primary" to="/signup" onClick={onClose}>
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPromptModal;
