import axiosInstance from "./axios";


// profile page APIs
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

// User page API 

export const getAllUserAPI = async() => {
    const response = await axiosInstance.get("/users");
    return response.data
}

export const updateUserAPI = async (userId, userData) => {
    const response = await axiosInstance.put(`/users/update/${userId}`, userData);
    return response.data;
}

export const deleteUserAPI = async (userId) => {
    const response = await axiosInstance.delete(`/users/delete/${userId}`);
    return response.data;
};  