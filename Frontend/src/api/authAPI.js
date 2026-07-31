import axiosInstance from "./axios";


export const registerUser = (userData) => {
    return axiosInstance.post("/auth/register", userData);
};

export const verifyOTPAPI = (data) => {
    return axiosInstance.post("/auth/verify-otp", data);
};


export const loginUser = async (credentials) => {
    const response = await axiosInstance.post("/auth/login", credentials);
    return response.data;
};

