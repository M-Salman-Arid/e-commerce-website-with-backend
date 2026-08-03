import { useState, useEffect } from "react";
import "./AddProduct.css";
import { addProductAPI, getCategories } from "../../../api/productAPI";

const AddProduct = () => {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const data = await getCategories();
            setCategories(data.categories);
        } catch (error) {
            console.error(error);
        }
    };

    const [product, setProduct] = useState({
        title: "",
        description: "",
        category_id: "",
        price: "",
        stock: "",
        brand: "",
    });

    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value,
        });
    };

    const handleImage = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        setImage(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", product.title);
        formData.append("description", product.description);
        formData.append("category_id", product.category_id);
        formData.append("price", product.price);
        formData.append("stock", product.stock);
        formData.append("brand", product.brand);

        if (image) {
            formData.append("image", image);
        }

        try {
            const response = await addProductAPI(formData);
            console.log("Product added successfully:", response.data);
            // Reset form fields
            setProduct({
                title: "",
                description: "",
                category_id: "",
                price: "",
                stock: "",
                brand: "",
            });
            setImage(null);
            setPreview(null);
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };

    return (
        <div className="add-product-page">

            <div className="page-heading">
                <h1>Add Product</h1>
                <p>Create a new product for your store.</p>
            </div>

            <form
                className="product-form"
                onSubmit={handleSubmit}
            >

                <div className="form-grid">

                    <div className="form-group">
                        <label>Product Title</label>

                        <input
                            type="text"
                            name="title"
                            placeholder="MacBook Pro M4"
                            value={product.title}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Category</label>

                        <select
                            name="category_id"
                            value={product.category_id}
                            onChange={handleChange}
                        >
                            <option value="">Select Category</option>

                            {categories.map((category) => (
                                <option
                                    key={category.id}
                                    value={category.id}
                                >
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Brand</label>

                        <input
                            type="text"
                            name="brand"
                            placeholder="Apple"
                            value={product.brand}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Price ($)</label>

                        <input
                            type="number"
                            name="price"
                            placeholder="1499"
                            value={product.price}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Stock Quantity</label>

                        <input
                            type="number"
                            name="stock"
                            placeholder="25"
                            value={product.stock}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Upload Image</label>

                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleImage}
                        />
                    </div>

                </div>

                <div className="form-group">
                    <label>Description</label>

                    <textarea
                        rows="6"
                        name="description"
                        placeholder="Write product description..."
                        value={product.description}
                        onChange={handleChange}
                    />
                </div>

                {preview && (
                    <div className="preview-box">

                        <h3>Image Preview</h3>

                        <img
                            src={preview}
                            alt="Preview"
                        />

                    </div>
                )}

                <button
                    className="submit-btn"
                    type="submit"
                >
                    Add Product
                </button>

            </form>

        </div>
    );
};

export default AddProduct;