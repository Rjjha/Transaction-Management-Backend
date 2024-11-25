import axios from "axios";

// Create an Axios instance
const api = axios.create({
  // baseURL: "http://localhost:3030/api/v1/", // Backend server base URL
  baseURL: "https://transaction-management-backend-wn2e.onrender.com/api/v1/",
  timeout: 10000, // Optional: Timeout for requests
});

// Optional: Add an interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken"); // Get token from localStorage
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Add token to headers
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
