
const orderModel = require("../models/orderModel");

const createOrder = async (req, res) => {
    try {

        const user_id = req.user.id;

        const { items, total_amount, shipping_address, city, postal_code, payment_method } = req.body;

        console.log(req.body);

        const orderId = await orderModel.createOrder({
            user_id,
            items,
            total_amount,
            shipping_address,
            city,
            postal_code,
            payment_method
        });

        

        res.status(201).json({
            message: "Order created successfully",
            orderId
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Internal server error"
        });

    }
};

const getAllOrders = async (req, res) => {
    try {

        const orders = await orderModel.getOrders();
        res.status(200).json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


module.exports = {
    createOrder,
    getAllOrders
};
