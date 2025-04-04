import React from "react";
import { Link } from "react-router-dom";

const DashboardPage = () => {
  return (
    <div className="container py-5">
      <h1 className="mb-4 text-primary">Dashboard</h1>
      <p>
        Your coin balance: <strong>100</strong>
      </p>
      <div className="mb-3">
        <Link to="/quiz" className="btn btn-success">
          Start New Quiz
        </Link>
      </div>
      <div>
        <h3>Categories</h3>
        <ul className="list-group">
          <li className="list-group-item">Structural Engineering</li>
          <li className="list-group-item">Soil Mechanics</li>
          <li className="list-group-item">Hydraulics</li>
        </ul>
      </div>
      <div className="mt-4">
        <h3>Leader Board</h3>
        <ul className="list-group">
          <li className="list-group-item">User A - 150 coins</li>
          <li className="list-group-item">User B - 120 coins</li>
          <li className="list-group-item">User C - 100 coins</li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardPage;
