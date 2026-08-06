import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import Loader from "../../../components/Loader/Loader";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Home.css";
import { getCategories, getProducts } from "../../../api/productAPI";

import { FaShippingFast, FaLock, FaUndoAlt, FaHeadset } from "react-icons/fa";
import ProductCard from "../../../components/ProductCard/ProductCard";

const features = [
    {
        id: 1,
        icon: <FaShippingFast />,
        title: "Free Shipping",
        description: "Free delivery on all orders over $50.",
    },
    {
        id: 2,
        icon: <FaLock />,
        title: "Secure Payment",
        description: "100% secure payment with trusted gateways.",
    },
    {
        id: 3,
        icon: <FaUndoAlt />,
        title: "Easy Returns",
        description: "30-day easy return and refund policy.",
    },
    {
        id: 4,
        icon: <FaHeadset />,
        title: "24/7 Support",
        description: "Our support team is always ready to help.",
    },
];

const Home = () => {

    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchHomeData = async () => {

            try {

                const [categoryResponse, productResponse] = await Promise.all([
                    getCategories(),
                    getProducts()
                ]);

                setCategories(categoryResponse.categories || []);
                setProducts(productResponse.products || []);

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);

            }

        };

        fetchHomeData();

    }, []);

    if (loading) {
        return <Loader/>
    }
    return (
        <>
            <Navbar />
            <section className="hero">

                <div className="hero-content">

                    <span className="hero-tag">
                        🔥 Summer Sale 2026
                    </span>

                    <h1>
                        Shop Smarter,
                        <br />
                        Live Better.
                    </h1>

                    <p>
                        Discover thousands of quality products at amazing prices.
                        Fast delivery, secure payments, and exclusive deals every day.
                    </p>

                    <div className="hero-buttons">

                        <Link to="/products" className="btn-primary">
                            Shop Now
                        </Link>

                        <Link to="/categories" className="btn-secondary">
                            Browse Categories
                        </Link>

                    </div>

                </div>

                <div className="hero-image">

                    <img
                        src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=700"
                        alt="Shopping"
                    />

                </div>
            </section>

            <section className="categories">

                <div className="section-title">
                    <h2>Shop by Category</h2>
                    <p>Find everything you need in one place.</p>
                </div>

                <div className="categories-grid">

                    {categories.map((category) => (
                        <div className="category-card" key={category.id}>

                            <div className="category-icon">
                                📦
                            </div>

                            <h3>{category.name}</h3>

                        </div>
                    ))}

                </div>

            </section>

            <section className="featured">

                <div className="section-header">

                    <div className="section-title">
                        <h2>Featured Products</h2>
                        <Link to="/products" className="view-all-btn">
                            View All Products <span>→</span>
                        </Link>
                    </div>

                    <p>Hand-picked products specially for you.</p>
                </div>

                <div className="product-grid">

                    {products
                        .slice(0, 3 )
                        .map((product) => (

                            <ProductCard
                                key={product.id}
                                product={product}
                            />

                        ))}

                </div>

            </section>


            <section className="why-section">

                <div className="section-title">
                    <h2>Why Shop With Us?</h2>
                    <p>
                        We provide the best shopping experience with trusted service and
                        premium quality products.
                    </p>
                </div>

                <div className="feature-grid">

                    {features.map((feature) => (
                        <div className="feature-card" key={feature.id}>

                            <div className="feature-icon">
                                {feature.icon}
                            </div>

                            <h3>{feature.title}</h3>

                            <p>{feature.description}</p>

                        </div>
                    ))}

                </div>

            </section>
            <Footer />
        </>
    );
};

export default Home;
