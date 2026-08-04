import axiosInstance from "./axios";

export const addToCartAPI = (productId, quantity = 1) => {
    return axiosInstance.post("/cart/add", {
        product_id: productId,
        quantity,
    });
}

export const getCartCountAPI = () => {
    return axiosInstance.get("/cart/count");
}

export const getCartItemsAPI = () => {
    return axiosInstance.get("/cart");
}

export const updateCartItemAPI = (productId, quantity) => {
    return axiosInstance.put(`/cart/update/${productId}`, { quantity });
}

export const removeCartItemAPI = (productId) => {
    return axiosInstance.delete(`/cart/remove/${productId}`);
}

export const clearCartAPI = () => {
    return axiosInstance.delete("/cart/clear");
}
