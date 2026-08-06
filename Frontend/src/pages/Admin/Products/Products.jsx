import { useEffect, useState } from "react";
import "./Products.css";
import Loader from "../../../components/Loader/Loader"
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { getProducts, getCategories } from "../../../api/productAPI";
import EditProductModal from "../../../components/EditModels/EditProduct";
import DeleteProductModal from "../../../components/EditModels/DeleteProduct";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [categories, setCategories] = useState([]);

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const fetchProducts = async () => {
        try {
            const data = await getProducts();
            setProducts(data.products);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const data = await getCategories();
            setCategories(data.categories);
        } catch (error) {
            console.error(error);
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    if (loading) {
        return <Loader/>;
    }


    return (
        <div className="products-page">

            <div className="products-header">

                <div>
                    <h1>Products</h1>
                    <p>Manage all products from here.</p>
                </div>

                <Link
                    to="/admin/add-product"
                    className="add-product-btn"
                >
                    <FaPlus />
                    Add Product
                </Link>

            </div>

            <div className="products-table">

                <table>

                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>

                        {products.length > 0 ? (
                            products.map((product) => (
                                <tr key={product.id}>

                                    <td>
                                        <img
                                            src={`http://localhost:3000/api/products/image/${product.id}`}
                                            alt={product.title}
                                            className="product-img"
                                        />
                                    </td>

                                    <td>{product.title}</td>

                                    <td>{product.category_name}</td>

                                    <td>Rs. {product.price}</td>

                                    <td>
                                        <span
                                            className={
                                                product.stock > 10
                                                    ? "stock in-stock"
                                                    : "stock low-stock"
                                            }
                                        >
                                            {product.stock}
                                        </span>
                                    </td>

                                    <td>
                                        <div className="action-buttons">

                                            <button
                                                className="edit-btn"
                                                onClick={() => {
                                                    setSelectedProduct(product);
                                                    setShowEditModal(true);
                                                }}
                                            >
                                                <FaEdit />
                                            </button>

                                            <button
                                                className="delete-btn"
                                                onClick={() => {
                                                    setSelectedProduct(product);
                                                    setShowDeleteModal(true);
                                                }}
                                            >
                                                <FaTrash />
                                            </button>

                                        </div>
                                    </td>

                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" style={{ textAlign: "center" }}>
                                    No products found.
                                </td>
                            </tr>
                        )}

                    </tbody>

                </table>

            </div>
            <EditProductModal
                isOpen={showEditModal}
                onClose={() => setShowEditModal(false)}
                product={selectedProduct}
                categories={categories}
                onUpdate={fetchProducts}

            />
            <DeleteProductModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                product={selectedProduct}
                onDelete={fetchProducts}
            />

        </div>
    );
};

export default Products;