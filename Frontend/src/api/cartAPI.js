import axiosInstance from "./axios";

export const addToCartAPI = (productId, quantity) => {
    return axiosInstance.post("/cart/add", { productId, quantity });
}

export const getCartItemsAPI = () => {
    return axiosInstance.get("/cart");
}

export const updateCartItemAPI = (productId, quantity) => {
    return axiosInstance.put("/cart/update", { productId, quantity });
}

export const removeCartItemAPI = (productId) => {
    return axiosInstance.delete(`/cart/remove/${productId}`);
}

export const clearCartAPI = () => {
    return axiosInstance.delete("/cart/clear");
}

export const getCartTotalAPI = () => {
    return axiosInstance.get("/cart/total");
}