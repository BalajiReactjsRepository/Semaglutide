import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 30000,
});

api.interceptors.request.use((config) => {
  const tokenKey = process.env.REACT_APP_SECRET_TOKEN || "token";

  const token = Cookies.get(tokenKey);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error);
    const status = error?.response?.status;

    if (status === 500) {
      console.error("Server crashed:", error.response?.data);
    }

    return Promise.reject(error);
  },
);

export default api;
