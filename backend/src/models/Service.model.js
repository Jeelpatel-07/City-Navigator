const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    category: {
      type: String,
      required: true,
      lowercase: true
    },

    serviceType: {
      type: String,
      enum: ["PLACE", "LOCAL"],
      required: true
    },

    country: {
      type: String,
      default: "India"
    },

    state: {
      type: String,
      default: "Gujarat"
    },

    city: {
      type: String,
      required: true
    },

    area: {
      type: String,
      required: true
    },

    description: {
      type: String
    },

    price: {
      type: Number
    },

    rating: {
      type: Number,
      default: 4
    },

    image: {
      type: String, // Cloudinary URL
      required: true
    },

    // ONLY for LOCAL services
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: function () {
        return this.serviceType === "LOCAL";
      }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);