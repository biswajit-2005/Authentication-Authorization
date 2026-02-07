import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  provider: {
    type: String,
    enum: ["local", "google", "facebook"],
    default: "local",
  },
  providerId: {
    type: String,
  },
  password: {
    type: String,
    required: function () {
      return this.provider === "local";
    },
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  isVerified: {
    type: Boolean,
    default: false, //make false after email sending implemented
  },
  refreshToken: {
    type: String,
  },
  resetPasswordToken: String,
  resetPasswordTokenExpiry: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const user = mongoose.model("user", userSchema);

export default user;
