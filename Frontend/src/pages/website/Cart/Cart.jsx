import "./Cart.css";
import { FaTrash } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCartItemsAPI, updateCartItemAPI, removeCartItemAPI } from "../../../api/cartAPI";

import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";

const Cart = () => {

    const navigate = useNavigate();

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
                console.error("Error fetching cart items:", error);
            }
        };
        fetchCartItems();
    }, []);


    const updateQuantity = async (productId, newQuantity) => {

        try {

            await updateCartItemAPI(productId, newQuantity);
            setCartItems((prevItems) =>
                prevItems.map((item) =>
                    item.id === productId ? { ...item, quantity: newQuantity } : item
                )
            );
        }
        catch (error) {
            console.error("Error updating cart item:", error);
        }

    };

    const removeItem = async (productId) => {

        try {
            await removeCartItemAPI(productId);
            setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
        }
        catch (error) {
            console.error("Error removing cart item:", error);
        }
    };



    return (

        <>
            <Navbar />

            <div className="cart-page">

                <h1>Shopping Cart</h1>

                <div className="cart-container">

                    {/* Left Side */}

                    <div className="cart-items">

                        {cartItems.map((item) => (

                            <div className="cart-item" key={item.id}>

                                <img
                                    src={`http://localhost:3000/api/products/image/${item.product_id}`}
                                    alt={item.name}
                                />

                                <div className="cart-info">

                                    <h3>{item.name}</h3>

                                    <p>
                                        Rs. {item.price.toLocaleString()}
                                    </p>

                                    <div className="quantity">

                                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>

                                        <span>{item.quantity}</span>

                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>

                                    </div>

                                </div>

                                <button className="delete-btn" onClick={() => removeItem(item.id)}>

                                    <FaTrash />

                                </button>

                            </div>

                        ))}

                    </div>

                    {/* Right Side */}

                    <div className="cart-summary">

                        <h2>Order Summary</h2>

                        <div className="summary-row">
                            <span>Subtotal</span>
                            <span>Rs. {subtotal.toLocaleString()}</span>
                        </div>

                        <div className="summary-row">
                            <span>Shipping</span>
                            <span>Free</span>
                        </div>

                        <hr />

                        <div className="summary-row total">
                            <span>Total</span>
                            <span>Rs. {subtotal.toLocaleString()}</span>
                        </div>

                        <button className="checkout-btn" onClick={() => navigate("/checkout")}>
                            Proceed to Checkout
                        </button>

                    </div>

                </div>

            </div>

            <Footer />

        </>

    );
};

export default Cart;