const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");


// ======================
// USER REGISTER
// ======================
exports.registerUser = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      address,
      password,
      confirmPassword
    } = req.body;

    // 1. Validation
    if (!fullName || !email || !phone || !password || !confirmPassword) {
      return res.status(400).json({
        message: "All required fields must be filled"
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters"
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match"
      });
    }

    // 2. Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "Email already registered"
      });
    }

    // 3. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Save user
    const user = await User.create({
      fullName,
      email,
      phone,
      address,
      password: hashedPassword,
      role: "USER"
    });

    await sendEmail(
  email,
  "🎉 Welcome to City Navigator",
  `
    <h2>Hello ${fullName} 👋</h2>

    <p>Welcome to <b>City Navigator</b>!</p>

    <p>You can now explore local services, book vendors, and manage your profile easily.</p>

    <br/>
    <p>We’re excited to have you with us 🚀</p>

    <p><b>City Navigator Team</b></p>
  `
);


    res.status(201).json({
  message: "Registration successful. Welcome email sent.",
  user: {
    id: user._id,
    fullName: user.fullName,
    email: user.email,
    phone: user.phone || "",
    address: user.address || "",
    role: user.role,
    createdAt: user.createdAt
  }
});

  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({
      message: "Registration failed"
    });
  }
};

// ======================
// USER LOGIN
// ======================
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validation
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password required"
      });
    }

    // 2. Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    // 3. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    // 4. Generate token
    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({
      message: "Login failed"
    });
  }
};

// ======================
// GET CURRENT USER
// ======================
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone ?? "",
      address: user.address ?? "",
      avatar: user.avatar ?? "",
      role: user.role,
      createdAt: user.createdAt
    });
  } catch (error) {
    console.error("GET ME ERROR:", error);
    res.status(500).json({ message: "Failed to get user" });
  }
};