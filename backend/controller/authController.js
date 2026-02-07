import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateAccessToken, generateRefreshToken } from "../utils/token.js";
import { sendEmail } from "../utils/email.js";

export const signUp = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "all fields are required" });
    }
    const userexist = await User.findOne({ email });
    if (userexist) {
      return res.status(400).json({ message: "user already exist" });
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashPassword,
      role,
    });
    //send mail
    const emailtoken = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_EMAIL_KEY,
      {
        expiresIn: "1d",
      },
    );

    const url = `http://localhost:3000/verify/${emailtoken}`;
    await sendEmail(user.email, url);
    //
    res
      .status(200)
      .json({ message: "user created successfully , Verify your mail." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "all fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "user does not exist" });
    }
    const ismatch = await bcrypt.compare(password, user.password);
    if (!ismatch) {
      return res.status(400).json({ message: "password not match" });
    }
    if (!user.isVerified) {
      return res.status(400).json({
        message: "user is not verified, check your email and verify.",
      });
    }
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    //save refresh token in db
    user.refreshToken = refreshToken;
    await user.save();
    //send access and refresh token in cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });
    res.status(200).json({
      message: "user logged in successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Login failed" });
  }
};

export const verifyMail = async (req, res) => {
  try {
    const { emailtoken } = req.query;
    if (!emailtoken) {
      return res.status(400).json({ message: "token not found" });
    }
    const decoded = jwt.verify(emailtoken, process.env.JWT_EMAIL_KEY);

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }
    if (user.isVerified) {
      return res.status(400).json({ message: "user already verified" });
    }

    user.isVerified = true;
    await user.save();
    res
      .status(200)
      .json({ message: "user verified successfully.You can now Login" });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message:
        "Invalid or expired token. Please register/request a new verification email.",
    });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token Missing." });
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY);
    if (!decoded) {
      return res.status(403).json({ message: "Invalid refresh token." });
    }
    const user = await User.findById(decoded.id);
    if (!user || user.refreshToken !== refreshToken) {
      return res
        .status(403)
        .json({ message: "user not found or invalid refresh token." });
    }

    //generate new access token
    const accessToken = generateAccessToken(user);
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });
    res.status(200).json({ message: "Token refreshed successfully." });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Invalid or expired refresh token. Please Login" });
  }
};

export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");

      return res.status(200).json({
        message: "user logged out successfully,but token already missing",
      });
    }

    const user = await User.findOne({ refreshToken });
    user.refreshToken = null;
    await user.save();
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });
    res.status(200).json({ message: "user logged out successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Logout failed" });
  }
};
