import { useEffect, useState } from "react";
import { getSuggestedUsers, followUser } from "../../services/followService";
import OnlineFriends from "../OnlineFriends";

import suggestedFriend from "../../assets/woman.jpg";

const RightBar = () => {
  const [suggestedUsers, setSuggestedUsers] = useState([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const suggestions = await getSuggestedUsers();
        setSuggestedUsers(suggestions);
      } catch (err) {
        console.error("Failed to fetch suggested users:", err);
      }
    };

    fetchSuggestions();
  }, []);

  const handleFollow = async (followeduserid) => {
    try {
      await followUser(followeduserid);
      setSuggestedUsers((prev) =>
        prev.filter((user) => user.userid !== followeduserid)
      );
    } catch (err) {
      console.error("Error following user:", err);
    }
  };

  const handleDismiss = (userid) => {
    setSuggestedUsers((prev) =>
      prev.filter((user) => user.userid !== userid)
    );
  };

  return (
    <aside className="hidden lg:flex flex-col bg-base-200 h-[calc(100vh-64px)] mt-16 p-4 overflow-auto w-full">
      <div className="flex w-full flex-col gap-4 pt-4">

        {/* Suggestions for You */}
        <div className="card bg-base-300 rounded-box p-3 gap-3">
          <span className="pl-3 text-gray-500">Suggestions for You</span>
          <ul className="menu text-base-content w-full gap-3 p-0">
            {suggestedUsers.length > 0 ? (
              suggestedUsers.map((user) => (
                <li key={user.userid}>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <img
                        src={user.profilepicture || suggestedFriend}
                        alt={user.name}
                        className="w-8 h-8 object-cover rounded-full"
                      />
                      {user.name}
                    </div>
                    <div className="flex gap-1">
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => handleFollow(user.userid)}
                      >
                        Follow
                      </button>
                      <button
                        className="btn btn-error btn-sm"
                        onClick={() => handleDismiss(user.userid)}
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <span className="text-center text-gray-500">No suggestions</span>
            )}
          </ul>
        </div>

        {/* Latest Activities */}
        <div className="card bg-base-300 rounded-box p-3 gap-3">
          <span className="pl-3 text-gray-500">Latest Activities</span>
          <ul className="menu text-base-content w-full gap-3 p-0">
            <li>
              <div className="grid grid-cols-[1fr_auto] items-center">
                <div className="flex items-center gap-2 w-full">
                  <img
                    src={suggestedFriend}
                    className="w-8 h-8 object-cover rounded-full"
                  />
                  <span>
                    <strong>Johannah Doe</strong>{" "}
                    <span className="text-gray-500">liked a post</span>
                  </span>
                </div>
                <div className="text-sm text-gray-500 w-28 text-right">
                  10 min ago
                </div>
              </div>
            </li>
            <li>
              <div className="grid grid-cols-[1fr_auto] items-center">
                <div className="flex items-center gap-2 w-full">
                  <img
                    src={suggestedFriend}
                    className="w-8 h-8 object-cover rounded-full"
                  />
                  <span>
                    <strong>Johannah Smithonson</strong>{" "}
                    <span className="text-gray-500">created a blog post</span>
                  </span>
                </div>
                <div className="text-sm text-gray-500 w-28 text-right">
                  12 months ago
                </div>
              </div>
            </li>
          </ul>
        </div>

        {/* Online Friends */}
        <OnlineFriends suggestedFriend={suggestedFriend}/>
      </div>
    </aside>
  );
};

export default RightBar;
