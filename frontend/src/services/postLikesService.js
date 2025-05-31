import axios from "../axios";

export const getLikesByPost = async (postId) => {
  const response = await axios.get(`/postlikes/post/${postId}`);
  return response.data;
};

export const createPostLike = async (postId) => {
  const response = await axios.post(`/postlikes`, { postid: postId });
  return response.data;
};

export const deletePostLike = async (postId) => {
  const response = await axios.delete(`/postlikes/post/${postId}`);
  return response.data;
};