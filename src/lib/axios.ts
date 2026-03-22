import axios from "axios";

export const AuthInstance = axios.create({
  baseURL: "http://localhost:8000/api", // your PHP backend URL
  headers: {
    "Content-Type": "application/json",
  },
});
