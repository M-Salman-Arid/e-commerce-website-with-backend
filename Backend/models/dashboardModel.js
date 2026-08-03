
const { pool } = require("../config/db");

const getProductsCount = async () => {
    const [rows] = await pool.query(
        "SELECT COUNT(*) AS count FROM products"
    );
    return rows[0].count;
};

const getUsersCount = async () => {
    const [rows] = await pool.query(
        "SELECT COUNT(*) AS count FROM users"
    );
    return rows[0].count;
};


module.exports = {
    getProductsCount,
    getUsersCount
};