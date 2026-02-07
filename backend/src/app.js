const express = require("express");
const cors = require("cors");

const serviceRoutes = require("./routes/service.routes");
const authRoutes = require("./routes/auth.routes");
const vendorRoutes = require("./routes/vendor.routes");

const app = express();

app.use(cors());
app.use(express.json());

// API ROUTES
app.use("/api/services", serviceRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/vendor", vendorRoutes);

app.get("/", (req, res) => {
  res.send("City Navigator Backend Running 🚀");
});

module.exports = app;
