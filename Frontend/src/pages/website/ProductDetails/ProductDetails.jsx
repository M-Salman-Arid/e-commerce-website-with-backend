import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaStar, FaCartShopping } from "react-icons/fa6";
import { getProductById } from "../../../api/productAPI";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import "./ProductDetails.css";
import { addToCartAPI } from "../../../api/cartAPI";


const ProductDetails = () => {

    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchProduct = async () => {

            try {

                const response = await getProductById(id);

                setProduct(response.product);

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);

            }

        };

        fetchProduct();

    }, [id]);

    if (loading) {
        return (
            <>
                <Navbar />
                <h2 className="loading">Loading Product...</h2>
                <Footer />
            </>
        );
    }

    if (!product) {
        return (
            <>
                <Navbar />
                <h2 className="loading">Product Not Found</h2>
                <Footer />
            </>
        );
    }

    const handleAddToCart = async () => {
        try {
            await addToCartAPI(product.id, 1);
            alert("Product added to cart!");
        }
        catch (error) {
            console.error("Error adding product to cart:", error);
            alert("Failed to add product to cart.");
        }
    };

    return (
        <>
            <Navbar />

            <section className="product-details">

                <div className="product-image">

                    <img
                        src={`http://localhost:3000/api/products/image/${product.id}`}
                        alt={product.name}
                    />

                </div>

                <div className="product-info">

                    <h1>{product.name}</h1>

                    <div className="rating">

                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />

                    </div>

                    <h2>
                        Rs. {Number(product.price).toLocaleString()}
                    </h2>

                    <p>
                        <strong>Category:</strong> {product.category_name}
                    </p>

                    <p>
                        <strong>Stock:</strong> {product.stock}
                    </p>

                    <div className="description">

                        <h3>Description</h3>

                        <p>
                            {product.description}
                        </p>

                    </div>

                    <div className="buttons">

                        <button className="cart-btn" onClick={handleAddToCart}>
                            <FaCartShopping />
                            Add to Cart
                        </button>

                        <button className="buy-btn">
                            Buy Now
                        </button>

                    </div>

                </div>

            </section>

            <Footer />
        </>
    );

};

export default ProductDetails;