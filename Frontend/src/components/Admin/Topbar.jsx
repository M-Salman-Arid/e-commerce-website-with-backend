import { FaBell, FaUserCircle } from "react-icons/fa";

const Topbar = () => {
  return (
    <header className="topbar">

      <h2>Admin Dashboard</h2>

      <div className="topbar-right">

        <FaBell className="top-icon" />

        <div className="admin-user">

          <FaUserCircle size={30} />

          <span>Admin</span>

        </div>

      </div>

    </header>
  );
};

export default Topbar;