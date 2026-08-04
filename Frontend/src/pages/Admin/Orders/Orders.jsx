import "./Orders.css";
import { FaEye, FaTrash } from "react-icons/fa";
import { useState, useEffect } from "react";
import { getOrders } from "../../../api/orderAPI";


const Orders = () => {

    const [orders, setOrders] = useState([]);

    useEffect(() => {

        const fetchOrders = async () => {

            try {

                const response = await getOrders();

                setOrders(response);

            } catch (error) {

                console.error("Error fetching orders:", error);

            }

        };

        fetchOrders();

    }, []);

    return (
        <div className="orders-page">

            <div className="page-heading">

                <h1>Orders</h1>

                <p>Manage customer orders.</p>

            </div>

            <div className="orders-table">

                <table>

                    <thead>

                        <tr>

                            <th>Order ID</th>

                            <th>Customer</th>

                            <th>Date</th>

                            <th>Total</th>

                            <th>Status</th>

                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {orders.map((order) => (

                            <tr key={order.id}>

                                <td>{order.id}</td>

                                <td>{order.customer_name    }</td>

                                <td>{new Date(order.created_at).toISOString().split("T")[0]}</td>

                                <td>{order.total_price}</td>

                                <td>

                                    <select
                                        defaultValue={order.order_status}
                                        className={`status-select ${order.order_status.toLowerCase()}`}
                                    >
                                        <option>Pending</option>
                                        <option>Processing</option>
                                        <option>Shipped</option>
                                        <option>Delivered</option>
                                        <option>Cancelled</option>
                                    </select>

                                </td>

                                <td>

                                    <div className="action-buttons">

                                        <button className="view-btn">
                                            <FaEye />
                                        </button>

                                        <button className="delete-btn">
                                            <FaTrash />
                                        </button>

                                    </div>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
};

export default Orders;