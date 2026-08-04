const {pool} = require('../config/db');


const findCartItem = async (userId, productId) => {

    const [rows] = await pool.query(
        `
        SELECT *
        FROM cart
        WHERE user_id = ? AND product_id = ?
        `,
        [userId, productId]
    );

    return rows;
};


const addCartItem = async (userId, productId, quantity) => {

    const [result] = await pool.query(
        `
        INSERT INTO cart (user_id, product_id, quantity)
        VALUES (?, ?, ?)
        `,
        [userId, productId, quantity]
    );

    return result;
};

const increaseQuantity = async (cartId, quantity) => {

    const [result] = await pool.query(
        `
        UPDATE cart
        SET quantity = quantity + ?
        WHERE id = ?
        `,
        [quantity, cartId]
    );

    return result;
};


const getCart = async (userId) => {

    const [rows] = await pool.query(
        `
        SELECT
            cart.id,
            cart.quantity,
            products.id AS product_id,
            products.title,
            products.price
        FROM cart
        INNER JOIN products
            ON cart.product_id = products.id
        WHERE cart.user_id = ?
        `,
        [userId]
    );

    return rows;
};

const updateQuantity = async (cartId, quantity) => {

    const [result] = await pool.query(
        `
        UPDATE cart
        SET quantity = ?
        WHERE id = ?
        `,
        [quantity, cartId]
    );

    return result;
};

const removeCartItem = async (cartId) => {

    const [result] = await pool.query(
        `
        DELETE FROM cart
        WHERE id = ?
        `,
        [cartId]
    );

    return result;
};


const clearCart = async (userId) => {

    const [result] = await pool.query(
        `
        DELETE FROM cart
        WHERE user_id = ?
        `,
        [userId]
    );

    return result;
};

module.exports = {
    findCartItem,
    addCartItem,
    increaseQuantity,
    getCart,
    updateQuantity,
    removeCartItem,
    clearCart
}