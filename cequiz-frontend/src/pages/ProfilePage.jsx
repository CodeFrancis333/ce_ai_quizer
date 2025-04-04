import React, { useState, useEffect } from "react";
import axios from "axios";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace with actual API call and auth headers when available.
    axios.get("http://127.0.0.1:8000/api/profile/")
      .then(response => {
        setProfile(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching profile:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!profile) return <p>Error loading profile.</p>;

  return (
    <div className="container py-5">
      <h2>Profile</h2>
      <p>
        <strong>Username:</strong> {profile.username}
      </p>
      <p>
        <strong>Coin Balance:</strong> {profile.coin_balance}
      </p>
      {/* Additional fields and update functionality can be added here */}
    </div>
  );
};

export default ProfilePage;
