import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getPostsByUser } from "../../services/postService";
import { getUserById } from "../../services/userService";
import {
  getFollowers,
  followUser,
  unfollowUser,
} from "../../services/followService";

import BlogPost from "../../components/blogs/BlogPost";
import UploadBlogPost from "../../components/blogs/UploadBlogPost";
import EditUserForm from "../../components/users/EditUserForm";

const Profile = () => {
  const { userId } = useAuth();
  const { id } = useParams();
  const profileUserId = parseInt(id, 10);

  const queryClient = useQueryClient();

  const [isEditing, setIsEditing] = useState(false);

  const {
    data: profileUser,
    isLoading: isUserLoading,
    error: userError,
  } = useQuery({
    queryKey: ["user", profileUserId],
    queryFn: () => getUserById(profileUserId),
    enabled: !!profileUserId,
  });

  const isCurrentUser = userId === profileUserId;

  const { data: followers = [], isLoading: followersLoading } = useQuery({
    queryKey: ["followers", profileUserId],
    queryFn: () => getFollowers(profileUserId),
    enabled: !isCurrentUser,
  });
  const isFollowing = followers.some((f) => f.followeruserid === userId);

  const {
    isLoading: isPostsLoading,
    error: postsError,
    data: posts = [],
  } = useQuery({
    queryKey: ["posts", profileUserId],
    queryFn: () => getPostsByUser(profileUserId),
    enabled: !!profileUserId,
  });

  const followMutation = useMutation({
    mutationFn: () => followUser(profileUserId),
    onSuccess: () => {
      queryClient.invalidateQueries(["followers", profileUserId]);
    },
  });

  const unfollowMutation = useMutation({
    mutationFn: () => unfollowUser(profileUserId),
    onSuccess: () => {
      queryClient.invalidateQueries(["followers", profileUserId]);
    },
  });

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
              <button
                className="btn btn-primary"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
            ) : (
              <>
                {!followersLoading &&
                  (isFollowing ? (
                    <button
                      className="btn btn-outline"
                      onClick={() => unfollowMutation.mutate()}
                    >
                      Unfollow
                    </button>
                  ) : (
                    <button
                      className="btn btn-primary"
                      onClick={() => followMutation.mutate()}
                    >
                      Follow
                    </button>
                  ))}

                <button className="btn btn-secondary">Message</button>
              </>
            )}
          </div>
        </div>
      </div>

      {isEditing && (
        <EditUserForm
          initialData={profileUser}
          onClose={() => setIsEditing(false)}
        />
      )}

      {isCurrentUser && (
        <div className="bg-base-100 rounded p-5 mb-4">
          <UploadBlogPost />
        </div>
      )}

      {posts.map((post) => (
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
