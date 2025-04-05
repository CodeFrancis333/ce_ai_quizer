import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const ProfilePage = () => {
  const { token, setProfile, profile } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    display_name: "",
    bio: "",
    school: "",
    profile_pic: ""
  });

  useEffect(() => {
    if (token) {
      axios
        .get("http://127.0.0.1:8000/api/profile/", {
          headers: { Authorization: `Token ${token}` },
        })
        .then((res) => {
          setProfile(res.data);
          setFormData({
            display_name: res.data.display_name || res.data.username,
            bio: res.data.bio || "",
            school: res.data.school || "",
            profile_pic: res.data.profile_pic || ""
          });
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching profile:", err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [token, setProfile]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (token) {
      axios
        .patch("http://127.0.0.1:8000/api/profile/", formData, {
          headers: { Authorization: `Token ${token}` },
        })
        .then((res) => {
          setProfile(res.data);
          alert("Profile updated successfully!");
          setEditing(false);
        })
        .catch((err) => {
          console.error("Error updating profile:", err);
          alert("Error updating profile.");
        });
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!token) return <p>You must be logged in to view your profile.</p>;

  return (
    <div className="container py-5">
      <h2 className="mb-4">Your Profile</h2>

      {/* Top Row */}
      <div className="row">
        {/* Left Column: User Info */}
        <div className="col-md-6 mb-4">
          {editing ? (
            <div className="card">
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Display Name</label>
                    <input
                      type="text"
                      name="display_name"
                      className="form-control"
                      value={formData.display_name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Bio</label>
                    <textarea
                      name="bio"
                      className="form-control"
                      value={formData.bio}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">School</label>
                    <input
                      type="text"
                      name="school"
                      className="form-control"
                      value={formData.school}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Profile Picture URL</label>
                    <input
                      type="text"
                      name="profile_pic"
                      className="form-control"
                      value={formData.profile_pic}
                      onChange={handleChange}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary ms-2"
                    onClick={() => setEditing(false)}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div className="card position-relative profile-card">
              <div className="card-body d-flex">
                <img
                  src={profile.profile_pic || "https://via.placeholder.com/100"}
                  alt="Profile"
                  className="rounded-circle me-3"
                  style={{ width: "100px", height: "100px" }}
                />
                <div>
                  <h4>{profile.display_name || profile.username}</h4>
                  <p className="mb-1">{profile.school || "No school provided"}</p>
                  <p>{profile.bio || "No bio provided"}</p>
                </div>
              </div>
              {/* Overlay Edit Button */}
              <div className="edit-overlay" onClick={() => setEditing(true)}>
                <button className="btn btn-light btn-sm">Edit Profile</button>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Friends List */}
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-header">Friends</div>
            <ul className="list-group list-group-flush">
              {/* Dummy friend list; replace with actual data as needed */}
              <li className="list-group-item">Friend One</li>
              <li className="list-group-item">Friend Two</li>
              <li className="list-group-item">Friend Three</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Second Row */}
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-header">Your Stats</div>
            <div className="card-body">
              <p>
                <strong>Quizzes Taken:</strong> 10
              </p>
              <p>
                <strong>Correct Answers:</strong> 7
              </p>
              <p>
                <strong>Points Earned:</strong> 120
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-header">Achievements</div>
            <div className="card-body">
              <ul>
                <li>Achievement 1</li>
                <li>Achievement 2</li>
                <li>Achievement 3</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
