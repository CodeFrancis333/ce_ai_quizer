import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import CategorySelectorPage from "./pages/CategorySelectorPage";
import QuizPage from "./pages/QuizPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage"; // Added settings page route
import Navbar from "./components/Navbar";
import PublicRoute from "./components/PublicRoute";
import { AuthProvider } from "./context/AuthContext";  // Wrap your app with AuthProvider

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/categories" element={<CategorySelectorPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <SignupPage />
              </PublicRoute>
            }
          />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} /> {/* New route */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
