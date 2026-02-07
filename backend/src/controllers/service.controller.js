const Service = require("../models/Service.model");

/**
 * ======================================
 * GET SERVICES (FOR FRONTEND LISTING)
 * ======================================
 * Supports:
 * category
 * city
 * area
 * serviceType (PLACE / LOCAL)
 */
exports.getServices = async (req, res) => {
  try {
    const { category, city, area, serviceType } = req.query;

    const filter = {};

    if (category) filter.category = category.toLowerCase();
    if (city) filter.city = city;
    if (area) filter.area = area;
    if (serviceType) filter.serviceType = serviceType;

    const services = await Service.find(filter)
      .sort({ createdAt: -1 });

    res.status(200).json(services);
  } catch (error) {
    console.error("Get Services Error:", error);
    res.status(500).json({
      message: "Failed to fetch services"
    });
  }
};