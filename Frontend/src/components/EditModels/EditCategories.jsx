import { useState, useEffect } from "react";
import "./EditCategories.css";
import { editCategoryAPI } from "../../api/productAPI";
import { toast } from "react-toastify";

const EditCategoryModal = ({ isOpen, onClose, category, onUpdate }) => {

    const [categoryName, setCategoryName] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {

        if (category) {
            setCategoryName(category.name || "");
            setDescription(category.description || "");
        }

    }, [category]);

    const handleSave = async (e) => {

        e.preventDefault();

        try {

            await editCategoryAPI(category.id, {
                name: categoryName.trim(),
                description: description.trim()
            });
            onUpdate();
            toast.success("Catagory Updated Sucessfully.")
            onClose();

        } catch (error) {

            console.log(error);
            toast.error("Error Updating Catagory.")

        }

    };

    if (!isOpen || !category) {
        return null;
    }

    return (

        <div className="modal-overlay">

            <div className="modal">

                <h2>Edit Category</h2>

                <form onSubmit={handleSave}>

                    <div className="form-group">

                        <label>Category Name</label>

                        <input
                            type="text"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                        />

                    </div>

                    <div className="form-group">

                        <label>Description</label>

                        <textarea
                            rows="4"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter category description"
                        />

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

export default EditCategoryModal;