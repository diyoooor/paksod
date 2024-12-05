import axios, { AxiosInstance } from "axios";
import Swal from "sweetalert2";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("id_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(new Error(error));
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized! Redirecting to login.");
      // Swal.fire('Unauthenticated !', 'กรุณาเข้าสู่ระบบก่อนใช้งาน', 'error').then(() => {
      //   window.location.href = '/auth'
      // })
    } else if (error.response?.status === 500) {
      console.error("Server error! Please try again later.");
    } else {
      console.error("Response Error:", error.response || error.message);
    }
    return Promise.reject(new Error(error));
  }
);

export default axiosInstance;
