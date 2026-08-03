import { useState, useEffect } from "react";
import "./EditProduct.css";
import { updateProductAPI } from "../../api/productAPI";

const EditProductModal = ({ isOpen, onClose, product, categories, onUpdate }) => {

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category_id: "",
        price: "",
        stock: "",
        brand: "",
    });

    useEffect(() => {
        if (product) {
            setFormData({
                title: product.title || "",
                description: product.description || "",
                category_id: product.category_id || "",
                price: product.price || "",
                stock: product.stock || "",
                brand: product.brand || "",
            });
        }
    }, [product]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await updateProductAPI(product.id, formData);
            onUpdate();
            onClose();
        } catch (error) {
            console.error(error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">

            <div className="modal">

                <div className="modal-header">
                    <h2>Edit Product</h2>

                    <button
                        className="close-btn"
                        onClick={onClose}
                    >
                        ×
                    </button>
                </div>

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={formData.title}
                        onChange={handleChange}
                    />

                    <textarea
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                    />

                    <select
                        name="category_id"
                        value={formData.category_id}
                        onChange={handleChange}
                    >
                        <option value="">Select Category</option>

                        {categories.map(category => (
                            <option
                                key={category.id}
                                value={category.id}
                            >
                                {category.name}
                            </option>
                        ))}
                    </select>

                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={formData.price}
                        onChange={handleChange}
                    />

                    <input
                        type="number"
                        name="stock"
                        placeholder="Stock"
                        value={formData.stock}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="brand"
                        placeholder="Brand"
                        value={formData.brand}
                        onChange={handleChange}
                    />

                    <div className="modal-actions">

                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={onClose}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="save-btn"
                        >
                            Update
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
};

export default EditProductModal;