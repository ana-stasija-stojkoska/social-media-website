import axios from "../axios";

export const getCommentLikesByComment = async (commentId) => {
  const res = await axios.get(`/commentlikes/comment/${commentId}`);
  return res.data;
};

export const createCommentLike = async (commentId) => {
  const res = await axios.post("/commentlikes", { commentid: commentId });
  return res.data;
};

export const deleteCommentLike = async (commentId) => {
  const res = await axios.delete(`/commentlikes/${commentId}`);
  return res.data;
};