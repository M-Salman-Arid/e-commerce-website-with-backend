const userModel = require("../models/userModel.js")

const { getUserByEmail } = require("../models/authModel.js");
const bcrypt = require("bcrypt");
const { json } = require("express");

const getProfile = async (req, res) => {

    try {
        const email = req.user.email;
        const user = await userModel.getUserData(email);

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

        const result = await userModel.updateProfileInDatabase(email, name, phone, profileImage);

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
        const { currentPassword, newPassword } = req.body;

        const user = await getUserByEmail(email);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Current password is incorrect"
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await userModel.updatePassword(email, hashedPassword);

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


// users page 


const getAllUser = async (req, res) => {

    try {

        const loggedInUserId = req.user.id;

        const users = await userModel.allUsers(loggedInUserId);

        if (users.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No users found"
            });
        }


        return res.status(200).json({
            success: true,
            users
        })


    } catch (error) {
        console.error(error)

        return res.status(500).json({
            success: false,
            message: error.message || "Server Error"
        })
    }
}

const updateAUser = async (req, res) => {

    try {

        const { id } = req.params;
        const { role, status } = req.body;

        const result = await userModel.updateUser(role, status, id)

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "User updated Successfully",
            result
            
        })


    } catch (error) {
        console.error(error)

        return res.status(500).json({
            success: false,
            message: error.message || "Server Error"
        })
    }
}

const deleteAUser = async (req, res) => {

    try {
        const { id } = req.params;

        const result = await userModel.deleteUser(id);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message || "Server Error"
        });
    }
};

module.exports = {
    getProfile,
    updateProfile,
    changePassword,
    getAllUser,
    updateAUser,
    deleteAUser
};