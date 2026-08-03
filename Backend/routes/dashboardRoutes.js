

const express = require("express");
const router = express.Router();
const { getDashboardData } = require("../controllers/dashboardController");
const { verifyToken } = require("../middlewares/verifyToken");


router.get("/dashboard", verifyToken, getDashboardData);

module.exports = router;
