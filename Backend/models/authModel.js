const { pool } = require("../config/db");


const getUserByEmail = async (email) => {

    const [rows] = await pool.query(
        "SELECT * FROM users WHERE email = ?",
        [email]
    );

    return rows[0];
};



const createUser = async (userData) => {

    const {
        name,
        email,
        password,
        verificationOTP,
        verificationOTPExpiry
    } = userData;

    const [result] = await pool.query(

        `INSERT INTO users
        (
            name,
            email,
            password,
            verification_otp,
            verification_otp_expiry
        )
        VALUES (?, ?, ?, ?, ?)`,

        [
            name,
            email,
            password,
            verificationOTP,
            verificationOTPExpiry
        ]

    );

    return result;
};

const getUserByVerificationOTP = async (email, otp) => {

    const [rows] = await pool.query(
        `SELECT * FROM users 
         WHERE email = ? 
           AND verification_otp = ?`,
        [email, otp]
    );

    return rows[0];
};

const verifyUser = async (email) => {

    const [result] = await pool.query(

        `UPDATE users
         SET
            is_verified = TRUE,
            verification_otp = NULL,
            verification_otp_expiry = NULL
         WHERE email = ?`,

        [email]

    );

    return result;

};


module.exports = {
    getUserByEmail,
    getUserByVerificationOTP,
    createUser,
    verifyUser,

};