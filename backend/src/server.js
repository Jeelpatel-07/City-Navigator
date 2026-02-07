require("dotenv").config();   // 👈 FIRST LINE



const dotenv = require("dotenv");
const app = require("./app");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const vendorRoutes = require("./routes/vendor.routes");

dotenv.config();

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/vendor", vendorRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
