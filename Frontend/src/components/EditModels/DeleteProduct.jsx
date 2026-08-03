import "./DeleteProduct.css";
import { deleteProductAPI } from "../../api/productAPI";

const DeleteProductModal = ({ isOpen, onClose, product, onDelete }) => {

    if (!isOpen || !product) return null;

    const handleDelete = async () => {
        try {
            await deleteProductAPI(product.id);
            onDelete();
            onClose();
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    return (
        <div className="delete-modal-overlay">

            <div className="delete-modal">

                <div className="delete-icon">
                    🗑️
                </div>

                <h2>Delete Product</h2>

                <p>
                    Are you sure you want to delete
                    <strong> {product.title}</strong>?
                </p>

                <p className="warning">
                    This action cannot be undone.
                </p>

                <div className="delete-modal-actions">

                    <button
                        className="cancel-btn"
                        onClick={onClose}
                    >
                        Cancel
                    </button>

                    <button
                        className="delete-btn"
                        onClick={handleDelete}
                    >
                        Delete
                    </button>

                </div>

            </div>

        </div>
    );
};

export default DeleteProductModal;