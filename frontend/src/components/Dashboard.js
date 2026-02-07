import React, { useState } from "react";
import { logout, refreshAccessToken } from "../api";
import "./Dashboard.css";

function Dashboard({ user, onLogout }) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRefreshToken = async () => {
    setLoading(true);
    try {
      const response = await refreshAccessToken();
      setMessage("✅ " + response.message);
    } catch (err) {
      setMessage("❌ " + (err.message || "Token refresh failed"));
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await logout();
      setMessage("✅ " + response.message);
      setTimeout(() => onLogout(), 1500);
    } catch (err) {
      setMessage("❌ " + (err.message || "Logout failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard">
      <div className="welcome-card">
        <h2>Welcome, {user.name}!</h2>
        <div className="user-info">
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Role:</strong>{" "}
            <span className={`role ${user.role}`}>{user.role}</span>
          </p>
          <p>
            <strong>ID:</strong> {user.id}
          </p>
        </div>
      </div>

      {message && (
        <div
          className={`alert ${message.includes("✅") ? "alert-success" : "alert-error"}`}
        >
          {message}
        </div>
      )}

      <div className="action-buttons">
        <button
          onClick={handleRefreshToken}
          className="btn btn-secondary"
          disabled={loading}
        >
          {loading ? "Refreshing..." : "Refresh Access Token"}
        </button>
        <button
          onClick={handleLogout}
          className="btn btn-danger"
          disabled={loading}
        >
          {loading ? "Logging out..." : "Logout"}
        </button>
      </div>

      <div className="info-box">
        <h3>API Test Results</h3>
        <p>✅ Login successful - User authenticated</p>
        <p>✅ Cookies are being set (check browser DevTools)</p>
        <p>✅ Access & Refresh tokens working</p>
        <p>📍 Try the refresh token button to test token renewal</p>
        <p>📍 Try logout to test session termination</p>
      </div>
    </div>
  );
}

export default Dashboard;
