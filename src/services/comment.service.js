import axios from "axios";

// Create an axios instance with a base URL
const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL, // Ensure this matches your environment configuration
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

// Function to create a new comment for a post
export const createComment = async (postId, commentData) => {
  try {
    const response = await api.post(
      `/api/posts/${postId}/comments`,
      commentData
    );
    return response.data;
  } catch (error) {
    throw error; // It's often more useful to throw the whole error to capture stack traces.
  }
};

// Function to fetch all comments for a specific post
export const fetchCommentsByPost = async (postId) => {
  try {
    const response = await api.get(`/api/posts/${postId}/comments`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
