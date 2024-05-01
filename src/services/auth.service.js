import axios from "axios";

export const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL, // Server URL
});

export const registerUser = async (userData) => {
  try {
    const response = await api.post("api/auth/register", userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await api.post("api/auth/login", userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
