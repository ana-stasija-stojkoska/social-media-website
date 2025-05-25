import NavbarDropdownButton from "../navbar/NavbarDropdownButton";

import userIcon from "../../assets/user.png";
import friendIcon from "../../assets/small-talk.png";
import marketplaceIcon from "../../assets/buy.png";
import groupsIcon from "../../assets/group.png";
import suggestedFriend from "../../assets/woman.jpg";
import OnlineFriends from "../OnlineFriends";

const LeftBar = () => {
  return (
    <aside className="hidden md:flex flex-col bg-base-200 h-[calc(100vh-64px)] mt-16 p-4 overflow-auto w-full">
      <ul className="menu text-base-content w-full gap-3 p-0 pt-4">
        <li>
          <NavbarDropdownButton text="Jane Doe" to="/profile/:id">
            <img src={userIcon} className="w-6 h-6" />
          </NavbarDropdownButton>
        </li>
        <li>
          <NavbarDropdownButton text="Friends">
            <img src={friendIcon} className="w-6 h-6" />
          </NavbarDropdownButton>
        </li>
        <li>
          <NavbarDropdownButton text="Groups">
            <img src={marketplaceIcon} className="w-6 h-6" />
          </NavbarDropdownButton>
        </li>
        <li>
          <NavbarDropdownButton text="Marketplace">
            <img src={groupsIcon} className="w-6 h-6" />
          </NavbarDropdownButton>
        </li>
      </ul>

      {/* Online Friends */}
      <div className="sm:hidden lg:hidden md:flex mt-7">
        <OnlineFriends suggestedFriend={suggestedFriend} />
      </div>
    </aside>
  );
};

export default LeftBar;
