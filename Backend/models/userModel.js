const { pool } = require("../config/db.js");

const getUserData = async (email) => {

    const [rows] = await pool.query(

        `
        SELECT
            name,
            email,
            phone,
            profile_image
        FROM users
        WHERE email = ?
        `,

        [email]

    );

    return rows[0];

};

const updateProfileInDatabase = async (email, name, phone, profileImage) => {

    const [result] = await pool.query(
        `
        UPDATE users
        SET
        name = ?,
        phone = ?,
        profile_image = COALESCE(?, profile_image)
        WHERE email = ?`,

        [name, phone, profileImage, email]

    );

    return result;

};

const updatePassword = async (email, newPassword) => {

    const result = await pool.query(
        `
        UPDATE users
        SET password = ?
        WHERE email = ?
        `,
        [newPassword, email]
    );

    return result;

};

module.exports = {
    getUserData,
    updateProfileInDatabase,
    updatePassword
};