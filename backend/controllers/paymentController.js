import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import instance from "../server.js";
import crypto from "crypto";
import { Payment } from "../models/paymentModel.js";
import nodemailer from "nodemailer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});

const checkout = async (req, res) => {
    const { amount, email } = req.body;

    const options = {
        amount: Number(amount * 100),
        currency: "INR",
    };

    try {
        const order = await instance.orders.create(options);
        console.log(order);
        res.status(200).json({
            success: true,
            order,
            email
        });
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({
            success: false,
            error: "Internal Server Error"
        });
    }
};

const paymentVerification = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const email = req.query.email;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    
    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
        .update(body.toString())
        .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
        const payment = await Payment.create({
             razorpay_order_id,
             razorpay_payment_id,
             razorpay_signature,
             email
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Payment Successful',
            text: `Thank you for donating 🙏. Your payment was successful. Reference ID: ${razorpay_payment_id}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error sending email:", error);
                res.status(500).json({
                    success: false,
                    error: "Error sending email"
                });
            } else {
                console.log('Email sent: ' + info.response);
                res.status(200).json({
                    success: true,
                    message: "Email sent successfully"
                });
            }
        });        

        res.redirect(
            `http://localhost:4000/paymentsuccess?reference=${razorpay_payment_id}`
        );
    } else {
        res.status(400).json({
            success: false,
        });
    }
};

export { checkout, paymentVerification };
