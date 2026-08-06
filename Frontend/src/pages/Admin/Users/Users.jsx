import "./Users.css";
import { toast } from "react-toastify"
import { FaEdit, FaTrash, FaUserShield } from "react-icons/fa";
import { getAllUserAPI } from "../../../api/userAPI";
import { useState, useEffect } from "react";
import EditUserModal from "../../../components/EditModels/EditUserModel";
import DeleteUserModal from "../../../components/EditModels/DeleteUserModel";
import Loader from "../../../components/Loader/Loader";


const Users = () => {

    const [users, setUsers] = useState([]);
    const [loading, setloading] = useState(true)

    const [search, setSearch] = useState("");

    const [selectedUser, setSelectedUser] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const fetchUsers = async () => {
        try {
            const data = await getAllUserAPI();
            setUsers(data.users);
        } catch (error) {
            console.log(error);
            toast.error("Error fetching Users!")
        } finally {
            setloading(false)
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [])


    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) {
        return <Loader />
    }

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
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
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

                        {filteredUsers.map((user) => (

                            <tr key={user.id}>

                                <td>{user.id}</td>

                                <td>{user.name}</td>

                                <td>{user.email}</td>

                                <td> {user.role} </td>

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

                                        <button
                                            className="edit-btn"
                                            onClick={() => {
                                                setSelectedUser(user);
                                                setShowEditModal(true);
                                            }}
                                        >
                                            <FaEdit />
                                        </button>

                                        <button className="role-btn">
                                            <FaUserShield />
                                        </button>

                                        <button
                                            className="delete-btn"
                                            onClick={() => {
                                                setSelectedUser(user);
                                                setShowDeleteModal(true);
                                            }}
                                        >
                                            <FaTrash />
                                        </button>

                                        <EditUserModal
                                            isOpen={showEditModal}
                                            onClose={() => { setShowEditModal(false) }}
                                            user={selectedUser}
                                            onUpdate={fetchUsers}
                                        />

                                        <DeleteUserModal
                                            isOpen = {showDeleteModal}
                                            onClose={() => {setShowDeleteModal(false)}}
                                            user={selectedUser}
                                            onDelete= {fetchUsers}
                                        />

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