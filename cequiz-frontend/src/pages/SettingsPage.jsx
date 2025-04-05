import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const SettingsPage = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    current_password: "",
    new_password: "",
    confirm_password: ""
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (formData.new_password !== formData.confirm_password) {
      setMessage("New passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.patch(
        "http://127.0.0.1:8000/api/settings/",
        formData,
        { headers: { Authorization: `Token ${token}` } }
      );
      setMessage(res.data.message);
      // Optionally, you can log the user out after password change.
    } catch (error) {
      console.error("Error changing password:", error);
      if (error.response && error.response.data && error.response.data.error) {
        setMessage(error.response.data.error);
      } else {
        setMessage("Error changing password.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!token) return <p>You must be logged in to change your password.</p>;

  return (
    <div className="container py-5">
      <h2>Change Password</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Current Password</label>
          <input
            type="password"
            name="current_password"
            className="form-control"
            value={formData.current_password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">New Password</label>
          <input
            type="password"
            name="new_password"
            className="form-control"
            value={formData.new_password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Confirm New Password</label>
          <input
            type="password"
            name="confirm_password"
            className="form-control"
            value={formData.confirm_password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Saving..." : "Change Password"}
        </button>
      </form>
    </div>
  );
};

export default SettingsPage;
