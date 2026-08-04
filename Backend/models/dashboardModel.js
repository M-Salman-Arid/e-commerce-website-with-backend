
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

const getOrdersCount = async () => {
    const [rows] = await pool.query(
        "SELECT COUNT(*) AS count FROM orders"
    );
    return rows[0].count;
};

const getTotalRevenue = async () => {
    const [rows] = await pool.query(
        "SELECT SUM(total_price) AS total_revenue FROM orders"
    );
    return rows[0].total_revenue || 0;
}


module.exports = {
    getProductsCount,
    getUsersCount,
    getOrdersCount,
    getTotalRevenue
};