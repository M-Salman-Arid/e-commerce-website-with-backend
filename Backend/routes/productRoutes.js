

const express = require("express")

const { verifyToken } = require("../middlewares/verifyToken")
const { upload } = require("../middlewares/uploadValidate")

const { getProducts, getProductById, addProduct, updateProduct, deleteProduct } = require("../controllers/productController")
const router = express.Router()

router.get("/products", verifyToken, getProducts)
router.get("/products/:id", verifyToken, getProductById)
router.post("/products/add", verifyToken, upload.single("image"), addProduct)
router.put("/products/edit/:id", verifyToken, upload.single("image"), updateProduct)
router.delete("/products/delete/:id", verifyToken, deleteProduct)

module.exports = router