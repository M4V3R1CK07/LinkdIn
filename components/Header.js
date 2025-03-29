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
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30,
};

function Header() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();
  const [isInputFocused, setIsInputFocused] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <>
      {isInputFocused && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black/50 backdrop-blur-sm z-30"
          onClick={() => setIsInputFocused(false)}
        ></div>
      )}

      <header className="sticky top-0 z-40 bg-white dark:bg-[#1D2226] flex items-center justify-around py-0.5 px-5 focus-within:shadow-lg">
        {/* Left */}
        <div className="flex items-center space-x-2 w-full max-w-xs scale-90">
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
              className={`hidden md:inline-flex bg-transparent text-sm focus:outline-none flex-grow transition-colors ${
                resolvedTheme === "dark"
                  ? "placeholder-gray-300 text-white"
                  : "placeholder-gray-600 text-black"
              }`}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
            />
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center space-x-6 scale-95">
          <HeaderLink Icon={HomeRoundedIcon} text="Home" feed active />
          <HeaderLink Icon={GroupIcon} text="My Network" feed />
          <HeaderLink Icon={BusinessCenterIcon} text="Jobs" feed hidden />
          <HeaderLink Icon={ChatIcon} text="Messaging" feed />
          <HeaderLink Icon={NotificationsIcon} text="Notifications" feed />
          <HeaderLink Icon={Avatar} text="Me" feed avatar hidden />
          <HeaderLink Icon={AppsOutlinedIcon} text="For Business" feed hidden />

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
