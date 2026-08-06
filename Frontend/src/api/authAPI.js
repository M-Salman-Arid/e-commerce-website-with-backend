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

export const forgotPasswordAPI = (email) => {
    return axiosInstance.post("/auth/forgot-password", { email });
}

export const verifyPasswordResetOTP = (email, otp) => {
    return axiosInstance.post("/auth/verify-password-reset-otp", { email, otp });
}

export const resetPasswordAPI = (email, newPassword) => {
    return axiosInstance.post("/auth/reset-password", {
        email,
        newPassword,
    });
}



