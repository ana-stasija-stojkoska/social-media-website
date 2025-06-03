import { useEffect, useState } from "react";
import { getUserById } from "../../services/userService";
import {
  getCommentLikesByComment,
  createCommentLike,
  deleteCommentLike,
} from "../../services/commentLikesService";
import { useAuth } from "../../context/AuthContext";

import Likes from "../Likes";

const Comment = ({ comment }) => {
  const [author, setAuthor] = useState(null);
  const [numLikes, setNumLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [loadingLike, setLoadingLike] = useState(false);

  const { userId } = useAuth();

  // Get Comment Author and Likes
  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        const [userData, likes] = await Promise.all([
          getUserById(comment.userid),
          getCommentLikesByComment(comment.commentid),
        ]);

        if (!isMounted) return;

        setAuthor(userData);
        setNumLikes(likes.length);
        setLiked(likes.some((like) => like.userid === userId));
      } catch (err) {
        if (isMounted) {
          setAuthor(null);
          setNumLikes(0);
          setLiked(false);
        }
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [comment.userid, comment.commentid, userId]);

  // Toggle Like
  const handleLiked = async () => {
    if (loadingLike) return;
    setLoadingLike(true);

    try {
      if (liked) {
        await deleteCommentLike(comment.commentid);
        setNumLikes((prev) => prev - 1);
        setLiked(false);
      } else {
        await createCommentLike(comment.commentid);
        setNumLikes((prev) => prev + 1);
        setLiked(true);
      }
    } catch (err) {
      console.error("Error toggling comment like:", err);
    } finally {
      setLoadingLike(false);
    }
  };

  return (
    <div className="flex flex-col overflow-hidden">
      {/* Comment Header */}
      <div className="flex flex-row mb-2">
        <img
          src={author?.profilepicture}
          className="w-8 h-8 object-cover rounded-full mr-2"
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
