const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.sendOTPEmail = async (email, otp) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your Login OTP",
      html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
                    <h2 style="color: #2c3e50;">Your Login OTP</h2>
                    <p>Please use the following OTP to complete your login:</p>
                    <h1 style="color: #3498db; font-size: 32px; letter-spacing: 2px;">${otp}</h1>
                    <p>This OTP will expire in 10 minutes.</p>
                </div>
            `,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw error;
  }
};
