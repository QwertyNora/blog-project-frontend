import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

// Fetch all posts with pagination
export const fetchPosts = async (page, limit = 3) => {
  try {
    const response = await api.get(`/api/posts?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fetch a single post by ID
export const fetchPostById = async (postId) => {
  try {
    const response = await api.get(`/api/posts/${postId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Create a new post
export const createPost = async (postData) => {
  const token = localStorage.getItem("token"); // Get token from local storage
  try {
    const response = await api.post("/api/posts", postData, {
      headers: {
        Authorization: `Bearer ${token}`, // Ensure the request is authorized
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
