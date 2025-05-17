// utils/sendEmail.js
import nodemailer from "nodemailer";
import process from "process";

export const sendBookingEmail = async ({ name, email, className }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Fitness Zone" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your Class Booking Confirmation",
    html: `
      <h2>Hello ${name},</h2>
      <p>Your booking for <strong>${className}</strong> has been received.</p>
      <p>Thank you for choosing Fitness Zone 💪🏾</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};
