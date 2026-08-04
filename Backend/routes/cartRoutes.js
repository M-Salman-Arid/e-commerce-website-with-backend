const express = require("express");
const { addToCart, getCart, updateCartQuantity, removeCartItem, clearCart } = require("../controllers/cartController.js");

const { verifyToken } = require("../middlewares/verifyToken.js");


const router = express.Router();

router.post("/cart/add", verifyToken, addToCart);
router.get("/cart", verifyToken, getCart);
router.put("/cart/update/:id", verifyToken, updateCartQuantity);
router.delete("/cart/remove/:id", verifyToken, removeCartItem);
router.delete("/cart/clear", verifyToken, clearCart);

module.exports = router;