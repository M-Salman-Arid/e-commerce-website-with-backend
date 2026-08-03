import "./Checkout.css";
import { useState } from "react";

const Checkout = () => {

    const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

    // Dummy cart data
    const cartItems = [
        {
            id: 1,
            name: "Atomic Habits",
            price: 350,
            quantity: 2,
        },
        {
            id: 2,
            name: "Wireless Headphones",
            price: 2450,
            quantity: 1,
        },
    ];

    const subtotal = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    return (

        <div className="checkout-page">

            <h1>Checkout</h1>

            <div className="checkout-container">

                {/* Shipping Information */}

                <div className="checkout-form">

                    <h2>Shipping Information</h2>

                    <input
                        type="text"
                        placeholder="Full Name"
                    />

                    <input
                        type="email"
                        placeholder="Email"
                    />

                    <input
                        type="text"
                        placeholder="Phone Number"
                    />

                    <textarea
                        placeholder="Complete Address"
                        rows="4"
                    />

                    <input
                        type="text"
                        placeholder="City"
                    />

                    <input
                        type="text"
                        placeholder="Postal Code"
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
                                {item.name} × {item.quantity}
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

                    <button className="place-order-btn">
                        Place Order
                    </button>

                </div>

            </div>

        </div>

    );

};

export default Checkout;