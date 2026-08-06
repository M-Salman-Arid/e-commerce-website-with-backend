const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

const { registerValidation, loginValidation, verifyOTPValidation } = require("../validators/authValidation");

const validate = require("../middlewares/validateMiddleware");

router.post("/register", authController.register);
router.post("/verify-otp", authController.verifyOTP);
router.post("/login",  authController.login);
router.post("/forgot-password", authController.forgotPassword);
router.post("/verify-password-reset-otp", authController.verifyPasswordResetOTP);
router.post("/reset-password", authController.resetPassword);

module.exports = router;