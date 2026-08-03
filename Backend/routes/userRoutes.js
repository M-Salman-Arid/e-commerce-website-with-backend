const express = require("express");

const { verifyToken } = require("../middlewares/verifyToken.js");
const { upload } = require("../middlewares/uploadValidate.js");
const { getProfile, updateProfile, changePassword, getAllUser, updateAUser, deleteAUser } = require("../controllers/userController.js");
const { validateProfileUpdate, validatePasswordChange } = require("../validators/userValidation.js")
const validate = require("../middlewares/validateMiddleware.js")

const router = express.Router();

// profile routes and uses of controller
router.get("/profile", verifyToken, getProfile);
router.put("/profile", verifyToken, upload.single("profileImage"), validateProfileUpdate, validate, updateProfile);
router.put("/profile/change-password", verifyToken, validatePasswordChange, validate, changePassword);

// user routes for admin only to control and use of controller

router.get("/users" , verifyToken, getAllUser)
router.put("/users/update/:id" , verifyToken, updateAUser)
router.delete("/users/delete/:id" , verifyToken, deleteAUser)

module.exports = router;