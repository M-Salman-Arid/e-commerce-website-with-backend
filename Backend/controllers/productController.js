
const {productModel} = require('../models/productModel');

const getProducts = async (req, res) => {
    try {
        const products = await productModel.getProducts();

        if (products.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No products found"
            });
        }

        return res.status(200).json({
            success: true,
            products: products
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message || "Server Error"
        });
    }
};

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productModel.getProductById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        return res.status(200).json({
            success: true,
            product: product
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message || "Server Error"
        });
    }
};

const addProduct = async (req, res) => {
    try {
        const { name, description, price, stock, category_id } = req.body;

        if (!name || !price || !stock || !category_id) {
            return res.status(400).json({
                success: false,
                message: "Name, price, stock, and category_id are required"
            });
        }

        const newProduct = await productModel.addProduct({
            name: name.trim(),
            description: description ? description.trim() : null,
            price: parseFloat(price),
            stock: parseInt(stock),
            category_id: parseInt(category_id)
        });

        return res.status(201).json({
            success: true,
            message: "Product added successfully",
            product: newProduct
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message || "Server Error"
        });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, stock, category_id } = req.body;

        const updatedProduct = await productModel.updateProduct(id, {
            name: name ? name.trim() : undefined,
            description: description ? description.trim() : undefined,
            price: price !== undefined ? parseFloat(price) : undefined,
            stock: stock !== undefined ? parseInt(stock) : undefined,
            category_id: category_id !== undefined ? parseInt(category_id) : undefined
        });

        if (!updatedProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found or no changes made"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Product updated successfully",
            product: updatedProduct
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message || "Server Error"
        });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await productModel.deleteProduct(id);

        if (!deletedProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message || "Server Error"
        });
    }
};



module.exports = {
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
};
