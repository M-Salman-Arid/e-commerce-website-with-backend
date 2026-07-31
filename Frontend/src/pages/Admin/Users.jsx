import "./Users.css";
import { FaEdit, FaTrash, FaUserShield } from "react-icons/fa";

const users = [
    {
        id: 1,
        name: "Ali Khan",
        email: "ali@gmail.com",
        role: "User",
        status: "Active",
    },
    {
        id: 2,
        name: "Ahmed",
        email: "ahmed@gmail.com",
        role: "Admin",
        status: "Active",
    },
    {
        id: 3,
        name: "Salman",
        email: "salman@gmail.com",
        role: "User",
        status: "Blocked",
    },
];

const Users = () => {
    return (
        <div className="users-page">

            <div className="page-heading">
                <h1>Users</h1>
                <p>Manage all registered users.</p>
            </div>

            <div className="users-toolbar">

                <input
                    type="text"
                    placeholder="Search users..."
                />

            </div>

            <div className="users-table">

                <table>

                    <thead>

                        <tr>

                            <th>ID</th>

                            <th>Name</th>

                            <th>Email</th>

                            <th>Role</th>

                            <th>Status</th>

                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {users.map((user) => (

                            <tr key={user.id}>

                                <td>{user.id}</td>

                                <td>{user.name}</td>

                                <td>{user.email}</td>

                                <td>

                                    <select
                                        defaultValue={user.role}
                                        className="role-select"
                                    >
                                        <option>User</option>
                                        <option>Admin</option>
                                    </select>

                                </td>

                                <td>

                                    <span
                                        className={
                                            user.status === "Active"
                                                ? "status active"
                                                : "status blocked"
                                        }
                                    >
                                        {user.status}
                                    </span>

                                </td>

                                <td>

                                    <div className="action-buttons">

                                        <button className="edit-btn">
                                            <FaEdit />
                                        </button>

                                        <button className="role-btn">
                                            <FaUserShield />
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

export default Users;