import "./Users.css";
import { FaEdit, FaTrash, FaUserShield } from "react-icons/fa";
import { getAllUserAPI } from "../../../api/userAPI";
import { useState, useEffect } from "react";
import EditUserModal from "../../../components/EditModels/EditUserModel";
import DeleteUserModal from "../../../components/EditModels/DeleteUserModel";


const Users = () => {

    const [users, setUsers] = useState([]);

    const [selectedUser, setSelectedUser] = useState(null);

    const [showEditModal, setShowEditModal] = useState(false);

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {

        const fetchUsers = async () => {
            try {
                const data = await getAllUserAPI();
                setUsers(data.users);
            } catch (error) {
                console.log(error);
            }
        };

        fetchUsers();

    }, []);

    const openEditModal = (user) => {

        setSelectedUser(user);
        setShowEditModal(true);

    }
    const closeEditModal = () => {

        setSelectedUser(null);
        setShowEditModal(false);

    }

    const openDeleteModal = (user) => {

        setSelectedUser(user);
        setShowDeleteModal(true);

    }

    const closeDeleteModal = () => {

        setSelectedUser(null);
        setShowDeleteModal(false);

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
                                            onClick={() => openEditModal(user)}
                                        >
                                            <FaEdit />
                                        </button>

                                        <button className="role-btn">
                                            <FaUserShield />
                                        </button>

                                        <button
                                            className="delete-btn"
                                            onClick={() => openDeleteModal(user)}
                                        >
                                            <FaTrash />
                                        </button>

                                        {
                                            showEditModal && (

                                                <EditUserModal

                                                    user={selectedUser}

                                                    onClose={closeEditModal}

                                                />

                                            )
                                        }

                                        {
                                            showDeleteModal && (

                                                <DeleteUserModal

                                                    user={selectedUser}

                                                    onClose={closeDeleteModal}

                                                />

                                            )
                                        }

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