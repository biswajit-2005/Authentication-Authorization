import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/auth";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Include cookies in requests
});

// Signup API
export const signUp = async (name, email, password, role) => {
  try {
    const response = await api.post("/signUp", {
      name,
      email,
      password,
      role,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Signup failed" };
  }
};

// Login API
export const login = async (email, password) => {
  try {
    const response = await api.post("/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Login failed" };
  }
};

// Verify Email API
export const verifyEmail = async (emailtoken) => {
  try {
    const response = await api.get("/verifyMail", {
      params: { emailtoken },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Verification failed" };
  }
};

// Refresh Token API
export const refreshAccessToken = async () => {
  try {
    const response = await api.get("/refreshToken");
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Token refresh failed" };
  }
};

// Logout API
export const logout = async () => {
  try {
    const response = await api.post("/logout");
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Logout failed" };
  }
};

// Google login API - send Google idToken to backend for verification
export const googleLogin = async (idToken) => {
  try {
    const response = await api.post("/googleLogin", { idToken });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Google login failed" };
  }
};

export const forgotPassword = async (email) => {
  try {
    const response = await api.post("/forgotPassword", { email });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to send reset email" };
  }
};

export const resetPassword = async (resetPasswordToken, password) => {
  try {
    const response = await api.post("/resetPassword", {
      resetPasswordToken,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to reset password" };
  }
};

export default api;
