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

const setPasswordResetOTP = async (email, otp, expiry) => {

    const [result] = await pool.query(
        `UPDATE users
         SET
            reset_otp = ?,
            reset_otp_expiry = ?
         WHERE email = ?`,
        [otp, expiry, email]
    );
    return result;
};

const getUserByPasswordResetOTP = async (email, otp) => {

    const [rows] = await pool.query(
        `SELECT * FROM users
         WHERE email = ?
           AND reset_otp = ?`,
        [email, otp]
    );
    return rows[0];
};

const updatePassword = async (email, hashedPassword) => {

    const [result] = await pool.query(
        `UPDATE users
         SET password = ?,
         reset_otp = NULL,
         reset_otp_expiry = NULL
         WHERE email = ?`,
        [hashedPassword, email]
    );
    return result;
}


module.exports = {
    getUserByEmail,
    setPasswordResetOTP,
    getUserByPasswordResetOTP,
    getUserByVerificationOTP,
    createUser,
    verifyUser,
    updatePassword
};