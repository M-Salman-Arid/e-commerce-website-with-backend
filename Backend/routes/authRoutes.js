const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

const { 
    registerValidation, loginValidation, verifyOTPValidation

} = require("../validators/authValidation");

const validate = require("../middlewares/validateMiddleware");

router.post("/register", registerValidation, validate, authController.register);
router.post("/verify-otp", verifyOTPValidation, validate, authController.verifyOTP);
router.post("/login", loginValidation, validate, authController.login);


module.exports = router;