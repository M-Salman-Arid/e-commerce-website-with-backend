import { useState } from "react";
import { useParams } from "react-router-dom";
import "./AddProduct.css";

const EditProduct = () => {
    const { id } = useParams();

    const [product, setProduct] = useState({
        title: "MacBook Pro M4",
        description:
            "Latest Apple MacBook with M4 chip.",
        category: "Electronics",
        brand: "Apple",
        price: "1499",
        stock: "20",
    });

    const [preview, setPreview] = useState(
        "https://picsum.photos/250"
    );

    const [image, setImage] = useState(null);

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

        console.log(id);
        console.log(product);
        console.log(image);

        // Update API later
    };

    return (
        <div className="add-product-page">

            <div className="page-heading">
                <h1>Edit Product</h1>
                <p>Update product information.</p>
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
                            value={product.brand}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Price</label>

                        <input
                            type="number"
                            name="price"
                            value={product.price}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Stock</label>

                        <input
                            type="number"
                            name="stock"
                            value={product.stock}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Change Image</label>

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
                        value={product.description}
                        onChange={handleChange}
                    />

                </div>

                <div className="preview-box">

                    <h3>Current Image</h3>

                    <img
                        src={preview}
                        alt="Preview"
                    />

                </div>

                <button
                    className="submit-btn"
                    type="submit"
                >
                    Update Product
                </button>

            </form>

        </div>
    );
};

export default EditProduct;