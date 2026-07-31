const express = require("express");

const { verifyToken } = require("../middlewares/verifyToken.js");
const { upload } = require("../middlewares/uploadValidate.js");
const { getProfile, updateProfile, changePassword } = require("../controllers/userController.js");

const router = express.Router();

router.get("/profile", verifyToken, getProfile);
router.put("/profile",verifyToken, upload.single("profileImage"), updateProfile);
router.put("/profile/change-password", verifyToken, changePassword);

module.exports = router;