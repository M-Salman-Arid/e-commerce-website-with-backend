import "./Dashboard.css";
import {
    FaBoxOpen,
    FaUsers,
    FaShoppingCart,
    FaDollarSign,
} from "react-icons/fa";

import { useEffect, useState } from "react";
import { getDashboardData } from "../../../api/dashboardAPI";

const Dashboard = () => {
    
    const [products, setProducts] = useState(0);
    const [users, setUsers] = useState(0);
    const [orders, setOrders] = useState(0);
    const [revenue, setRevenue] = useState(0);


    useEffect(() => {
        
        const fetchDashboardData = async () => {
            try {
                const response = await getDashboardData();
                setProducts(response.products);
                setUsers(response.users);
                setOrders(response.orders);
                setRevenue(response.revenue);
            }
            catch (error) {
                console.error("Error fetching dashboard data:", error);
            }
        };

        fetchDashboardData();

    }, []);

    return (
        <div className="dashboard">

            <div className="dashboard-header">
                <h1>Dashboard</h1>
                <p>Welcome back, Admin 👋</p>
            </div>

            {/* Statistics */}

            <div className="stats-container">

                <div className="stat-card">

                    <div className="stat-icon products">
                        <FaBoxOpen />
                    </div>

                    <div>
                        <h2>{products}</h2>
                        <p>Total Products</p>
                    </div>

                </div>

                <div className="stat-card">

                    <div className="stat-icon users">
                        <FaUsers />
                    </div>

                    <div>
                        <h2>{users}</h2>
                        <p>Total Users</p>
                    </div>

                </div>

                <div className="stat-card">

                    <div className="stat-icon orders">
                        <FaShoppingCart />
                    </div>

                    <div>
                        <h2>{orders}</h2>
                        <p>Total Orders</p>
                    </div>

                </div>

                <div className="stat-card">

                    <div className="stat-icon revenue">
                        <FaDollarSign />
                    </div>

                    <div>
                        <h2>Rs. {Number(revenue).toLocaleString()}</h2>
                        <p>Total Revenue</p>
                    </div>

                </div>

            </div>

            {/* Recent Orders */}

            <div className="dashboard-table">

                <div className="table-header">
                    <h2>Recent Orders</h2>
                </div>

                <table>

                    <thead>

                        <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Product</th>
                            <th>Amount</th>
                            <th>Status</th>
                        </tr>

                    </thead>

                    <tbody>

                        <tr>
                            <td>#1001</td>
                            <td>Ali</td>
                            <td>MacBook Pro</td>
                            <td>$1,499</td>
                            <td>
                                <span className="status completed">
                                    Completed
                                </span>
                            </td>
                        </tr>

                        <tr>
                            <td>#1002</td>
                            <td>Ahmed</td>
                            <td>Gaming Keyboard</td>
                            <td>$120</td>
                            <td>
                                <span className="status pending">
                                    Pending
                                </span>
                            </td>
                        </tr>

                        <tr>
                            <td>#1003</td>
                            <td>Salman</td>
                            <td>Smart Watch</td>
                            <td>$299</td>
                            <td>
                                <span className="status cancelled">
                                    Cancelled
                                </span>
                            </td>
                        </tr>

                    </tbody>

                </table>

            </div>

        </div>
    );
};

export default Dashboard;