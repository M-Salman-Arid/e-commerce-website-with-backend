
const productModel = require('../models/productModel');

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
        const { title, description, price, stock, category_id, brand } = req.body;

        const image = req.file.buffer;

        if (!title || !price || !stock || !category_id || !brand) {
            return res.status(400).json({
                success: false,
                message: "Title, price, stock, category_id, and brand are required"
            });
        }

        const newProduct = await productModel.addProduct({
            title: title.trim(),
            description: description ? description.trim() : null,
            price: parseFloat(price),
            stock: parseInt(stock),
            category_id: parseInt(category_id),
            brand: brand.trim(),
            image: image    
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
        const { title, description, price, stock, category_id, brand } = req.body;

        const updatedProduct = await productModel.updateProduct(id, {
            title: title ? title.trim() : undefined,
            description: description ? description.trim() : undefined,
            price: price !== undefined ? parseFloat(price) : undefined,
            stock: stock !== undefined ? parseInt(stock) : undefined,
            category_id: category_id !== undefined ? parseInt(category_id) : undefined,
            brand: brand !== undefined ? brand.trim() : undefined
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


const getProductImage = async (req, res) => {
    
    try {
        const { id } = req.params;

        const imageData = await productModel.getProductImage(id);

        if (imageData.length === 0 || !imageData[0].image) {
            return res.status(404).send("Image not found");
        }

        res.setHeader("Content-Type", "image/jpeg"); // or use the stored MIME type
        res.send(imageData[0].image);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
};



module.exports = {
    getProducts,
    getProductImage,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
};
