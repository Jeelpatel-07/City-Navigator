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

// GET SINGLE SERVICE BY ID
exports.getServiceById = async (req, res) => {
  try {
    const { id } = req.params;

    // Try to find by _id (covers custom string IDs as well as ObjectId when valid)
    let service = null;
    try {
      service = await Service.findOne({ _id: id }).populate('vendor');
    } catch (e) {
      // ignore casting errors and continue to other lookups
    }

    // If not found by _id, fallback to searching by name (case-insensitive)
    if (!service) {
      service = await Service.findOne({ name: { $regex: id, $options: 'i' } }).populate('vendor');
    }

    if (!service) return res.status(404).json({ message: 'Service not found' });

    res.status(200).json(service);
  } catch (error) {
    console.error('Get Service By ID Error:', error);
    res.status(500).json({ message: 'Failed to fetch service' });
  }
};

// DEBUG: return total count of services
exports.getServicesCount = async (req, res) => {
  try {
    const count = await Service.countDocuments()
    res.status(200).json({ count })
  } catch (error) {
    console.error('Get Services Count Error:', error)
    res.status(500).json({ message: 'Failed to get services count' })
  }
}

// DEBUG: return a sample of services (limit param optional)
exports.getServicesSample = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 10
    const sample = await Service.find({}).sort({ createdAt: -1 }).limit(limit)
    res.status(200).json(sample)
  } catch (error) {
    console.error('Get Services Sample Error:', error)
    res.status(500).json({ message: 'Failed to get services sample' })
  }
}

// DEBUG: return DB info (name, connection state)
exports.getDbInfo = async (req, res) => {
  try {
    const mongoose = require('mongoose')
    const conn = mongoose.connection
    const dbName = conn?.db?.databaseName || null
    const readyState = conn.readyState // 0 disconnected, 1 connected, etc.

    res.json({ dbName, readyState })
  } catch (error) {
    console.error('Get DB Info Error:', error)
    res.status(500).json({ message: 'Failed to get DB info' })
  }
}

// DEBUG: list collections and their document counts
exports.getCollectionsStats = async (req, res) => {
  try {
    const mongoose = require('mongoose')
    const db = mongoose.connection.db

    const collections = await db.listCollections().toArray()
    const results = []

    for (const col of collections) {
      const name = col.name
      let count = 0
      try {
        count = await db.collection(name).countDocuments()
      } catch (e) {
        // ignore count errors for special collections
      }
      results.push({ name, count })
    }

    res.json({ collections: results })
  } catch (error) {
    console.error('Get Collections Stats Error:', error)
    res.status(500).json({ message: 'Failed to get collections' })
  }
}