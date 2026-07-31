import "./DeleteUserModel.css";
import { deleteUserAPI } from "../../api/userAPI";

const DeleteUserModal = ({ user, onClose }) => {

    const handleDelete = async () => {

        try {

            const result = await deleteUserAPI(user.id);

            if (result.success) {
                alert(result.message);
                onClose();
            }

        } catch (error) {

            console.log(error);

        }

    };

    if (!user) return null;

    return (

        <div className="delete-overlay">

            <div className="delete-modal">

                <h2>Delete User</h2>

                <p>
                    Are you sure you want to delete
                    <strong> {user.name}</strong>?
                </p>

                <p className="warning">
                    This action cannot be undone.
                </p>

                <div className="delete-buttons">

                    <button
                        className="cancel-btn"
                        onClick={onClose}
                    >
                        Cancel
                    </button>

                    <button
                        className="delete-btno"
                        onClick={handleDelete}
                    >
                        Delete
                    </button>

                </div>

            </div>

        </div>

    );

};

export default DeleteUserModal;