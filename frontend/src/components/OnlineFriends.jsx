const OnlineFriends = ({suggestedFriend}) => {
  return (
    <div className="card bg-base-300 rounded-box p-3 gap-3 w-full">
      <span className="pl-3 text-gray-500">Online Friends</span>
      <ul className="menu text-base-content gap-3 p-0 w-full">
        <li>
          <div className="flex items-center gap-2">
            <div className="relative">
              <img
                src={suggestedFriend}
                className="w-8 h-8 object-cover rounded-full"
              />
              <span className="top-0 left-5.5 absolute  w-3.5 h-3.5 bg-green-400 
              border-2 border-white dark:border-gray-800 rounded-full"></span>
            </div>
            Johannah Doe
          </div>
        </li>
      </ul>
    </div>
  );
};

export default OnlineFriends;
