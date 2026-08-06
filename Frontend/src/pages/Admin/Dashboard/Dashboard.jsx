import "./Dashboard.css";
import { FaBoxOpen, FaUsers, FaShoppingCart, FaDollarSign} from "react-icons/fa";
import { useEffect, useState } from "react";
import { getDashboardData } from "../../../api/dashboardAPI";
import Loader from "../../../components/Loader/Loader";

const Dashboard = () => {
    
    const [products, setProducts] = useState(0);
    const [users, setUsers] = useState(0);
    const [orders, setOrders] = useState(0);
    const [revenue, setRevenue] = useState(0);

    const [loading, setloading] = useState(true)

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
            } finally {
                setloading(false)
            }
        };

        fetchDashboardData();

    }, []);

    if(loading) {
        return <Loader/>
    }

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

        </div>
    );
};

export default Dashboard;