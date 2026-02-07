import React, { useState } from "react";
import "./App.css";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import VerifyEmail from "./components/VerifyEmail";
import Dashboard from "./components/Dashboard";

function App() {
  const [currentPage, setCurrentPage] = useState("signup");
  const [user, setUser] = useState(null);

  const handleSignUpSuccess = () => {
    setCurrentPage("verify");
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setCurrentPage("dashboard");
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage("login");
  };

  return (
    <div className="app">
      <div className="container">
        {currentPage === "signup" && (
          <div>
            <SignUp onSuccess={handleSignUpSuccess} />
            <p className="toggle-page">
              Already have an account?{" "}
              <button onClick={() => setCurrentPage("login")}>Login</button>
            </p>
          </div>
        )}

        {currentPage === "login" && (
          <div>
            <Login onSuccess={handleLoginSuccess} />
            <p className="toggle-page">
              Don't have an account?{" "}
              <button onClick={() => setCurrentPage("signup")}>Sign Up</button>
            </p>
          </div>
        )}

        {currentPage === "verify" && (
          <div>
            <VerifyEmail />
            <p className="toggle-page">
              <button onClick={() => setCurrentPage("login")}>
                Back to Login
              </button>
            </p>
          </div>
        )}

        {currentPage === "dashboard" && user && (
          <Dashboard user={user} onLogout={handleLogout} />
        )}
      </div>
    </div>
  );
}

export default App;
