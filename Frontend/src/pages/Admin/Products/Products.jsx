import "./Products.css";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const products = [
    {
        id: 1,
        image: "https://picsum.photos/80?1",
        name: "MacBook Pro",
        category: "Electronics",
        price: "$1499",
        stock: 15,
    },
    {
        id: 2,
        image: "https://picsum.photos/80?2",
        name: "Gaming Keyboard",
        category: "Accessories",
        price: "$120",
        stock: 42,
    },
    {
        id: 3,
        image: "https://picsum.photos/80?3",
        name: "Smart Watch",
        category: "Electronics",
        price: "$299",
        stock: 18,
    },
];

const Products = () => {
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

                        {products.map((product) => (

                            <tr key={product.id}>

                                <td>
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="product-img"
                                    />
                                </td>

                                <td>{product.name}</td>

                                <td>{product.category}</td>

                                <td>{product.price}</td>

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

                                        <Link
                                            to={`/admin/edit-product/${product.id}`}
                                            className="edit-btn"
                                        >
                                            <FaEdit />
                                        </Link>

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
    );
};

export default Products;