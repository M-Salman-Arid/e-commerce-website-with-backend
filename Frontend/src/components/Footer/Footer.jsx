import "./Footer.css";
import { Link } from "react-router-dom";
import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="footer">

            <div className="footer-container">

                <div className="footer-section">

                    <h2>ShopEase</h2>

                    <p>
                        Your one-stop destination for quality products,
                        affordable prices, and secure online shopping.
                    </p>

                </div>

                <div className="footer-section">

                    <h3>Quick Links</h3>

                    <Link to="/">Home</Link>
                    <Link to="/products">Products</Link>
                    <Link to="/cart">Cart</Link>
                    <Link to="/login">Login</Link>

                </div>

                <div className="footer-section">

                    <h3>Customer</h3>

                    <Link to="/profile">My Account</Link>
                    <Link to="/orders">Orders</Link>
                    <Link to="/wishlist">Wishlist</Link>
                    <Link to="/contact">Contact Us</Link>

                </div>

                <div className="footer-section">

                    <h3>Follow Us</h3>

                    <div className="social-icons">

                        <a href="#">
                            <FaFacebookF />
                        </a>

                        <a href="#">
                            <FaInstagram />
                        </a>

                        <a href="#">
                            <FaTwitter />
                        </a>

                        <a href="#">
                            <FaLinkedinIn />
                        </a>

                    </div>

                </div>

            </div>

            <div className="footer-bottom">

                <p>
                    © {new Date().getFullYear()} ShopEase. All Rights Reserved.
                </p>

            </div>

        </footer>
    );
};

export default Footer;