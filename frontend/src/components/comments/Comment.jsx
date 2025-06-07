import {
  getCommentLikesByComment,
  createCommentLike,
  deleteCommentLike,
} from "../../services/commentLikesService";
import { useAuth } from "../../context/AuthContext";
import { getUserById } from "../../services/userService";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Likes from "../Likes";

const Comment = ({ comment }) => {
  const { userId } = useAuth();
  const queryClient = useQueryClient();

  // Get Comment Author
  const {
    data: author,
    isLoading: authorLoading,
    isError: authorError,
  } = useQuery({
    queryKey: ["user", comment.userid],
    queryFn: () => getUserById(comment.userid),
    staleTime: 60 * 1000,
  });

  // Get Comment Likes
  const {
    data: commentLikes = [],
    isLoading: likesLoading,
  } = useQuery({
    queryKey: ["commentLikes", comment.commentid],
    queryFn: () => getCommentLikesByComment(comment.commentid),
    staleTime: 60 * 1000,
  });

  const numLikes = commentLikes.length;
  const liked = commentLikes.some((like) => like.userid === userId);

  const likeMutation = useMutation({
    mutationFn: () => createCommentLike(comment.commentid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["commentLikes", comment.commentid] });
    },
  });

  const unlikeMutation = useMutation({
    mutationFn: () => deleteCommentLike(comment.commentid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["commentLikes", comment.commentid] });
    },
  });

  const loadingLike = likeMutation.isLoading || unlikeMutation.isLoading || likesLoading;

  const handleLiked = () => {
    if (loadingLike) return;
    if (liked) {
      unlikeMutation.mutate();
    } else {
      likeMutation.mutate();
    }
  };

  return (
    <div className="flex flex-col overflow-hidden">
      {/* Comment Header */}
      <div className="flex flex-row mb-2">
        <img
          src={author?.profilepicture}
          className="w-8 h-8 object-cover rounded-full mr-2"
          alt={author?.name || "User"}
        />
        <span className="font-semibold mr-2">
          {author?.name || "Unknown User"}
        </span>
        <span className="text-gray-500">
          {new Date(comment.timecreated).toLocaleString("en-US", {
            timeZone: "Europe/Skopje",
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
          })}
        </span>
      </div>

      {/* Comment Text */}
      <div className="mb-2">{comment.descr}</div>

      {/* Like Button */}
      <div>
        <Likes
          liked={liked}
          handleLiked={handleLiked}
          numLikes={numLikes}
          loading={loadingLike}
        />
      </div>
    </div>
  );
};

export default Comment;