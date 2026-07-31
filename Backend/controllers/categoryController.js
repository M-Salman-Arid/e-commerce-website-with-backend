const categoryModel = require("../models/categoryModel")

const getCategories = async (req, res)=> {

    try {

        const result = await categoryModel.getCategories()

        if(result.length === 0){
            return res.status(200).json({
                success : true,
                categories: []
            })
        }

        return res.status(200).json({
            success : true,
            categories: result
        })
        
        
    } catch (error) {
        console.error(error)

        return res.status(500).json({
            success : false,
            message : error.message || "Server Error"
        })
    }
}

const addNewCategory = async(req, res) => {

    try {

        const { category } = req.body;

        if (!category || typeof category !== "string" || category.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Category name is required"
            })
        }

        const result = await categoryModel.addCategory(category.trim())

        if(result.affectedRows === 0){
            return res.status(400).json({
                success : false,
                message : "Catagories cannot be added"
            })
        }

        return res.status(201).json({
            success : true,
            message: "Category added successfully",
            category: {
                id: result.insertId,
                name: category.trim()
            }
        })
        
    } catch (error) {
        console.error(error)

        return res.status(500).json({
            success : false,
            message : error.message || "Server Error"
        })
    }
}

const eidtACategory = async(req, res)=> {

    try {

        const { categoryId } = req.params;
        const { name, description } = req.body;

        if (!name || typeof name !== "string" || name.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Category name is required"
            })
        }

        const result = await categoryModel.editCategory(categoryId, { name: name.trim(), description: description ? description.trim() : null })

        if(result.affectedRows === 0){
            return res.status(404).json({
                success : false,
                message : "Category not found or no changes made"
            })
        }

        return res.status(200).json({
            success : true,
            message : "Category updated successfully",
            category: {
                id: categoryId,
                name: name.trim(),
                description: description ? description.trim() : null
            }
        })
        
    } catch (error) {
        console.error(error)

        return res.status(500).json({
            success : false,
            message : error.message || "Server Error!"
        })
    }
}

const deleteACategory = async(req, res) => {

    try {

        const { categoryId } = req.params;

        const result = await categoryModel.deleteCategory(categoryId)

        if(result.affectedRows === 0){
            return res.status(404).json({
                success : false,
                message : "Category not found"
            })
        }

        return res.status(200).json({
            success : true,
            message : "Category deleted successfully"
        })

    } catch (error) {
        console.error(error)

        return res.status(500).json({
            success : false,
            message : error.message || "Server Error!"
        })
    }
}

module.exports = {
    getCategories,
    addNewCategory,
    eidtACategory,
    deleteACategory
}