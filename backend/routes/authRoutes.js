import express from "express";
import {
  signUp,
  googleLogin,
  verifyMail,
  login,
  logout,
  refreshToken,
} from "../controller/authController.js";

const router = express.Router();

router.post("/signUp", signUp);

router.post("/googleLogin", googleLogin);

router.get("/verifyMail", verifyMail);

router.post("/login", login);

router.get("/refreshToken", refreshToken);

router.post("/logout", logout);

//router.post("/resetPassword" , resetPassword);

export default router;
