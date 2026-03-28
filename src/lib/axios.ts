import axios from "axios";

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
