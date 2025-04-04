import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  // For demonstration, use dummy data.
  // Replace with an API call to /api/profile/ once authentication is set up.
  const [profile, setProfile] = useState({
    username: "John Doe",
    coin_balance: 100,
    profile_pic: "https://via.placeholder.com/40"
  });

  // Example for fetching the profile when using authentication:
  /*
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/profile/", {
      headers: { Authorization: "Token <YOUR_TOKEN_HERE>" }
    })
    .then(response => setProfile(response.data))
    .catch(error => console.error("Error fetching profile:", error));
  }, []);
  */

  return (
    <nav className="navbar navbar-expand-lg navbar-dark custom-navbar shadow-sm">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src="/logo.png" alt="Logo" style={{ height: "40px" }} />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
          <ul className="navbar-nav align-items-center">
            <li className="nav-item me-3">
              <span className="nav-link">
                <FontAwesomeIcon icon={faCoins} /> {profile.coin_balance} coins
              </span>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle d-flex align-items-center"
                href="#!"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src={profile.profile_pic}
                  alt="Profile"
                  className="rounded-circle me-2"
                  style={{ width: "40px", height: "40px" }}
                />
                {profile.username}
              </a>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                <li>
                  <Link className="dropdown-item" to="/profile">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/settings">
                    Settings
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link className="dropdown-item" to="/logout">
                    Logout
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
