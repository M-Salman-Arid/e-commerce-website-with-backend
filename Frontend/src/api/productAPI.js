
import axiosInstance from "./axios";


// categories page APIs

export const getCategories = async () => {
    const response = await axiosInstance.get("/categories");
    return response.data;
};

export const addCategories = async (categoryName) => {
    const response = await axiosInstance.post("/categories/add", { category: categoryName })
    return response.data
}

export const editCategoryAPI = async (categoryId, updatedCategory) => {
    const response = await axiosInstance.put(`/categories/edit/${categoryId}`, updatedCategory);
    return response.data;
}

export const deleteCategoryAPI = async (categoryId) => {
    const response = await axiosInstance.delete(`/categories/delete/${categoryId}`);
    return response.data;
}


// product page APIs

export const getProducts = async () => {
    const response = await axiosInstance.get("/products");
    return response.data;
}

export const getProductById = async (id) => {
    const response = await axiosInstance.get(`/products/${id}`);
    return response.data;
}

export const addProduct = async (product) => {
    const response = await axiosInstance.post("/products/add", product);
    return response.data;
}

export const updateProduct = async (id, product) => {
    const response = await axiosInstance.put(`/products/edit/${id}`, product);
    return response.data;
}

export const deleteProduct = async (id) => {
    const response = await axiosInstance.delete(`/products/delete/${id}`);
    return response.data;
}

