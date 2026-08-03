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
    p.*,
    c.name AS category_name
    FROM products p
    JOIN categories c
    ON p.category_id = c.id
    WHERE p.id = ?`,
        [id]
    );
    return rows[0];
};

const getProductImage = async (id) => {
    const [rows] = await pool.query(
        "SELECT image FROM products WHERE id = ?",
        [id]
    );
    return rows;
};

const addProduct = async (product) => {
    const { title, description, price, stock, category_id, brand, image } = product;

    const [result] = await pool.query(
        `INSERT INTO products (title, description, price, stock, category_id, brand, image) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [title, description, price, stock, category_id, brand, image]
    );

    return result;
};

const updateProduct = async (id, product) => {
    const { title, description, price, stock, category_id, brand } = product;

    const [result] = await pool.query(
        `UPDATE products SET title = ?, description = ?, price = ?, stock = ?, category_id = ?, brand = ? WHERE id = ?`,
        [title, description, price, stock, category_id, brand, id]
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
    getProductImage,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
};