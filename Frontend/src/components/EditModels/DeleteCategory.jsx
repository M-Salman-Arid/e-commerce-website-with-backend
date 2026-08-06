import "./DeleteCatagory.css";
import { deleteCategoryAPI } from "../../api/productAPI";
import { toast } from "react-toastify";

const DeleteCategoryModal = ({ isOpen, onClose, category, onDelete }) => {

    const handleDelete = async () => {

        try {
            await deleteCategoryAPI(category.id);
            onDelete();
            toast.success("Category Delected Sucessfuly.");
            onClose();

        } catch (error) {

            console.log(error);
            toast.error("Error deleting Category!")

        }

    };

    if(!isOpen || !category) {
        return null
    }

    return (

        <div className="modal-overlay">

            <div className="delete-modal">

                <h2>Delete Category</h2>

                <p>
                    Are you sure you want to delete
                    <strong> "{category.name}" </strong>?
                </p>

                <p className="warning-text">
                    This action cannot be undone.
                </p>

                <div className="modal-buttons">

                    <button
                        type="button"
                        className="cancel-btn"
                        onClick={onClose}
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
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

export default DeleteCategoryModal;