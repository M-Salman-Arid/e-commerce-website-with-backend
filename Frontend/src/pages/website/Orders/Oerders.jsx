import "./Orders.css";

const Orders = () => {

    // Dummy data (Replace with API later)

    const orders = [
        {
            id: 101,
            date: "03 Aug 2026",
            total: 350,
            status: "Delivered",
            items: [
                {
                    id: 1,
                    name: "Atomic Habits",
                    image: "http://localhost:4000/api/products/image/1",
                    quantity: 1,
                    price: 350,
                },
            ],
        },
        {
            id: 102,
            date: "28 Jul 2026",
            total: 2450,
            status: "Processing",
            items: [
                {
                    id: 2,
                    name: "Wireless Headphones",
                    image: "http://localhost:4000/api/products/image/2",
                    quantity: 1,
                    price: 2450,
                },
            ],
        },
    ];

    return (

        <div className="orders-page">

            <h1>My Orders</h1>

            {orders.map((order) => (

                <div
                    className="order-card"
                    key={order.id}
                >

                    <div className="order-header">

                        <div>
                            <h3>Order #{order.id}</h3>
                            <p>{order.date}</p>
                        </div>

                        <span
                            className={`status ${order.status.toLowerCase()}`}
                        >
                            {order.status}
                        </span>

                    </div>

                    <div className="order-products">

                        {order.items.map((item) => (

                            <div
                                className="order-product"
                                key={item.id}
                            >

                                <img
                                    src={item.image}
                                    alt={item.name}
                                />

                                <div className="product-info">

                                    <h4>{item.name}</h4>

                                    <p>
                                        Quantity: {item.quantity}
                                    </p>

                                    <p>
                                        Rs. {item.price.toLocaleString()}
                                    </p>

                                </div>

                            </div>

                        ))}

                    </div>

                    <div className="order-footer">

                        <h3>
                            Total: Rs. {order.total.toLocaleString()}
                        </h3>

                        <button>
                            View Details
                        </button>

                    </div>

                </div>

            ))}

        </div>

    );

};

export default Orders;