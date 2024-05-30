import axios from "axios"
import { ACCESS_TOKEN } from "./constants"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        console.log('Request config:', config);
        return config;
    },
    (error) => {
        console.error('Error in request interceptor:', error);
        return Promise.reject(error);
    }
)

api.interceptors.response.use(
    (response) => {
        console.log('Response data:', response.data);
        return response;
    },
    (error) => {
        console.error('Error in response interceptor:', error);
        return Promise.reject(error);
    }
);

export default api;