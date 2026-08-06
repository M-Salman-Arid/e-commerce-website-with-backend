import "./Cart.css";
import {
    FaTrash,
    FaShoppingCart,
    FaShieldAlt,
    FaArrowLeft,
    FaTruck
} from "react-icons/fa";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
    getCartItemsAPI,
    updateCartItemAPI,
    removeCartItemAPI
} from "../../../api/cartAPI";

import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import Loader from "../../../components/Loader/Loader";

const Cart = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [cartItems, setCartItems] = useState([]);

    const subtotal = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    useEffect(() => {

        const fetchCartItems = async () => {

            try {

                const response = await getCartItemsAPI();

                setCartItems(response.data.cart ?? []);

            } catch (error) {

                console.error(error);

            } finally {

                setLoading(false);

            }

        };

        fetchCartItems();

    }, []);

    const updateQuantity = async (productId, newQuantity) => {

        if (newQuantity < 1) {

            toast.error("Quantity cannot be less than 1.");
            return;

        }

        try {

            await updateCartItemAPI(productId, newQuantity);

            setCartItems((prevItems) =>
                prevItems.map((item) =>
                    item.id === productId
                        ? {
                            ...item,
                            quantity: newQuantity
                        }
                        : item
                )
            );

        } catch (error) {

            console.log(error);

            toast.error("Unable to update quantity.");

        }

    };

    const removeItem = async (productId) => {

        try {

            await removeCartItemAPI(productId);

            setCartItems((prevItems) =>
                prevItems.filter((item) => item.id !== productId)
            );

            toast.success("Product removed from cart.");

        } catch (error) {

            console.log(error);

            toast.error("Unable to remove product.");

        }

    };

    if (loading) {

        return <Loader />;

    }

    if (cartItems.length === 0) {

        return (

            <>
                <Navbar />

                <div className="empty-cart">

                    <FaShoppingCart className="empty-cart-icon" />

                    <h2>Your Cart is Empty</h2>

                    <p>
                        Looks like you haven't added any products yet.
                    </p>

                    <button
                        className="continue-shopping-btn"
                        onClick={() => navigate("/products")}
                    >
                        Start Shopping
                    </button>

                </div>

                <Footer />

            </>

        );

    }

    return (

        <>
            <Navbar />

            <section className="cart-page">

                <div className="cart-header">

                    <h1>Shopping Cart</h1>

                    <p>
                        {cartItems.length} Item(s) in your cart
                    </p>

                </div>

                <div className="cart-container">

                    {/* LEFT */}

                    <div className="cart-items">

                        {cartItems.map((item) => (

                            <div
                                className="cart-item"
                                key={item.id}
                            >

                                <div className="cart-image">

                                    <img
                                        src={`http://localhost:3000/api/products/image/${item.product_id}`}
                                        alt={item.name}
                                    />

                                </div>

                                <div className="cart-info">

                                    <h3>{item.name}</h3>

                                    <p className="brand">
                                        Premium Quality Product
                                    </p>

                                    <span className="stock">
                                        In Stock
                                    </span>

                                    <h2 className="price">
                                        Rs. {item.price.toLocaleString()}
                                    </h2>

                                    <div className="quantity">

                                        <button
                                            onClick={() =>
                                                updateQuantity(
                                                    item.id,
                                                    item.quantity - 1
                                                )
                                            }
                                        >
                                            −
                                        </button>

                                        <span>
                                            {item.quantity}
                                        </span>

                                        <button
                                            onClick={() =>
                                                updateQuantity(
                                                    item.id,
                                                    item.quantity + 1
                                                )
                                            }
                                        >
                                            +
                                        </button>

                                    </div>

                                    <p className="item-total">

                                        Item Total :

                                        <strong>

                                            {" "}
                                            Rs.{" "}
                                            {(
                                                item.price *
                                                item.quantity
                                            ).toLocaleString()}

                                        </strong>

                                    </p>

                                </div>

                                <div className="cart-actions">

                                    <button
                                        className="remove-btn"
                                        onClick={() =>
                                            removeItem(item.id)
                                        }
                                    >

                                        <FaTrash />

                                        Remove

                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                    {/* RIGHT */}

                    <div className="cart-summary">

                        <h2>Order Summary</h2>

                        <div className="summary-row">

                            <span>Items</span>

                            <span>
                                {cartItems.length}
                            </span>

                        </div>

                        <div className="summary-row">

                            <span>Subtotal</span>

                            <span>

                                Rs. {subtotal.toLocaleString()}

                            </span>

                        </div>

                        <div className="summary-row">

                            <span>

                                <FaTruck />

                                {" "}Shipping

                            </span>

                            <span>Free</span>

                        </div>

                        <div className="summary-row">

                            <span>Estimated Delivery</span>

                            <span>2 - 4 Days</span>

                        </div>

                        <hr />

                        <div className="summary-row total">

                            <span>Total</span>

                            <span>

                                Rs. {subtotal.toLocaleString()}

                            </span>

                        </div>

                        <button
                            className="checkout-btn"
                            onClick={() => navigate("/checkout")}
                        >
                            Proceed To Checkout
                        </button>

                        <button
                            className="continue-btn"
                            onClick={() => navigate("/products")}
                        >

                            <FaArrowLeft />

                            Continue Shopping

                        </button>

                        <div className="secure-box">

                            <FaShieldAlt />

                            <span>

                                Secure Checkout Guaranteed

                            </span>

                        </div>

                    </div>

                </div>

            </section>

            <Footer />

        </>

    );

};

export default Cart;