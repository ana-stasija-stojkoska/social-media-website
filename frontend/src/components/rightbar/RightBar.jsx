import OnlineFriends from "../OnlineFriends";
import suggestedFriend from "../../assets/woman.jpg";

const RightBar = () => {
  return (
    <aside className="hidden lg:flex flex-col bg-base-200 h-[calc(100vh-64px)] mt-16 p-4 overflow-auto w-full">
      <div className="flex w-full flex-col gap-4 pt-4">
        {/* Suggestions for You */}
        <div className="card bg-base-300 rounded-box p-3 gap-3">
          <span className="pl-3 text-gray-500">Suggestions for You</span>
          <ul className="menu text-base-content w-full gap-3 p-0">
            <li>
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <img
                    src={suggestedFriend}
                    className="w-8 h-8 object-cover rounded-full"
                  />
                  Joann Doe
                </div>
                <div className="flex gap-1">
                  <button className="btn btn-primary btn-sm">Follow</button>
                  <button className="btn btn-error btn-sm">Dismiss</button>
                </div>
              </div>
            </li>
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
        <OnlineFriends suggestedFriend={suggestedFriend} />
      </div>
    </aside>
  );
};

export default RightBar;
