const {pool} = require('../config/dbConfig');

const getProducts = async () => {
    const [rows] = await pool.query(
        `SELECT 
        id, name, description, price, stock , category_id
        FROM products
        ORDER BY id ASC`
    );
    return rows;
};

const getProductById = async (id) => {
    const [rows] = await pool.query(
        `SELECT 
        id, name, description, price, stock , category_id
        FROM products
        WHERE id = ?
        ORDER BY id ASC`,
        [id]
    );
    return rows[0];
};

const addProduct = async (product) => {
    const { name, description, price, stock, category_id } = product;

    const [result] = await pool.query(
        `INSERT INTO products (name, description, price, stock, category_id) VALUES (?, ?, ?, ?, ?)`,
        [name, description, price, stock, category_id]
    );

    return result;
};

const updateProduct = async (id, product) => {
    const { name, description, price, stock, category_id } = product;

    const [result] = await pool.query(
        `UPDATE products SET name = ?, description = ?, price = ?, stock = ?, category_id = ? WHERE id = ?`,
        [name, description, price, stock, category_id, id]
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