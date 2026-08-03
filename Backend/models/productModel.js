const { pool } = require("../config/db");

const getProducts = async () => {
    const [rows] = await pool.query(
        `SELECT
        p.*,
        c.name AS category_name
        FROM products p
        JOIN categories c
        ON p.category_id = c.id`
    );
    return rows;
};

const getProductById = async (id) => {
    const [rows] = await pool.query(
        `SELECT 
        id, title, description, price, stock , category_id
        FROM products
        WHERE id = ?
        ORDER BY id ASC`,
        [id]
    );
    return rows[0];
};

const addProduct = async (product) => {
    const { title, description, price, stock, category_id } = product;

    const [result] = await pool.query(
        `INSERT INTO products (title, description, price, stock, category_id) VALUES (?, ?, ?, ?, ?)`,
        [title, description, price, stock, category_id]
    );

    return result;
};

const updateProduct = async (id, product) => {
    const { title, description, price, stock, category_id } = product;

    const [result] = await pool.query(
        `UPDATE products SET name = ?, description = ?, price = ?, stock = ?, category_id = ? WHERE id = ?`,
        [title, description, price, stock, category_id, id]
    );

    return result;
};

const deleteProduct = async (id) => {
    const [result] = await pool.query(
        `DELETE FROM products WHERE id = ?`,
        [id]
    );
    return result;
};

module.exports = {
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
};