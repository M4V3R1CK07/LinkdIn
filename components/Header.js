import Image from "next/image";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import HeaderLink from "./HeaderLink";
import GroupIcon from "@mui/icons-material/Group";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import { Avatar } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30,
};

function Header() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false); // Avatar dropdown
  // New state for "For Business" dropdown
  const [businessDropdownVisible, setBusinessDropdownVisible] = useState(false);

  // States for search functionality
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const { data: session } = useSession();
  const avatarDropdownRef = useRef(null);
  const businessDropdownRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        avatarDropdownRef.current &&
        !avatarDropdownRef.current.contains(event.target)
      ) {
        setDropdownVisible(false);
      }
      if (
        businessDropdownRef.current &&
        !businessDropdownRef.current.contains(event.target)
      ) {
        setBusinessDropdownVisible(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        // Optionally clear search suggestions here
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!session) {
      setDropdownVisible(false);
      setBusinessDropdownVisible(false);
    }
  }, [session]);

  // Debounce search query and fetch results
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }
    setSearchLoading(true);
    const timer = setTimeout(() => {
      fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`)
        .then((res) => res.json())
        .then((data) => {
          setSearchResults(data.users || []);
          setSearchLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching search results:", error);
          setSearchLoading(false);
        });
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  return (
    <>
      {isInputFocused && (
        // Optional overlay when search input is active
        <div
          className="fixed top-0 left-0 w-full h-full bg-black/50 backdrop-blur-sm z-30"
          onClick={() => setIsInputFocused(false)}
        ></div>
      )}

      <header className="sticky top-0 z-40 bg-white dark:bg-[#1D2226] flex items-center justify-around py-0.5 px-5 focus-within:shadow-lg">
        {/* Left Side (Logo and Search) */}
        <div
          className="flex items-center space-x-2 w-full max-w-xs scale-90 relative"
          ref={searchRef}
        >
          {mounted && (
            <>
              {resolvedTheme === "dark" ? (
                <Image
                  src="https://rb.gy/bizvqj"
                  width={45}
                  height={45}
                  alt="Logo Dark"
                />
              ) : (
                <Image
                  src="https://rb.gy/dpmd9s"
                  width={55}
                  height={55}
                  alt="Logo Light"
                />
              )}
            </>
          )}
          {/* Search Container */}
          <div
            className={`flex items-center space-x-1 py-2.5 px-4 rounded w-full border transition-colors ${
              resolvedTheme === "dark"
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-gray-200 border-gray-300 text-black"
            }`}
          >
            <SearchRoundedIcon className="text-inherit" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsInputFocused(true)}
              className={`hidden md:inline-flex bg-transparent text-sm focus:outline-none flex-grow transition-colors ${
                resolvedTheme === "dark"
                  ? "placeholder-gray-300 text-white"
                  : "placeholder-gray-600 text-black"
              }`}
            />
          </div>
          {/* Search Suggestions Dropdown */}
          {searchQuery && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-white dark:bg-[#1D2226] shadow rounded mt-1 z-50">
              {searchLoading && (
                <div className="px-4 py-2 text-gray-600 dark:text-gray-300">
                  Loading...
                </div>
              )}
              {searchResults.map((user) => (
                <Link href={`/profile/${user._id}`} key={user._id}>
                  <a
                    className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => {
                      setSearchQuery("");
                      setSearchResults([]);
                    }}
                  >
                    <Image
                      src={user.image || "/default-user.png"}
                      alt={user.name}
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-300">
                        {user.title || ""}
                      </p>
                    </div>
                  </a>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Right Side (Other Header Links) */}
        <div className="flex items-center space-x-6 scale-95">
          <HeaderLink Icon={HomeRoundedIcon} text="Home" feed href="/" />
          <HeaderLink
            Icon={GroupIcon}
            text="My Network"
            feed
            href="/mynetwork"
          />
          <HeaderLink
            Icon={BusinessCenterIcon}
            text="Jobs"
            feed
            hidden
            href="/jobs"
          />
          <HeaderLink Icon={ChatIcon} text="Messaging" feed href="/messaging" />
          <HeaderLink
            Icon={NotificationsIcon}
            text="Notifications"
            feed
            href="/notifications"
          />

          {/* Avatar with Dropdown */}
          <div className="relative" ref={avatarDropdownRef}>
            <div
              onClick={() => setDropdownVisible((prev) => !prev)}
              className="cursor-pointer flex flex-col items-center"
            >
              <Avatar src={session?.user?.image} className="!h-7 !w-7" />
              <h4 className="text-sm hidden lg:flex justify-center w-full mt-1">
                Me &#11167;
              </h4>
            </div>
            {dropdownVisible && session && (
              <div className="absolute top-full right-0 mt-2 w-48 py-2 bg-white dark:bg-[#1D2226] rounded-lg shadow-lg z-50">
                {session.user?.id ? (
                  <Link href={`/profile/${session.user.id}`}>
                    <a className="block px-4 py-2 text-gray-800 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700">
                      View Profile
                    </a>
                  </Link>
                ) : (
                  <div className="block px-4 py-2 text-gray-800">
                    View Profile
                  </div>
                )}
                <Link href="/settings">
                  <a className="block px-4 py-2 text-gray-800 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700">
                    Settings
                  </a>
                </Link>
                <button
                  onClick={() => {
                    setDropdownVisible(false);
                    signOut();
                  }}
                  className="w-full text-left block px-4 py-2 text-gray-800 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>

          {/* Business Dropdown */}
          <div className="relative" ref={businessDropdownRef}>
            <div
              onClick={() => setBusinessDropdownVisible((prev) => !prev)}
              className="cursor-pointer flex flex-col items-center"
            >
              <AppsOutlinedIcon className="!h-7 !w-7" />
              <h4 className="text-sm hidden lg:flex justify-center w-full mt-1">
                For Business &#11167;
              </h4>
            </div>
            {businessDropdownVisible && (
              <div className="absolute top-full right-0 mt-2 w-80 py-4 bg-white dark:bg-[#1D2226] rounded-lg shadow-lg z-50">
                {/* My Apps section */}
                <div className="px-4 pb-2">
                  <h5 className="text-lg font-bold text-gray-900 dark:text-white">
                    My Apps
                  </h5>
                  <ul className="mt-2 space-y-1">
                    <li className="text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-2 py-1 rounded">
                      Sell
                    </li>
                    <li className="text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-2 py-1 rounded">
                      Groups
                    </li>
                    <li className="text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-2 py-1 rounded">
                      Manage Billing
                    </li>
                    <li className="text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-2 py-1 rounded">
                      Talent Insights
                    </li>
                    <li className="text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-2 py-1 rounded">
                      Post a job
                    </li>
                    <li className="text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-2 py-1 rounded">
                      Services Marketplace
                    </li>
                    <li className="text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-2 py-1 rounded">
                      Advertise
                    </li>
                    <li className="text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-2 py-1 rounded">
                      Learning
                    </li>
                  </ul>
                </div>
                <hr className="border-gray-300 dark:border-gray-700 my-2" />
                {/* Explore more for business section */}
                <div className="px-4">
                  <h5 className="text-lg font-bold text-gray-900 dark:text-white">
                    Explore more for business
                  </h5>
                  <ul className="mt-2 space-y-1">
                    <li className="text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-2 py-1 rounded">
                      Hire on LinkedIn: Find, attract and recruit talent
                    </li>
                    <li className="text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-2 py-1 rounded">
                      Sell with LinkedIn: Unlock sales opportunities
                    </li>
                    <li className="text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-2 py-1 rounded">
                      Post a job for free: Get qualified applicants quickly
                    </li>
                    <li className="text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-2 py-1 rounded">
                      Advertise on LinkedIn: Acquire customers and grow your
                      business
                    </li>
                    <li className="text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-2 py-1 rounded">
                      Get started with Premium: Expand and leverage your network
                    </li>
                    <li className="text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-2 py-1 rounded">
                      Learn with LinkedIn: Courses to develop your employees
                    </li>
                    <li className="text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-2 py-1 rounded">
                      Admin Center: Manage billing and account details
                    </li>
                    <li className="text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-2 py-1 rounded">
                      Create a Company Page
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {mounted && (
            <div
              className={`bg-gray-600 flex items-center px-0.5 rounded-full h-7 w-14 cursor-pointer flex-shrink-0 relative ${
                resolvedTheme === "dark" ? "justify-end" : "justify-start"
              }`}
              onClick={() =>
                setTheme(resolvedTheme === "dark" ? "light" : "dark")
              }
            >
              <span className="absolute left-0">
                <DarkModeIcon />
              </span>
              <motion.div
                className="w-6 h-6 bg-white rounded-full z-40"
                layout
                transition={spring}
              />
              <span className="absolute right-0.5">
                <LightModeIcon />
              </span>
            </div>
          )}
        </div>
      </header>
    </>
  );
}

export default Header;
