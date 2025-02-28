const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const OTP = require("../models/OTP");
const { generateOTP } = require("../utils/otpGenerator");
const { sendOTPEmail } = require("../utils/emailService");

exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, companyName, dateOfBirth } =
      req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Process the uploaded image
    if (!req.file) {
      return res.status(400).json({ message: "Profile image is required" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      companyName,
      dateOfBirth,
      profileImage: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
    });

    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Sorry, we can't log you in" });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Sorry, we can't log you in" });
    }

    // Generate OTP
    const otp = generateOTP();

    // Save OTP
    const otpDoc = new OTP({
      userId: user._id,
      otp,
    });
    await otpDoc.save();

    try {
      // Send OTP via email
      await sendOTPEmail(email, otp);

      res.json({
        message: "OTP sent successfully",
        userId: user._id,
      });
    } catch (emailError) {
      // If email fails, delete the saved OTP
      await OTP.deleteOne({ _id: otpDoc._id });
      console.error("Failed to send email:", emailError);
      throw new Error("Failed to send OTP email");
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      message: "Server error",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : "An error occurred during login",
    });
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    const { userId, otp } = req.body;

    const otpDoc = await OTP.findOne({
      userId,
      otp,
      createdAt: { $gt: new Date(Date.now() - 10 * 60 * 1000) },
    });

    if (!otpDoc) {
      return res.status(401).json({ message: "Invalid or expired OTP" });
    }

    const token = jwt.sign({ userId: userId }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    await OTP.deleteOne({ _id: otpDoc._id });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
