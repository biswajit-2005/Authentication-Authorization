import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import VerifyEmail from "./components/VerifyEmail";
import Dashboard from "./components/Dashboard";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";

function App() {
  const [user, setUser] = useState(null);

  const handleSignUpSuccess = () => {
    // Redirect logic handled by router navigation in components or here if needed
    // But since components use navigate hooks, we might just pass setters or handle state
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <div className="app">
        <div className="container">
          <Routes>
            <Route
              path="/signup"
              element={
                <SignUp
                  onSuccess={(user) => {
                    if (user) handleLoginSuccess(user); // Google login
                  }}
                />
              }
            />
            <Route
              path="/login"
              element={<Login onSuccess={handleLoginSuccess} />}
            />
            <Route path="/verify" element={<VerifyEmail />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/resetPassword/:token" element={<ResetPassword />} />
            <Route
              path="/dashboard"
              element={
                user ? (
                  <Dashboard user={user} onLogout={handleLogout} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/"
              element={<Navigate to={user ? "/dashboard" : "/login"} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
