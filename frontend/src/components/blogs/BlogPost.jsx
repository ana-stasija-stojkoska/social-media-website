import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getUserById } from "../../services/userService";
import { deletePost, updatePost } from "../../services/postService";
import {
  getLikesByPost,
  createPostLike,
  deletePostLike,
} from "../../services/postLikesService";
import {
  getCommentsByPost,
  getCommentsCountByPost,
} from "../../services/commentService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import Comment from "../comments/Comment";
import PostComment from "../comments/PostComment";
import Likes from "../Likes";

const BlogPost = ({ Post }) => {
  const { userId: currentUserId } = useAuth();
  const queryClient = useQueryClient();

  const [commentsShown, toggleCommentsShown] = useState(false);
  const [loadingLike, setLoadingLike] = useState(false);

  // Get Post Author
  const { data: postAuthor } = useQuery({
    queryKey: ["user", Post.userid],
    queryFn: () => getUserById(Post.userid),
    staleTime: 60 * 1000,
  });

  // Get Post Comments Count
  const { data: commentsCountData } = useQuery({
    queryKey: ["commentsCount", Post.postid],
    queryFn: () => getCommentsCountByPost(Post.postid),
    staleTime: 60 * 1000,
  });

  // Get Post Comments
  const {
    data: comments = [],
    isLoading: commentsLoading,
    isError: commentsError,
    refetch: refetchComments,
  } = useQuery({
    queryKey: ["comments", Post.postid],
    queryFn: () => getCommentsByPost(Post.postid),
    enabled: commentsShown,
  });

  const deleteMutation = useMutation({
    mutationFn: () => deletePost(Post.postid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const editMutation = useMutation({
    mutationFn: ({ postId, updatedData }) => updatePost(postId, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  // Get Post Likes
  const { data: postLikes = [], isLoading: likesLoading } = useQuery({
    queryKey: ["postLikes", Post.postid],
    queryFn: () => getLikesByPost(Post.postid),
    staleTime: 60 * 1000,
  });

  const numLikes = postLikes.length;
  const liked = postLikes.some((like) => like.userid === currentUserId);

  // Like/Unlike
  const handleLiked = async () => {
    if (loadingLike) return;
    setLoadingLike(true);

    try {
      if (liked) {
        await deletePostLike(Post.postid);
      } else {
        await createPostLike(Post.postid);
      }
      await queryClient.invalidateQueries({
        queryKey: ["postLikes", Post.postid],
      });
    } catch (err) {
      console.error("Error toggling like", err);
    } finally {
      setLoadingLike(false);
    }
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      deleteMutation.mutate();
    }
  };

  const handleEdit = async () => {
    const newDescr = window.prompt("Edit your post:", Post.descr);
    if (newDescr?.trim()) {
      await editMutation.mutateAsync({
        postId: Post.postid,
        updatedData: { descr: newDescr.trim(), image: Post.image },
      });
    }
  };

  const handleCommentsToggled = () => {
    toggleCommentsShown((prev) => !prev);
  };

  return (
    <div className="flex flex-col overflow-hidden">
      {/* Poster Info */}
      <div className="flex flex-row items-center">
        <img
          src={postAuthor?.profilepicture}
          className="w-8 h-8 object-cover rounded-full mr-2"
        />
        <span className="text-gray-500">
          {Post?.timecreated &&
            new Date(Post.timecreated).toLocaleString("en-US", {
              timeZone: "Europe/Skopje",
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "2-digit",
            })}
        </span>
      </div>

      {/* Content */}
      <div className="mt-3">{Post?.descr}</div>
      {Post?.image && Post.image.trim() && (
        <div>
          <img className="w-full mt-3" src={Post.image} />
        </div>
      )}

      {/* Reactions */}
      <div className="flex gap-1 mt-4">
        <Likes
          liked={liked}
          handleLiked={handleLiked}
          numLikes={numLikes}
          loading={loadingLike || likesLoading}
        />

        <button
          className="btn btn-ghost flex items-center p-2"
          onClick={handleCommentsToggled}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          {commentsCountData?.count ?? 0} Comments
        </button>

        {currentUserId === Post.userid && (
          <div className="ml-auto flex gap-1">
            <button onClick={handleEdit} className="btn btn-primary">
              Edit
            </button>
            <button onClick={handleDelete} className="btn btn-error">
              Delete
            </button>
          </div>
        )}
      </div>

      {/* Comments */}
      {commentsShown && (
        <div className="flex flex-col gap-7 bg-base-200 mt-3 p-5">
          <PostComment
            postId={Post.postid}
            onCommentPosted={() => {
              refetchComments();
              queryClient.invalidateQueries({
                queryKey: ["commentsCount", Post.postid],
              });
            }}
          />
          {commentsLoading && (
            <span className="text-sm">Loading comments...</span>
          )}
          {commentsError && (
            <span className="text-red-500">Failed to load comments.</span>
          )}
          {comments.map((comment) => (
            <Comment key={comment.commentid} comment={comment} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogPost;
