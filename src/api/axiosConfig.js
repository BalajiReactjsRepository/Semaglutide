import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = Cookies.get(process.env.REACT_APP_SECRET_TOKEN);
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
    if (error.response?.status === 401) {
      Cookies.remove(process.env.REACT_APP_SECRET_TOKEN);

      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);

export default api;
