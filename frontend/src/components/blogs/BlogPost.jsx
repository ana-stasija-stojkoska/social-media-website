import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { getUserById } from "../../services/userService";
import {
  getLikesByPost,
  createPostLike,
  deletePostLike,
} from "../../services/postLikesService";

import Comment from "../comments/Comment";
import Likes from "../Likes";

const BlogPost = ({ Post }) => {
  const { userId: currentUserId } = useAuth();
  const [postAuthor, setPostAuthor] = useState(null);

  const [numLikes, setNumLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [commentsShown, toggleCommentsShown] = useState(false);
  const [loadingLike, setLoadingLike] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function fetchPostAuthor() {
      try {
        const userData = await getUserById(Post.userid);
        if (isMounted) setPostAuthor(userData);
      } catch (err) {
        if (isMounted) setPostAuthor(null);
      }
    }
    fetchPostAuthor();
    return () => {
      isMounted = false;
    };
  }, [Post.userid]);

  useEffect(() => {
    let isMounted = true;
    async function fetchLikes() {
      try {
        const likes = await getLikesByPost(Post.postid);
        if (!isMounted) return;

        setNumLikes(likes.length);
        setLiked(likes.some((like) => like.userid === currentUserId));
      } catch {
        if (isMounted) {
          setNumLikes(0);
          setLiked(false);
        }
      }
    }
    fetchLikes();

    return () => {
      isMounted = false;
    };
  }, [Post.postid, currentUserId]);

  const handleLiked = async () => {
    if (loadingLike) return;
    setLoadingLike(true);

    try {
      if (liked) {
        await deletePostLike(Post.postid);
        setNumLikes((prev) => prev - 1);
        setLiked(false);
      } else {
        await createPostLike(Post.postid);
        setNumLikes((prev) => prev + 1);
        setLiked(true);
      }
    } catch (err) {
      console.error("Error toggling like", err);
    } finally {
      setLoadingLike(false);
    }
  };

  const handleCommentsToggled = () => {
    toggleCommentsShown((prev) => !prev);
  };

  return (
    <div className="flex flex-col overflow-hidden">
      {/* Poster Avatar and Time */}
      <div className="flex flex-row items-center">
        <img
          src={postAuthor?.profilepicture}
          className="w-8 h-8 object-cover rounded-full mr-2"
        />
        <span className="text-gray-500">{Post?.timecreated}</span>
      </div>

      {/* Post Content */}
      <div className="mt-3">{Post?.descr}</div>
      {Post?.image && Post.image.trim() !== "" && (
        <div>
          <img className="w-full mt-3" src={Post.image} />
        </div>
      )}

      {/* Post Reactions */}
      <div className="flex gap-1 mt-4">
        {/* Likes */}
        <Likes liked={liked} handleLiked={handleLiked} numLikes={numLikes} loading={loadingLike} />

        {/* Comments */}
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
          5 Comments
        </button>

        {/* Share */}
        <button className="btn btn-ghost flex items-center p-2">
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
            <circle cx="18" cy="5" r="3"></circle>
            <circle cx="6" cy="12" r="3"></circle>
            <circle cx="18" cy="19" r="3"></circle>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
          </svg>
          Share
        </button>
      </div>

      {/* Comment Section */}
      {commentsShown && (
        <div className="flex flex-col gap-4 bg-base-200 mt-3 p-5">
          <Comment />
          <div className="divider m-0"></div>
          <Comment />
        </div>
      )}
    </div>
  );
};

export default BlogPost;
