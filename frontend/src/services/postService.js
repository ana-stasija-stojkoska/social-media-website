import axios from "../axios";

export const getAllPosts = async () => {
  const response = await axios.get("/posts");
  return response.data;
};

export const getPostById = async (postId) => {
  const response = await axios.get(`/posts/${postId}`);
  return response.data;
};

export const getPostsByUser = async (userId) => {
  const response = await axios.get(`/posts/user/${userId}`);
  return response.data;
};

export const createPost = async (postData) => {
  const response = await axios.post("/posts", postData);
  return response.data;
};

export const updatePost = async (postId, updatedPostData) => {
  const response = await axios.put(`/posts/${postId}`, updatedPostData);
  return response.data;
};

export const deletePost = async (postId) => {
  const response = await axios.delete(`/posts/${postId}`);
  return response.data;
};