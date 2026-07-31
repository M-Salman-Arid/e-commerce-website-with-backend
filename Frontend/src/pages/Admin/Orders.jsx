import "./Orders.css";
import { FaEye, FaTrash } from "react-icons/fa";

const orders = [
    {
        id: "#1001",
        customer: "Ali Khan",
        date: "2026-07-27",
        amount: "$1499",
        status: "Pending",
    },
    {
        id: "#1002",
        customer: "Ahmed",
        date: "2026-07-26",
        amount: "$299",
        status: "Shipped",
    },
    {
        id: "#1003",
        customer: "Salman",
        date: "2026-07-25",
        amount: "$89",
        status: "Delivered",
    },
    {
        id: "#1004",
        customer: "Usman",
        date: "2026-07-24",
        amount: "$560",
        status: "Cancelled",
    },
];

const Orders = () => {
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

                                <td>{order.customer}</td>

                                <td>{order.date}</td>

                                <td>{order.amount}</td>

                                <td>

                                    <select
                                        defaultValue={order.status}
                                        className={`status-select ${order.status.toLowerCase()}`}
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