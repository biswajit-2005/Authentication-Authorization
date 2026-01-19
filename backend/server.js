import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDb from "./config/db.js";
const app = express();
dotenv.config();
const port = process.env.PORT || 5000;

app.use(
  cors({
    credentials: true,
    origin: [process.env.CLIENT_URL, "http://localhost:3000"], //list of urls that can access the api
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
  connectDb();
});
