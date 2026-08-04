
const express = require("express");
const router = express.Router();
const {verifyToken} = require("../middlewares/verifyToken");
const { createOrder, getAllOrders } = require("../controllers/orderController");



router.post("/orders/create", verifyToken, createOrder);
router.get("/orders", verifyToken, getAllOrders);

module.exports = router;