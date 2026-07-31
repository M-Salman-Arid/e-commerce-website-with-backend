const { getUserData, updateProfileInDatabase } = require("../models/userModel.js");
const {getUserByEmail} = require("../models/authModel.js");
const bcrypt = require("bcrypt");
const { updatePassword } = require("../models/userModel.js");

const getProfile = async (req, res) => {

    try {
        const email = req.user.email;
        const user = await getUserData(email);

        if (!user) {
            return res.status(404).json({

                success: false,
                message: "User not found"

            });

        }

        if (user.profile_image) {
            user.profile_image = user.profile_image.toString("base64");
        }

        res.status(200).json({

            success: true,
            user

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,
            message: "Server Error"

        });

    }

};

const updateProfile = async (req, res) => {

    try {
        const email = req.user.email;
        const { name, phone } = req.body;
        const profileImage = req.file ? req.file.buffer : null;

        const result = await updateProfileInDatabase(email, name, phone, profileImage);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Profile updated successfully"
        });

    } catch (error) {

        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }
};

const changePassword = async (req, res) => {

    try {
        const email = req.user.email;
        const { oldPassword, newPassword } = req.body;

        const user = await getUserByEmail(email);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Old password is incorrect"
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await updatePassword(email, hashedPassword);

        res.status(200).json({
            success: true,
            message: "Password updated successfully"
        });

    } catch (error) {

        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message || "Server Error"
        });

    }
};

module.exports = {
    getProfile,
    updateProfile,
    changePassword
};