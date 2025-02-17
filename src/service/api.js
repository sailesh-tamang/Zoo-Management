import axios from "axios";

const instanced = axios.create({
  baseURL: "http://localhost:5001/api", // Ensure this matches your backend URL
});

// Add request interceptor to include token
instanced.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    console.log("🛠️ Attaching token to request:", token); // Debugging log
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error(" Request error:", error);
    return Promise.reject(error);
  }
);

export default instanced;