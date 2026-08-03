import { NavLink, useNavigate } from "react-router-dom";
import {
    FaTachometerAlt,
    FaBoxOpen,
    FaPlusCircle,
    FaList,
    FaShoppingCart,
    FaUsers,
    FaUserCircle,
    FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = () => {

    const navigate = useNavigate();

    const handleLogout = () => {

        localStorage.removeItem("token")
        localStorage.removeItem("user")

        navigate("/login")
    }
    return (
        <aside className="sidebar">

            <h2 className="logo">ShopEase</h2>

            <nav>

                <NavLink to="/admin">
                    <FaTachometerAlt />
                    <span>Dashboard</span>
                </NavLink>

                <NavLink to="/admin/admin-products">
                    <FaBoxOpen />
                    <span>Products</span>
                </NavLink>

                <NavLink to="/admin/add-product">
                    <FaPlusCircle />
                    <span>Add Product</span>
                </NavLink>

                <NavLink to="/admin/categories">
                    <FaList />
                    <span>Categories</span>
                </NavLink>

                <NavLink to="/admin/orders">
                    <FaShoppingCart />
                    <span>Orders</span>
                </NavLink>

                <NavLink to="/admin/users">
                    <FaUsers />
                    <span>Users</span>
                </NavLink>

                <NavLink to="/admin/profile">
                    <FaUserCircle />
                    <span>Profile</span>
                </NavLink>

            </nav>

            <button className="logout-btn" onClick={handleLogout}>
                <FaSignOutAlt />
                Logout
            </button>

        </aside>
    );
};

export default Sidebar;