import "./Checkout.css";
import { useState, useEffect } from "react";
import { createOrder } from "../../../api/orderAPI";
import { getProfileAPI } from "../../../api/userAPI";
import { getCartItemsAPI } from "../../../api/cartAPI";

import { useNavigate } from "react-router-dom";

const Checkout = () => {

    const navigate = useNavigate();

    const [profile, setProfile] = useState({
        name: "",
        email: "",
        phone: ""
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getProfileAPI();

                setProfile({
                    name: data.user.name,
                    email: data.user.email,
                    phone: data.user.phone || ""

                });
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };

        fetchProfile();
    }, []);


    const [cartItems, setCartItems] = useState([]);

    const subtotal = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const items = await getCartItemsAPI();
                setCartItems(items.data.cart ?? []);
            } catch (error) {
                console.error("Error fetching cart items:", error);
            }
        };

        fetchCartItems();
    }, []);

    
    const [shippingInfo, setShippingInfo] = useState({
        shipping_address: "",
        city: "",
        postal_code: ""
    });

    const handleChange = (e) => {
        setShippingInfo({
            ...shippingInfo,
            [e.target.name]: e.target.value,
        });
    };
    const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

    const handlePlaceOrder = async () => {
        const orderData = {
            user_id: profile.id,
            items: cartItems.map((item) => ({
                product_id: item.product_id,
                quantity: item.quantity,
                price: item.price
            })),
            total_amount: subtotal,
            shipping_address: shippingInfo.shipping_address,
            city: shippingInfo.city,
            postal_code: shippingInfo.postal_code,
            payment_method: paymentMethod
        };

        try {
            await createOrder(orderData);
            alert("Order placed successfully!");
            navigate("/order-success");
        } catch (error) {
            console.error("Error placing order:", error);
        }
    };

    return (

        <div className="checkout-page">

            <h1>Checkout</h1>

            <div className="checkout-container">

                {/* Shipping Information */}

                <div className="checkout-form">

                    <h2>Shipping Information</h2>

                    <input
                        type="text"
                        name="name"
                        value={profile.name}
                        placeholder="Full Name"
                        readOnly
                    />

                    <input
                        type="email"
                        name="email"
                        value={profile.email}
                        readOnly
                    />

                    <input
                        type="number"
                        name="phone"
                        value={profile.phone}
                        placeholder="Phone Number"
                        readOnly
                    />

                    <textarea
                        name="shipping_address"
                        placeholder="Complete Address"
                        rows="4"
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="city"
                        placeholder="City"
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="postal_code"
                        placeholder="Postal Code"
                        onChange={handleChange}
                        required
                    />

                    <h3>Payment Method</h3>

                    <label>

                        <input
                            type="radio"
                            checked={paymentMethod === "Cash on Delivery"}
                            onChange={() => setPaymentMethod("Cash on Delivery")}
                        />

                        Cash on Delivery

                    </label>

                    <label>

                        <input
                            type="radio"
                            checked={paymentMethod === "Credit Card"}
                            onChange={() => setPaymentMethod("Credit Card")}
                        />

                        Credit / Debit Card

                    </label>

                </div>

                {/* Order Summary */}

                <div className="checkout-summary">

                    <h2>Order Summary</h2>

                    {cartItems.map((item) => (

                        <div
                            className="summary-item"
                            key={item.id}
                        >

                            <span>
                                {item.title} × {item.quantity}
                            </span>

                            <span>
                                Rs. {(item.price * item.quantity).toLocaleString()}
                            </span>

                        </div>

                    ))}

                    <hr />

                    <div className="summary-item">
                        <strong>Subtotal</strong>
                        <strong>Rs. {subtotal.toLocaleString()}</strong>
                    </div>

                    <div className="summary-item">
                        <span>Shipping</span>
                        <span>Free</span>
                    </div>

                    <hr />

                    <div className="summary-item total">
                        <strong>Total</strong>
                        <strong>Rs. {subtotal.toLocaleString()}</strong>
                    </div>

                    <button className="place-order-btn" onClick={handlePlaceOrder}>
                        Place Order
                    </button>

                </div>

            </div>

        </div>

    );

};

export default Checkout;