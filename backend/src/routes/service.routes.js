const express = require("express");
const router = express.Router();

const {
  getServices,
  getServiceById,
  getServicesCount,
  getServicesSample,
  getDbInfo,
  getCollectionsStats
} = require("../controllers/service.controller");

// PUBLIC – frontend uses this
// Get single service
router.get("/:id", getServiceById);
// Debug: count and sample
router.get("/debug/count", getServicesCount);
router.get("/debug/sample", getServicesSample);
router.get("/debug/dbinfo", getDbInfo);
router.get("/debug/collections", getCollectionsStats);
router.get("/", getServices);

module.exports = router;