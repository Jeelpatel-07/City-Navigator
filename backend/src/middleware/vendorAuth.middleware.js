const jwt = require("jsonwebtoken");

const vendorAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // VERY IMPORTANT
    if (decoded.type !== "vendor") {
      return res.status(403).json({ message: "Vendor access only" });
    }

    // 🔑 THIS LINE WAS MISSING / WRONG EARLIER
    req.vendor = {
      id: decoded.id
    };

    next();
  } catch (error) {
    console.error("Vendor Auth Error:", error.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = vendorAuth;
