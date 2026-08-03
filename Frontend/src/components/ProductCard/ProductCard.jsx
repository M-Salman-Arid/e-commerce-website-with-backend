import { FaCartShopping } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const productName = product?.title || product?.name || "Product";
    const price = product?.price ?? 0;

    return (
        <div className="product-card">
            <img
                src={`http://localhost:3000/api/products/image/${product.id}`}
                alt={productName}
            />

            <h3>{productName}</h3>

            <p>Rs. {Number(price).toFixed(2)}</p>

            <button onClick={() => navigate(`/product/${product.id}`)}>
                View Details
            </button>

            <button>
                <FaCartShopping />
            </button>
        </div>
    );
};

export default ProductCard;