import React, { useState, useEffect } from "react";
import { login, googleLogin } from "../api";
import "./AuthForm.css";

function Login({ onSuccess }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await login(formData.email, formData.password);
      setSuccess(response.message);
      setFormData({ email: "", password: "" });
      setTimeout(() => onSuccess(response.user), 1500);
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    if (!window.google || !clientId) return;

    const handleCredentialResponse = async (response) => {
      try {
        const res = await googleLogin(response.credential);
        setSuccess(res.message);
        setTimeout(() => onSuccess(res.user), 1500);
      } catch (err) {
        setError(err.message || "Google login failed");
      }
    };

    window.google.accounts.id.initialize({
      client_id: clientId,
      callback: handleCredentialResponse,
    });
    window.google.accounts.id.renderButton(
      document.getElementById("googleSignInDiv-login"),
      { theme: "outline", size: "large" },
    );
  }, [onSuccess]);

  return (
    <div className="auth-form">
      <h2>Login</h2>
      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <div id="googleSignInDiv-login" style={{ marginTop: 12 }} />
    </div>
  );
}

export default Login;
