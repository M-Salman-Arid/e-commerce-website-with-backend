const { pool } = require("../config/db.js");


const getCategories = async() => {

    const [rows] = await pool.query(
        `SELECT
        id, name, description
        from categories
        ORDER BY id ASC
        `
    )

    return rows
}

const addCategory = async(category) => {
    
    const [result] = await pool.query(
        `INSERT INTO categories (name) VALUES (?)`,
        [category]
    )

    return result
}

const editCategory = async(categoryId, updatedCategory) => {
    const { name, description } = updatedCategory;

    const [result] = await pool.query(
        `UPDATE categories SET name = ?, description = ? WHERE id = ?`,
        [name, description, categoryId]
    );

    return result;
}

const deleteCategory = async(categoryId) => {

    const [result] = await pool.query(
        `DELETE FROM categories WHERE id = ?`,
        [categoryId]
    );

    return result;
}

module.exports = {
    getCategories,
    addCategory,
    editCategory,
    deleteCategory
}