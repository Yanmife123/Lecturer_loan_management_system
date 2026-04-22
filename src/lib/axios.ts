import axios from "axios";
import Cookies from "js-cookie";

export const AuthInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  headers: {
    // "Content-Type": "application/json",
    "Content-Type": "multipart/form-data",
    Accept: "application/json",
  },
});

AuthInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      return Promise.reject(
        new Error(
          error.response.data?.message ||
            `Request failed with status ${error.response.status}`,
        ),
      );
    }

    return Promise.reject(error);
  },
);

export const LoginInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

LoginInstance.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      const token = response.data?.token;
      if (token) {
        Cookies.set("token", token, { expires: 22 / 24 }); // Expires in 22 hours
      }
      const user = response.data?.user;
      if (user) {
        Cookies.set("user", JSON.stringify(user), { expires: 22 / 24 });
      }
    }
    return response;
  },

  (error) => {
    if (error.response) {
      return Promise.reject(
        new Error(
          error.response.data?.message ||
            `Request failed with status ${error.response.status}`,
        ),
      );
    }

    return Promise.reject(error);
  },
);

export const Instance1 = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const FileInstance1 = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  headers: {
    "Content-Type": "multipart/form-data",
    Accept: "application/json",
  },
});

Instance1.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      return Promise.reject(
        new Error(
          error.response.data?.message ||
            `Request failed with status ${error.response.status}`,
        ),
      );
    }

    return Promise.reject(error);
  },
);

Instance1.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

FileInstance1.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      return Promise.reject(
        new Error(
          error.response.data?.message ||
            `Request failed with status ${error.response.status}`,
        ),
      );
    }

    return Promise.reject(error);
  },
);

FileInstance1.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
