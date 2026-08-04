
import axiosInstance  from "./axios";


export const createOrder = async (orderData) => {
    try {
        const response = await axiosInstance.post("/orders/create", orderData);
        return response.data;
    } catch (error) {
        console.error("Error during checkout:", error);
        throw error;
    }
};

export const getOrders = async () => {
    try {
        const response = await axiosInstance.get("/orders");
        return response.data;
    } catch (error) {
        console.error("Error fetching orders:", error);
        throw error;
    }
};

