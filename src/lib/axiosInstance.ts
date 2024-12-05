import axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});


axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized! Redirecting to login.");
    } else if (error.response?.status === 500) {
      console.error("Server error! Please try again later.");
    } else {
      console.error("Response Error:", error.response || error.message);
    }
    return Promise.reject(new Error(error));
  }
);

export default axiosInstance;
