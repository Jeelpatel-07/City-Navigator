const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    phone: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },

    // Business info
    businessName: {
      type: String,
      required: true
    },
    serviceCategory: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    serviceAreas: {
      type: [String]
    },
    pricingType: {
      type: String,
      enum: ["hourly", "fixed", "both"],
      default: "hourly"
    },
    hourlyRate: {
      type: Number
    },
    experience: {
      type: String
    },

    // Auth
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      default: "VENDOR"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vendor", vendorSchema);
