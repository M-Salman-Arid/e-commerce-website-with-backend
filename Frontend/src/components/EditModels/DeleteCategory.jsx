import "./DeleteCatagory.css";
import { deleteCategoryAPI } from "../../api/productAPI";

const DeleteCategoryModal = ({ category, onClose, onCategoryDeleted }) => {

    const handleDelete = async () => {

        if (!category) return;

        try {

  
            const response = await deleteCategoryAPI(category.id);
            if (!response.success) return;

            if (onCategoryDeleted) {
                onCategoryDeleted(category.id);
            }

            alert("category deleted!.")
            onClose();

        } catch (error) {

            console.log(error);

        }

    };

    if (!category) return null;

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