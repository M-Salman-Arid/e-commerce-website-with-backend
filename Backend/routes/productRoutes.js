

const express = require("express")

const { verifyToken } = require("../middlewares/verifyToken")
const { upload } = require("../middlewares/uploadValidate")

const { getProducts, getProductImage, getProductById, addProduct, updateProduct, deleteProduct } = require("../controllers/productController")
const router = express.Router()

router.get("/products", getProducts)
router.get("/products/:id", getProductById)
router.post("/products/add", verifyToken, upload.single("image"), addProduct)
router.put("/products/edit/:id", verifyToken, updateProduct)
router.delete("/products/delete/:id", verifyToken, deleteProduct)

// product images route

router.get("/products/image/:id", getProductImage);

module.exports = router