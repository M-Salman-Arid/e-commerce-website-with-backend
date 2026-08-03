
const express = require("express")
const {verifyToken} = require("../middlewares/verifyToken");
const {getCategories, addNewCategory, eidtACategory, deleteACategory} = require("../controllers/categoryController")

const router = express.Router();


router.get("/categories" , getCategories)
router.post("/categories/add" , verifyToken, addNewCategory)
router.put("/categories/edit/:categoryId", verifyToken, eidtACategory)
router.delete("/categories/delete/:categoryId", verifyToken, deleteACategory)

module.exports = router