import { useState } from "react";
import "./Categories.css";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const Categories = () => {

    const [categoryName, setCategoryName] = useState("");

    const categories = [
        {
            id: 1,
            name: "Electronics",
            products: 45,
        },
        {
            id: 2,
            name: "Fashion",
            products: 32,
        },
        {
            id: 3,
            name: "Furniture",
            products: 18,
        },
        {
            id: 4,
            name: "Sports",
            products: 25,
        },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(categoryName);

        setCategoryName("");
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
                            placeholder="Category Name"
                            value={categoryName}
                            onChange={(e) =>
                                setCategoryName(e.target.value)
                            }
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

                            {categories.map((category) => (

                                <tr key={category.id}>

                                    <td>{category.id}</td>

                                    <td>{category.name}</td>

                                    <td>{category.products}</td>

                                    <td>

                                        <div className="action-buttons">

                                            <button className="edit-btn">
                                                <FaEdit />
                                            </button>

                                            <button className="delete-btn">
                                                <FaTrash />
                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
};

export default Categories;