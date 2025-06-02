import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment } from "../../services/commentService";

const PostComment = ({ postId, onCommentPosted }) => {
  const [commentText, setCommentText] = useState("");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newDescr) =>
      createComment({ postid: postId, descr: newDescr }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
      queryClient.invalidateQueries({ queryKey: ["commentsCount", postId] });
      setCommentText("");
      if (onCommentPosted) {
        onCommentPosted();
      }
    },
    onError: () => {
      alert("Failed to post comment.");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    mutation.mutate(commentText.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-start">
      <textarea
        className="textarea w-full"
        placeholder="Write a comment..."
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />
      <button
        type="submit"
        className="btn btn-primary"
        disabled={mutation.isLoading}
      >
        Post
      </button>
    </form>
  );
};

export default PostComment;
