import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { logout as logoutUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";

// Component Imports
import SearchBar from "./SearchBar";
import NavbarDropdownButton from "./NavbarDropdownButton";
import IconButton from "../IconButton";
import ThemeToggleButton from "../ThemeToggleButton";

// Asset Imports
import userIcon from "../../assets/user.png";
import friendIcon from "../../assets/small-talk.png";
import marketplaceIcon from "../../assets/buy.png";
import groupsIcon from "../../assets/group.png";
import logoutIcon from "../../assets/logout.png";

const NavBar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);

  const handleLogout = async () => {
    try {
      await logoutUser();   // call backend to clear cookie
      logout();             // clear context
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err.message);
    }
  };

  return (
    <>
      <nav className="bg-base-100 col-span-full fixed top-0 left-0 right-0 w-full z-10">
        <div className="flex flex-wrap items-center justify-between px-6 py-4">
          {/* Company name */}
          <a
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-primary">
              socialmedia
            </span>
          </a>

          <div className="hidden md:flex md:order-2 items-center gap-4">
            {/* Search (desktop) */}
            <SearchBar />

            {/* Avatar and Logout Button (desktop) */}
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </div>
          </div>

          {/* Menu Toggle Button (mobile) */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden inline-flex items-center p-2 w-10 h-10 justify-center text-sm
                     rounded-lg hover:bg-gray-100"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Menu and Search (mobile) */}
          <div
            className={`${
              isMenuOpen
                ? "block max-h-[calc(100vh-4rem)] overflow-y-auto"
                : "hidden"
            } w-full md:flex md:w-auto md:order-1`}
          >
            <div
              className="flex flex-col md:flex-row md:space-x-8 md:items-center md:p-0 mt-4 md:mt-0
                       border border-base-300 md:border-0 rounded-lg bg-base-200 md:bg-transparent"
            >
              {/* Search (mobile only) */}
              <SearchBar isMobile />

              {/* Navbar Links */}
              <ul className="flex flex-col md:flex-row gap-2 md:gap-8 font-semibold">
                <li>
                  {/* Home Icon (only desktop) */}
                  <IconButton
                    to="/"
                    label="Home"
                    svgPath={
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d={`M20 9v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9 M9 22V12h6v10M2 10.6L12 2l10 8.6`}
                      />
                    }
                  />
                  {/* Home button (only mobile) */}
                  <NavbarDropdownButton
                    text="Home"
                    to="/"
                    className="md:hidden"
                  />
                </li>

                {/* Theme Switch Button (only desktop) */}
                <li className="hidden md:flex">
                  <ThemeToggleButton theme={theme} toggleTheme={toggleTheme} />
                </li>

                <li>
                  {/* Messages Button (only desktop) */}
                  <IconButton
                    svgPath={
                      <>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                        />
                        <polyline points="22,6 12,13 2,6" />
                      </>
                    }
                    indicator
                  />
                  {/* Messages button (only mobile) */}
                  <NavbarDropdownButton text="Messages" className="md:hidden" />
                </li>

                <li>
                  {/* Notifications Button (only desktop) */}
                  <IconButton
                    svgPath={
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d={`M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2
                          2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6
                          0v1a3 3 0 11-6 0v-1m6 0H9`}
                      />
                    }
                    indicator
                  />
                  {/* Notifications button (only mobile) */}
                  <NavbarDropdownButton
                    text="Notifications"
                    className="md:hidden"
                  />
                </li>
              </ul>

              <div className="divider my-3 mx-4 md:hidden"></div>

              {/* Sidebar Links */}
              <ul className="flex flex-col md:flex-row gap-2 md:gap-20 font-semibold md:hidden pb-3">
                <NavbarDropdownButton text="Jane Doe" to="/profile/:2">
                  <img src={userIcon} className="w-6 h-6" />
                </NavbarDropdownButton>
                <NavbarDropdownButton text="Friends">
                  <img src={friendIcon} className="w-6 h-6" />
                </NavbarDropdownButton>
                <NavbarDropdownButton text="Groups">
                  <img src={groupsIcon} className="w-6 h-6" />
                </NavbarDropdownButton>
                <NavbarDropdownButton text="Marketplace">
                  <img src={marketplaceIcon} className="w-6 h-6" />
                </NavbarDropdownButton>
                <NavbarDropdownButton text="Logout" onClick={handleLogout}>
                  <img src={logoutIcon} className="w-6 h-6" />
                </NavbarDropdownButton>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      {isMenuOpen && (
        <div className="fixed inset-0 backdrop-brightness-50 backdrop-blur-sm z-0 md:hidden"></div>
      )}
    </>
  );
};

export default NavBar;
