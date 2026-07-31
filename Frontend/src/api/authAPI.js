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

export const getProfileAPI = async () => {
    const response = await axiosInstance.get("/profile");
    return response.data;
};

export const updateProfileAPI = async (profileData) => {
    const response = await axiosInstance.put("/profile", profileData);
    return response.data;
}

export const changePasswordAPI = async (data) => {
    const response = await axiosInstance.put("/profile/change-password",data);
    return response.data;

};