import { useAuth } from "../../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { getPostsByUser } from "../../services/postService";
import { useParams } from "react-router-dom";
import { getUserById } from "../../services/userService";

import BlogPost from "../../components/blogs/BlogPost";
import UploadBlogPost from "../../components/blogs/UploadBlogPost";

const Profile = () => {
  const { userId } = useAuth();
  const { id } = useParams();
  const profileUserId = parseInt(id, 10);

  const {
    data: profileUser,
    isLoading: isUserLoading,
    error: userError,
  } = useQuery({
    queryKey: ["user", profileUserId],
    queryFn: () => getUserById(profileUserId),
    enabled: !!profileUserId,
  });

  const {
    isLoading: isPostsLoading,
    error: postsError,
    data: posts = [],
  } = useQuery({
    queryKey: ["posts", profileUserId],
    queryFn: () => getPostsByUser(profileUserId),
    enabled: !!profileUserId,
  });

  const isCurrentUser = userId === profileUserId;

  if (isUserLoading || isPostsLoading) return <p>Loading...</p>;
  if (userError || postsError) return <p>Something went wrong!</p>;

  return (
    <>
      <div className="bg-base-100 rounded px-5 py-7 mb-6 mt-4 overflow-hidden">
        <div className="flex flex-col items-center">
          <img
            className="w-46 h-46 mb-3 rounded-full object-cover shadow-md"
            src={profileUser?.profilepicture}
            alt="Profile picture"
          />
          <h5 className="mb-1 text-xl font-medium">{profileUser?.name}</h5>
          <span className="text-sm text-gray-500">{profileUser?.city}</span>

          <div className="flex md:mt-6 gap-3">
            {isCurrentUser ? (
              <button className="btn btn-primary">Edit</button>
            ) : (
              <>
                <button className="btn btn-primary">Add friend</button>
                <button className="btn btn-secondary">Message</button>
              </>
            )}
          </div>
        </div>
      </div>

      {isCurrentUser && (
        <div className="bg-base-100 rounded p-5 mb-4">
          <UploadBlogPost />
        </div>
      )}

      {postsError
        ? "Something went wrong!"
        : isPostsLoading
        ? "loading"
        : posts.map((post) => (
            <div
              key={post.postid}
              className="bg-base-100 rounded p-5 mb-4 overflow-hidden"
            >
              <BlogPost Post={post} />
            </div>
          ))}
    </>
  );
};

export default Profile;