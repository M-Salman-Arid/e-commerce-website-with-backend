const { pool } = require("../config/db.js");


// profile page models

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


// user page models 

const allUsers = async (loggedInUserId) => {

    const [rows] = await pool.query(
        `
        SELECT 
        id, name, email, role, status
        FROM users
        WHERE id != ? AND id != 10;
        `,
        [loggedInUserId]
    )

    return rows
}

const updateUser = async (role, status, id) => {

    const [result] = await pool.query(
        `UPDATE users
         SET role = ?, status = ?
         WHERE id = ?`,
        [role, status, id]
    );

    return result;
};

const deleteUser = async (id) => {

    const [result] = await pool.query(
        `DELETE FROM users
         WHERE id = ?`,
        [id]
    );
    return result;
};



module.exports = {
    getUserData,
    updateProfileInDatabase,
    updatePassword,
    allUsers,
    updateUser,
    deleteUser
};