import axios from "axios";

// Create an axios instance with a base URL
const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

// Use an axios interceptor to automatically attach the Authorization header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Retrieve the token from local storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Set the Authorization header if the token exists
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Function to fetch all posts with pagination
export const fetchPosts = async (page, limit = 3) => {
  try {
    const response = await api.get(`/api/posts?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to fetch a single post by ID
export const fetchPostById = async (postId) => {
  try {
    const response = await api.get(`/api/posts/${postId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to create a new post
export const createPost = async (postData) => {
  try {
    const response = await api.post("/api/posts", postData);
    return response.data;
  } catch (error) {
    throw error.message;
  }
};
