import "./Checkout.css";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
    FaUser,
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaCity,
    FaMailBulk,
    FaMoneyBillWave,
    FaCreditCard,
    FaUniversity,
    FaWallet,
    FaCheckCircle,
    FaArrowLeft
} from "react-icons/fa";

import { toast } from "react-toastify";

import { createOrder } from "../../../api/orderAPI";
import { getProfileAPI } from "../../../api/userAPI";
import { getCartItemsAPI } from "../../../api/cartAPI";

import Navbar from "../../../components/Navbar/Navbar"


const Checkout = () => {

    const navigate = useNavigate();

    const [profile, setProfile] = useState({
        id: "",
        name: "",
        email: "",
        phone: ""
    });

    const [cartItems, setCartItems] = useState([]);

    const [shippingInfo, setShippingInfo] = useState({
        shipping_address: "",
        city: "",
        postal_code: ""
    });

    const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

    const subtotal = cartItems.reduce(
        (total, item) =>
            total + item.price * item.quantity,
        0
    );

    useEffect(() => {

        const fetchData = async () => {

            try {

                const profileData =
                    await getProfileAPI();

                setProfile({
                    id: profileData.user.id,
                    name: profileData.user.name,
                    email: profileData.user.email,
                    phone: profileData.user.phone || ""
                });

                const cartData =
                    await getCartItemsAPI();

                setCartItems(
                    cartData.data.cart ?? []
                );

            } catch (error) {

                console.log(error);

                toast.error(
                    "Unable to load checkout."
                );

            }

        };

        fetchData();

    }, []);

    const handleChange = (e) => {

        const { name, value } = e.target;

        setShippingInfo((prev) => ({
            ...prev,
            [name]: value
        }));

    };

    const handlePlaceOrder = async () => {

        if (
            !shippingInfo.shipping_address ||
            !shippingInfo.city ||
            !shippingInfo.postal_code
        ) {

            toast.error(
                "Please fill all shipping details."
            );

            return;

        }

        const orderData = {

            user_id: profile.id,

            items: cartItems.map((item) => ({
                product_id: item.product_id,
                quantity: item.quantity,
                price: item.price
            })),

            total_amount: subtotal,

            shipping_address:
                shippingInfo.shipping_address,

            city: shippingInfo.city,

            postal_code:
                shippingInfo.postal_code,

            payment_method: paymentMethod

        };

        try {

            await createOrder(orderData);

            toast.success(
                "Order placed successfully!"
            );

            navigate("/order-success");

        } catch (error) {

            console.log(error);

            toast.error(
                "Unable to place order."
            );

        }

    };

    return (

        <>
            <Navbar />


            <div className="checkout-page">
                <button
                    className="back-btn"
                    onClick={() => navigate(-1)}
                >
                    <FaArrowLeft />
                    <span>Back</span>
                </button>

                <div className="checkout-header">

                    <h1>Checkout</h1>

                    <p>
                        Complete your order securely
                    </p>

                </div>

                <div className="checkout-container">

                    {/* LEFT SIDE */}

                    <div className="checkout-form">

                        <div className="section-title">

                            <FaMapMarkerAlt />

                            <h2>
                                Shipping Information
                            </h2>

                        </div>

                        <div className="input-group">

                            <label>

                                <FaUser />

                                Full Name

                            </label>

                            <input
                                type="text"
                                value={profile.name}
                                readOnly
                            />

                        </div>

                        <div className="input-group">

                            <label>

                                <FaEnvelope />

                                Email Address

                            </label>

                            <input
                                type="email"
                                value={profile.email}
                                readOnly
                            />

                        </div>

                        <div className="input-group">

                            <label>

                                <FaPhone />

                                Phone Number

                            </label>

                            <input
                                type="text"
                                value={profile.phone}
                                readOnly
                            />

                        </div>

                        <div className="input-group">

                            <label>

                                <FaMapMarkerAlt />

                                Complete Address

                            </label>

                            <textarea

                                rows="4"

                                name="shipping_address"

                                value={
                                    shippingInfo.shipping_address
                                }

                                onChange={handleChange}

                                placeholder="House No, Street, Area"

                            />

                        </div>

                        <div className="two-columns">

                            <div className="input-group">

                                <label>

                                    <FaCity />

                                    City

                                </label>

                                <input

                                    type="text"

                                    name="city"

                                    value={
                                        shippingInfo.city
                                    }

                                    onChange={handleChange}

                                    placeholder="City"

                                />

                            </div>

                            <div className="input-group">

                                <label>

                                    <FaMailBulk />

                                    Postal Code

                                </label>

                                <input

                                    type="text"

                                    name="postal_code"

                                    value={
                                        shippingInfo.postal_code
                                    }

                                    onChange={handleChange}

                                    placeholder="Postal Code"

                                />

                            </div>

                        </div>

                        <div className="section-title payment-title">
                            <FaMoneyBillWave />
                            <h2>Payment Method</h2>
                        </div>

                        <div className="payment-methods">

                            <div
                                className={`payment-card ${paymentMethod === "Cash on Delivery" ? "active-payment" : ""
                                    }`}
                                onClick={() => setPaymentMethod("Cash on Delivery")}
                            >
                                <FaMoneyBillWave className="payment-icon" />

                                <div>
                                    <h4>Cash on Delivery</h4>
                                    <p>Pay when your order arrives.</p>
                                </div>

                                {paymentMethod === "Cash on Delivery" && (
                                    <FaCheckCircle className="selected-icon" />
                                )}
                            </div>

                            <div
                                className={`payment-card ${paymentMethod === "Credit Card" ? "active-payment" : ""
                                    }`}
                                onClick={() => setPaymentMethod("Credit Card")}
                            >
                                <FaCreditCard className="payment-icon" />

                                <div>
                                    <h4>Credit / Debit Card</h4>
                                    <p>Visa, MasterCard, PayPak</p>
                                </div>

                                {paymentMethod === "Credit Card" && (
                                    <FaCheckCircle className="selected-icon" />
                                )}
                            </div>

                            <div
                                className={`payment-card ${paymentMethod === "Bank Transfer" ? "active-payment" : ""
                                    }`}
                                onClick={() => setPaymentMethod("Bank Transfer")}
                            >
                                <FaUniversity className="payment-icon" />

                                <div>
                                    <h4>Bank Transfer</h4>
                                    <p>Direct bank payment.</p>
                                </div>

                                {paymentMethod === "Bank Transfer" && (
                                    <FaCheckCircle className="selected-icon" />
                                )}
                            </div>

                            <div
                                className={`payment-card ${paymentMethod === "EasyPaisa / JazzCash"
                                    ? "active-payment"
                                    : ""
                                    }`}
                                onClick={() => setPaymentMethod("EasyPaisa / JazzCash")}
                            >
                                <FaWallet className="payment-icon" />

                                <div>
                                    <h4>EasyPaisa / JazzCash</h4>
                                    <p>Pay instantly using mobile wallet.</p>
                                </div>

                                {paymentMethod === "EasyPaisa / JazzCash" && (
                                    <FaCheckCircle className="selected-icon" />
                                )}
                            </div>

                        </div>
                    </div>

                    {/* ==================== ORDER SUMMARY ==================== */}

                    <div className="checkout-summary">

                        <div className="summary-card">

                            <div className="summary-header">

                                <h2>Order Summary</h2>

                                <span>{cartItems.length} Item(s)</span>

                            </div>

                            <div className="summary-products">

                                {cartItems.map((item) => (

                                    <div
                                        className="summary-product"
                                        key={item.id}
                                    >

                                        <div className="summary-product-left">

                                            <img
                                                src={`http://localhost:3000/api/products/image/${item.product_id}`}
                                                alt={item.title}
                                            />

                                            <div>

                                                <h4>{item.title}</h4>

                                                <p>
                                                    Qty: {item.quantity}
                                                </p>

                                            </div>

                                        </div>

                                        <div className="summary-product-price">

                                            Rs. {(item.price * item.quantity).toLocaleString()}

                                        </div>

                                    </div>

                                ))}

                            </div>

                            <hr />

                            <div className="summary-row">

                                <span>Subtotal</span>

                                <span>
                                    Rs. {subtotal.toLocaleString()}
                                </span>

                            </div>

                            <div className="summary-row">

                                <span>Shipping</span>

                                <span className="free-shipping">

                                    Free

                                </span>

                            </div>

                            <div className="summary-row">

                                <span>Discount</span>

                                <span>

                                    Rs. 0

                                </span>

                            </div>

                            <hr />

                            <div className="summary-total">

                                <span>Total</span>

                                <span>

                                    Rs. {subtotal.toLocaleString()}

                                </span>

                            </div>

                            <button
                                className="place-order-btn"
                                onClick={handlePlaceOrder}
                            >

                                Place Order

                            </button>

                            <div className="secure-checkout">

                                🔒 Secure Checkout

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </>

    );

};

export default Checkout;