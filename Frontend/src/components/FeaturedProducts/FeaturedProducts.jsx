import "./FeaturedProducts.css";
import { FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const products = [
    {
        id: 1,
        title: "Apple MacBook Pro",
        price: "$1,499",
        rating: 5,
        image:
            "https://images.unsplash.com/photo-1517336714739-489689fd1ca8?w=600",
    },
    {
        id: 2,
        title: "Wireless Headphones",
        price: "$149",
        rating: 4,
        image:
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
    },
    {
        id: 3,
        title: "Smart Watch",
        price: "$249",
        rating: 5,
        image:
            "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600",
    },
    {
        id: 4,
        title: "Gaming Keyboard",
        price: "$89",
        rating: 4,
        image:
            "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=600",
    },
];

const FeaturedProducts = () => {
    return (
        <section className="featured">

            <div className="section-title">
                <h2>Featured Products</h2>
                <p>Hand-picked products specially for you.</p>
            </div>

            <div className="product-grid">

                {products.map((product) => (

                    <div className="product-card" key={product.id}>

                        <div className="product-image">

                            <img
                                src={product.image}
                                alt={product.title}
                            />

                            <button className="wishlist-btn">
                                <FaHeart />
                            </button>

                        </div>

                        <div className="product-info">

                            <h3>{product.title}</h3>

                            <div className="rating">

                                {[...Array(product.rating)].map((_, index) => (
                                    <FaStar key={index} />
                                ))}

                            </div>

                            <h4>{product.price}</h4>

                            <div className="product-buttons">

                                <Link
                                    to={`/products/${product.id}`}
                                    className="details-btn"
                                >
                                    View Details
                                </Link>

                                <button className="cart-btn">
                                    <FaShoppingCart />
                                </button>

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </section>
    );
};

export default FeaturedProducts;