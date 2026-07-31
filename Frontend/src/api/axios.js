import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

// Request Interceptor
axiosInstance.interceptors.request.use(

    (config) => {

        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        if (config.data instanceof FormData) {
            delete config.headers["Content-Type"];
        } else {
            config.headers["Content-Type"] = "application/json";
        }

        return config;
    },

    (error) => Promise.reject(error)

);

// Response Interceptor
axiosInstance.interceptors.response.use(

    (response) => response,

    (error) => {

        if (error.response?.status === 401) {

            alert("Your session has expired. Please login again.");

            localStorage.removeItem("token");
            localStorage.removeItem("user");

            window.location.href = "/login";
        }

        return Promise.reject(error);

    }

);

export default axiosInstance;