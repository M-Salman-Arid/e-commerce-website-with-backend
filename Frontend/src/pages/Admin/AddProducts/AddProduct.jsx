import { useState } from "react";
import "./AddProduct.css";

const AddProduct = () => {
    const [product, setProduct] = useState({
        title: "",
        description: "",
        category: "",
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

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(product);
        console.log(image);

        // Backend API Later
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
                            name="category"
                            value={product.category}
                            onChange={handleChange}
                        >
                            <option value="">Select Category</option>
                            <option>Electronics</option>
                            <option>Fashion</option>
                            <option>Furniture</option>
                            <option>Sports</option>
                            <option>Books</option>
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