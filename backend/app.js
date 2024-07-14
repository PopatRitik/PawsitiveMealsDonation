import express from "express";
import router from "./routes/paymentRoutes.js";
import cors from "cors";
import dotenv from 'dotenv';


dotenv.config();

const app=express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api",router);

app.get("/api/getkey", (req, res) =>
     res.status(200).json(process.env.RAZORPAY_API_KEY)
   );

export default app;