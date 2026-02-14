const Vendor = require("../models/Vendor.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

/**
 * Generate random password
 */
const generatePassword = () => {
  return crypto.randomBytes(4).toString("hex"); // ex: a3f9c2d1
};

// =======================
// REGISTER VENDOR
// =======================
exports.registerVendor = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      address,
      businessName,
      serviceCategory,
      description,
      serviceAreas,
      pricingType,
      hourlyRate,
      experience
    } = req.body;

    // 1️⃣ Validation
    if (
      !fullName ||
      !email ||
      !phone ||
      !businessName ||
      !serviceCategory
    ) {
      return res.status(400).json({
        message: "Required fields missing"
      });
    }

    // 2️⃣ Check existing vendor
    const existingVendor = await Vendor.findOne({ email });
    if (existingVendor) {
      return res.status(400).json({
        message: "Vendor already exists"
      });
    }

    // 3️⃣ Generate & hash password
    const plainPassword = generatePassword();
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    // 4️⃣ Save vendor in DB
    const vendor = await Vendor.create({
      fullName,
      email,
      phone,
      address,
      password: hashedPassword,
      businessName,
      serviceCategory,
      description,
      serviceAreas,
      pricingType,
      hourlyRate,
      experience,
      role: "VENDOR"
    });

    // 5️⃣ Send email with credentials
    await sendEmail(
      email,
      "🎉 Welcome to City Navigator – Vendor Account Created",
      `
        <h2>Hello ${fullName} 👋</h2>
        <p>Your vendor account has been successfully created.</p>

        <p><b>Login Email:</b> ${email}</p>
        <p><b>Password:</b> ${plainPassword}</p>

        <p>Please login and change your password after first login.</p>

        <br/>
        <p>🚀 City Navigator Team</p>
      `
    );

    // 6️⃣ Success response
    res.status(201).json({
      message:
        "Vendor registered successfully. Login credentials sent to email."
    });

  } catch (error) {
    console.error("Vendor Register Error:", error);
    res.status(500).json({
      message: "Vendor registration failed"
    });
  }
};

// =======================
// LOGIN VENDOR
// =======================
exports.loginVendor = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Find vendor
    const vendor = await Vendor.findOne({ email });
    if (!vendor) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    // 2️⃣ Compare password
    const match = await bcrypt.compare(password, vendor.password);
    if (!match) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    // 3️⃣ Generate token
    const token = jwt.sign(
      { userId: vendor._id, role: "VENDOR" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 4️⃣ Response
    res.json({
      token,
      user: {
        id: vendor._id,
        name: vendor.fullName,
        email: vendor.email,
        role: "VENDOR"
      }
    });

  } catch (err) {
    console.error("Vendor Login Error:", err);
    res.status(500).json({
      message: "Vendor login failed"
    });
  }
};
// =======================
// CHANGE VENDOR PASSWORD
// =======================
exports.changeVendorPassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    // 1️⃣ Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        message: "New password must be at least 6 characters"
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match"
      });
    }

    if (currentPassword === newPassword) {
      return res.status(400).json({
        message: "New password cannot be the same as current password"
      });
    }

    // 2️⃣ Get vendor from token
    const vendor = await Vendor.findById(req.user.userId);
    if (!vendor) {
      return res.status(404).json({
        message: "Vendor not found"
      });
    }

    // 3️⃣ Check current password
    const isMatch = await bcrypt.compare(
      currentPassword,
      vendor.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Current password is incorrect"
      });
    }

    // 4️⃣ Hash & update password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    vendor.password = hashedPassword;
    await vendor.save();

    // 5️⃣ Send confirmation email
    await sendEmail(
      vendor.email,
      "🔐 Password Changed Successfully",
      `
        <h2>Hello ${vendor.fullName} 👋</h2>

        <p>Your password has been successfully changed.</p>

        <p>If you did not make this change, please contact support immediately.</p>

        <br/>
        <p><b>City Navigator Team</b></p>
      `
    );

    // 6️⃣ Success
    res.json({
      message: "Password changed successfully. Confirmation email sent."
    });

  } catch (error) {
    console.error("Change Password Error:", error);
    res.status(500).json({
      message: "Failed to change password"
    });
  }
};

