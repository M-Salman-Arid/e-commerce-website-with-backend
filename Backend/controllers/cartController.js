const cartModel = require("../models/cartModel");

const addToCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { product_id, quantity = 1 } = req.body;


        const existingItem = await cartModel.findCartItem(userId, product_id);

        console.log("Existing Item:", existingItem); // Debugging line

        if (existingItem.length > 0) {
            await cartModel.increaseQuantity(existingItem[0].id, quantity);

            return res.status(200).json({
                success: true,
                message: "Cart quantity updated."
            });
        }

        await cartModel.addCartItem(userId, product_id, quantity);

        res.status(201).json({
            success: true,
            message: "Product added to cart."
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};

const cartCount = async (req, res) => {
    try {
        const userId = req.user.id;

        const count = await cartModel.getCartCount(userId);

        res.status(200).json({
            success: true,
            count
        });
    } catch (error) {

        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

const getCart = async (req, res) => {
    try {

        const userId = req.user.id;

        const cart = await cartModel.getCart(userId);

        res.status(200).json({
            success: true,
            cart
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};

const updateCartQuantity = async (req, res) => {
    try {

        const cartId = req.params.id;
        const { quantity } = req.body;


        if (quantity < 1) {
            return res.status(400).json({
                success: false,
                message: "Quantity must be at least 1."
            });
        }

        await cartModel.updateQuantity(cartId, quantity);

        res.status(200).json({
            success: true,
            message: "Cart updated successfully."
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};

const removeCartItem = async (req, res) => {
    try {

        const cartId = req.params.id;

        await cartModel.removeCartItem(cartId);

        res.status(200).json({
            success: true,
            message: "Item removed from cart."
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};

const clearCart = async (req, res) => {
    try {

        const userId = req.user.id;

        await cartModel.clearCart(userId);

        res.status(200).json({
            success: true,
            message: "Cart cleared successfully."
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};



module.exports = {
    addToCart,
    cartCount,
    getCart,
    updateCartQuantity,
    removeCartItem,
    clearCart
};