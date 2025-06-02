import axios from "../axios";

export const getCommentsByPost = async (postId) => {
  const res = await axios.get(`/comments/post/${postId}`);
  return res.data;
};

export const getCommentsCountByPost = async (postId) => {
  const res = await axios.get(`/comments/count/${postId}`);
  return res.data;
};

export const createComment = async ({ postid, descr }) => {
  const res = await axios.post("/comments", { postid, descr });
  return res.data;
};

export const updateComment = async (commentid, descr) => {
  const res = await axios.put(`/comments/${commentid}`, { descr });
  return res.data;
};

export const deleteComment = async (commentid) => {
  const res = await axios.delete(`/comments/${commentid}`);
  return res.data;
};