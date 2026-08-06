import { useState, useEffect } from "react";
import "./EditUserModel.css";
import { updateUserAPI } from "../../api/userAPI";
import { toast } from "react-toastify";

const EditUserModal = ({ isOpen, onClose, user, onUpdate}) => {

    const [formData, setFormData] = useState({
        role: "",
        status: ""
    });

    useEffect(() => {

        if (user) {
            setFormData({
                role: user.role,
                status: user.status
            });
        }

    }, [user]);

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await updateUserAPI(user.id, formData);
            onUpdate();
            toast.success("User Updated Sucessfully.")
            onClose();

        } catch (error) {
            console.log(error);
            toast.error("Error updating User!")
        }

    };

    if (!isOpen) return null;

    return (

        <div className="modal-overlay">

            <div className="modal">

                <h2>Edit User</h2>

                <form onSubmit={handleSubmit}>

                    <div className="form-group">

                        <label>Name</label>

                        <input
                            type="text"
                            value={user.name}
                            disabled
                        />

                    </div>

                    <div className="form-group">

                        <label>Email</label>

                        <input
                            type="email"
                            value={user.email}
                            disabled
                        />

                    </div>

                    <div className="form-group">

                        <label>Role</label>

                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>

                    </div>

                    <div className="form-group">

                        <label>Status</label>

                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                        >
                            <option value="active">Active</option>
                            <option value="blocked">Blocked</option>
                        </select>

                    </div>

                    <div className="modal-buttons">

                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={onClose}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="save-btn"
                        >
                            Save Changes
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

};

export default EditUserModal;