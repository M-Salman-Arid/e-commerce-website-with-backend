
const { pool } = require("../config/db");

const createOrder = async (orderData) => {

    const connection = await pool.getConnection();

    try {

        await connection.beginTransaction();

        const [result] = await connection.query(
            "INSERT INTO orders (user_id, total_price, shipping_address, city, postal_code, payment_method) VALUES (?, ?, ?, ?, ?, ?)",
            [orderData.user_id, orderData.total_amount, orderData.shipping_address, orderData.city, orderData.postal_code, orderData.payment_method]
        );

        for (const item of orderData.items) {

            await connection.query(
                "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)",
                [result.insertId, item.product_id, item.quantity, item.price]
            );

            await connection.query(
                "UPDATE products SET stock = stock - ? WHERE id = ?",
                [item.quantity, item.product_id]
            );
        }



        await connection.query(
            "DELETE FROM cart WHERE user_id = ?",
            [orderData.user_id]
        );

        await connection.commit();


        return result.insertId;
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }

}

const getOrders = async () => {
    const [orders] = await pool.query(
        `SELECT
            orders.*,
            users.name AS customer_name
            FROM orders
            INNER JOIN users
            ON orders.user_id = users.id
            ORDER BY orders.created_at DESC`
    );
    return orders;
};

module.exports = {
    createOrder,
    getOrders
};