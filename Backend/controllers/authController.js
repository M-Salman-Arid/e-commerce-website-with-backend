const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authModel = require("../models/authModel");

const generateOTP = require("../utils/generateOTP");
const generateOTPExpiry = require("../utils/generateOTPExpiry");
const generateToken = require("../utils/generateToken");

const {sendOTPEmail, sendPasswordResetOTPEmail} = require("../services/emailService");


const register = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        const existingUser = await authModel.getUserByEmail(email);

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already registered."
            });

        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const otp = generateOTP();
        const otpExpiry = generateOTPExpiry();

        await authModel.createUser({
            name,
            email,
            password: hashedPassword,
            verificationOTP: otp,
            verificationOTPExpiry: otpExpiry
        });

        const verificationToken = jwt.sign(
            {
                userEmail: email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "10m"
            }
        );
        await sendOTPEmail(email, name, otp);

        return res.status(201).json({
            success: true,
            message: "Registration successful. OTP sent to your email.",
            token: verificationToken

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};



const verifyOTP = async (req, res) => {

    try {

        const { otp, verificationToken } = req.body;

        const decoded = jwt.verify(verificationToken, process.env.JWT_SECRET);

        const email = decoded.userEmail;

        const user = await authModel.getUserByVerificationOTP(email, otp);

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP or Email."
            });
        }

        if (new Date() > new Date(user.verification_otp_expiry)) {

            return res.status(400).json({
                success: false,
                message: "OTP has expired. Please request a new OTP."
            });

        }

        await authModel.verifyUser(email);

        return res.status(200).json({

            success: true,
            message: "Email verified successfully."

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,
            message: "Internal Server Error"

        });

    }

};

const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await authModel.getUserByEmail(email);

        if (!user) {

            return res.status(404).json({
                success: false,
                message: "Invalid email or password."
            });

        }

        if (!user.is_verified) {

            return res.status(401).json({
                success: false,
                message: "Please verify your email first."
            });

        }

        if (user.status !== "active") {

            return res.status(403).json({
                success: false,
                message: "Your account is Blocked. Please contact support."
            });
        }

        const isPasswordMatched = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordMatched) {

            return res.status(401).json({
                success: false,
                message: "Invalid password."
            });

        }


        const token = generateToken(user);

        return res.status(200).json({

            success: true,
            message: "Login successful.",

            token,

            user: {

                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                profile_image: user.profile_image

            }

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,
            message: "Internal Server Error"

        });

    }

};

const forgotPassword = async (req, res) => {

    try {

        const { email } = req.body;

        const user = await authModel.getUserByEmail(email);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Email not found."
            });
        }

        const otp = generateOTP();
        const expiry = generateOTPExpiry();

        await authModel.setPasswordResetOTP(email, otp, expiry);

        await sendPasswordResetOTPEmail(email, user.name, otp);

        return res.status(200).json({
            success: true,
            message: "Password reset OTP sent to your email."
        });

    } catch (error) {

        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

const verifyPasswordResetOTP = async (req, res) => {

    try {

        const { email, otp } = req.body;

        const user = await authModel.getUserByPasswordResetOTP(email, otp);

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP or Email."
            });
        }

        if (new Date() > new Date(user.reset_otp_expiry)) {

            return res.status(400).json({
                success: false,
                message: "OTP has expired. Please request a new OTP."
            });
        }

        return res.status(200).json({
            success: true,
            message: "OTP verified successfully."
        });

    } catch (error) {

        console.error(error);
        return res.status(500).json({

            success: false,
            message: "Internal Server Error"
        });

    }
};


const resetPassword = async (req, res) => {

    try {

        const { email, newPassword } = req.body;

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await authModel.updatePassword(email, hashedPassword);

        return res.status(200).json({
            success: true,
            message: "Password reset successful."
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

module.exports = {
    register,
    verifyOTP,
    login,
    forgotPassword,
    verifyPasswordResetOTP,
    resetPassword
};