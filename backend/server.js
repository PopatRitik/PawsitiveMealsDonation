import app from "./app.js";
import Razorpay from "razorpay";
import { connectDB } from "./config/database.js";
import express from "express";
import path from "path";
import job from "./cron/cron.js"

connectDB();

job.start();

const __dirname = path.resolve();

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  // Serve the frontend
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

app.listen(process.env.PORT, () => console.log(`Server is running on ${process.env.PORT}`))

export default instance;