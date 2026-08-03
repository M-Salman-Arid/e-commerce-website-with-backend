import "./Cart.css";
import { FaTrash } from "react-icons/fa";

const Cart = () => {

    // Dummy data (replace with API later)
    const cartItems = [
        {
            id: 1,
            name: "Apple MacBook Pro",
            price: 149999,
            quantity: 1,
            image: "http://localhost:3000/api/products/image/1",
        },
        {
            id: 2,
            name: "Gaming Keyboard",
            price: 4500,
            quantity: 2,
            image: "http://localhost:4000/api/products/image/2",
        },
    ];

    const subtotal = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    return (
        <div className="cart-page">

            <h1>Shopping Cart</h1>

            <div className="cart-container">

                {/* Left Side */}

                <div className="cart-items">

                    {cartItems.map((item) => (

                        <div className="cart-item" key={item.id}>

                            <img
                                src={item.image}
                                alt={item.name}
                            />

                            <div className="cart-info">

                                <h3>{item.name}</h3>

                                <p>
                                    Rs. {item.price.toLocaleString()}
                                </p>

                                <div className="quantity">

                                    <button>-</button>

                                    <span>{item.quantity}</span>

                                    <button>+</button>

                                </div>

                            </div>

                            <button className="delete-btn">

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

                    <button className="checkout-btn">
                        Proceed to Checkout
                    </button>

                </div>

            </div>

        </div>
    );
};

export default Cart;