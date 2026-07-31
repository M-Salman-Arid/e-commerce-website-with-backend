import "./Admin.css";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
    return (
        <div className="admin-layout">

            <Sidebar />

            <div className="admin-main">

                <Topbar />

                <div className="admin-content">
                    <Outlet />
                </div>

            </div>

        </div>
    );
};

export default AdminLayout;