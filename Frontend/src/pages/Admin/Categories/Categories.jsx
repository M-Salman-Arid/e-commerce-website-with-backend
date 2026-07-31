import { useState, useEffect } from "react";
import "./Categories.css";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { getCategories, addCategories } from "../../../api/productAPI";
import EditCategoryModal from "../../../components/EditModels/EditCategories";
import DeleteCategoryModal from "../../../components/EditModels/DeleteCategory";


const Categories = () => {

    const [categories, setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState("");

    const [selectedCategory, setSelectedCategory] = useState(null);

    const [showEditModal, setShowEditModal] = useState(false);

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const fetchCategories = async () => {

        try {

            const data = await getCategories();

            setCategories(data.categories);

        } catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        fetchCategories();

    }, []);

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!categoryName.trim()) return;

        try {

            await addCategories(categoryName.trim());

            await fetchCategories();

            setCategoryName("");

        } catch (error) {

            console.log(error);

        }

    };

    const openEditModal = (category) => {

        setSelectedCategory(category);

        setShowEditModal(true);

    }

    const openDeleteModal = (category) => {

        setSelectedCategory(category);

        setShowDeleteModal(true);

    };


    return (

        <div className="categories-page">

            <div className="page-heading">

                <h1>Categories</h1>

                <p>Manage product categories.</p>

            </div>

            <div className="category-grid">

                {/* Add Category */}

                <div className="category-form-card">

                    <h2>Add Category</h2>

                    <form onSubmit={handleSubmit}>

                        <input
                            type="text"
                            name="category"
                            placeholder="Category Name"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                        />

                        <button type="submit">

                            <FaPlus />

                            Add Category

                        </button>

                    </form>

                </div>

                {/* Category Table */}

                <div className="category-table-card">

                    <h2>All Categories</h2>

                    <table>

                        <thead>

                            <tr>

                                <th>ID</th>

                                <th>Name</th>

                                <th>Products</th>

                                <th>Actions</th>

                            </tr>

                        </thead>

                        <tbody>

                            {categories.length > 0 ? (

                                categories.map((category) => (

                                    <tr key={category.id}>

                                        <td>{category.id}</td>

                                        <td>{category.name}</td>

                                        <td>{category.products ?? 0}</td>

                                        <td>

                                            <div className="action-buttons">

                                                <button
                                                    className="edit-btn"
                                                    onClick={() => openEditModal(category)}
                                                >
                                                    <FaEdit />
                                                </button>

                                                <button
                                                    className="delete-btn"
                                                    onClick={() => openDeleteModal(category)}
                                                >
                                                    <FaTrash />
                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>

                                    <td colSpan="4" style={{ textAlign: "center" }}>

                                        No Categories Found

                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

            </div>
            {
                showEditModal && (

                    <EditCategoryModal

                        category={selectedCategory}

                        onClose={() => setShowEditModal(false)}

                    />

                )
            }
            {
                showDeleteModal && (

                    <DeleteCategoryModal

                        category={selectedCategory}
                        onClose={() => setShowDeleteModal(false)}

                    />

                )
            }
        </div>
    );
};

export default Categories;