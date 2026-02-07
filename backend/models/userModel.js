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
  password: {
    type: String,
    required: true,
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
});

const user = mongoose.model("user", userSchema);

export default user;
