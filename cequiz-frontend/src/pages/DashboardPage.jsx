import React from "react";
import { Link } from "react-router-dom";
import CategoryCard from "../components/CategoryCard";

const topCategories = [
  { value: "Calculus", label: "Calculus", description: "Basics and definitions" },
  { value: "Differential Equations", label: "Differential Equations", description: "Problem solving techniques" },
  { value: "EDA", label: "Engineering Data Analysis", description: "Data analysis methods" },
  { value: "Numerical Methods", label: "Numerical Methods", description: "Numerical techniques" },
];

const leaderboard = [
  { name: "User A", points: 150, profilePic: "https://via.placeholder.com/40" },
  { name: "User B", points: 120, profilePic: "https://via.placeholder.com/40" },
  { name: "User C", points: 100, profilePic: "https://via.placeholder.com/40" },
];

const DashboardPage = () => {
  return (
    <div className="container py-5">
      {/* Main row with two columns: Left (col-md-8) and Right (col-md-4) */}
      <div className="row">
        {/* Left Column */}
        <div className="col-md-8">
          {/* User statistics */}
          <div className="mb-4">
            <h1 className="text-primary">Dashboard</h1>
            <p>
              Your coin balance: <strong>100</strong>
            </p>
            <Link to="/quiz" className="btn btn-success">
              Start Random Quiz
            </Link>
          </div>

          {/* Top Categories Section */}
          <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3 className="mb-0">Top Categories</h3>
              <Link to="/categories" className="btn btn-outline-primary">
                View More Categories
              </Link>
            </div>
            <div className="row">
              {topCategories.map((cat) => (
                <div key={cat.value} className="col-md-6 mb-3">
                  <CategoryCard
                    category={cat.value}
                    label={cat.label}
                    description={cat.description}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Leaderboard */}
        <div className="col-md-4">
          <h3 className="mb-3">Leader Board</h3>
          <ul className="list-group">
            {leaderboard.map((user, index) => (
              <li key={index} className="list-group-item d-flex align-items-center">
                <img
                  src={user.profilePic}
                  alt={user.name}
                  className="rounded-circle me-3"
                  style={{ width: "40px", height: "40px" }}
                />
                <div>
                  <strong>{user.name}</strong>
                  <div>{user.points} points</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
