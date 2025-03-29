import { Avatar } from "@mui/material";
import Image from "next/image";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import GroupsIcon from "@mui/icons-material/Groups";
import { signOut, useSession } from "next-auth/react";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import EventIcon from "@mui/icons-material/Event";

function Sidebar() {
  const { data: session } = useSession();

  return (
    <div className="space-y-2 min-w-max max-w-lg">
      {/* Top */}
      <div className="bg-white dark:bg-[#1D2226] rounded-lg overflow-hidden relative flex flex-col items-center text-center border border-gray-300 dark:border-none">
        <div className="relative w-full h-14">
          <Image src="https://rb.gy/i26zak" layout="fill" priority />
        </div>
        <Avatar
          // onClick={signOut}
          src={session?.user?.image}
          className="!h-14 !w-14 !border-2 !absolute !top-4 !cursor-pointer"
        />
        <div className="mt-5 py-4 space-x-0.5">
          <h4 className="cursor-pointer">{session?.user?.name}</h4>
          <p className="text-black/60 dark:text-white/75 text-sm">
            {session?.user?.email}
          </p>
        </div>
      </div>
      {/* Bottom */}
      <div className="hidden md:flex bg-white dark:bg-[#1D2226] text-black/70 dark:text-white/75 rounded-lg overflow-hidden flex-col space-y-2 pt-2.5 sticky top-20 border border-gray-300 dark:border-none">
        <div className="font-medium py-3 px-4 cursor-pointer space-y-0.5">
          <div className="flex justify-between opacity-80 hover:opacity-100 space-x-2">
            <h4>Profile viewers</h4>
            <span className="text-blue-500">54</span>
          </div>
          <div className="flex justify-between opacity-80 hover:opacity-100 space-x-2">
            <h4>View all analytics</h4>
          </div>
        </div>

        <div className="sidebarButton">
          <h4 className="leading-4 text-xs">
            Access exclusive tools & insights
          </h4>
          <h4 className="dark:text-white font-medium">
            <span className="w-3 h-3 bg-gradient-to-tr from-yellow-700 to-yellow-200 inline-block rounded-sm mr-1" />{" "}
            Try Premium for free
          </h4>
        </div>
      </div>
      <div className="hidden md:flex bg-white dark:bg-[#1D2226] text-black/70 dark:text-white/75 rounded-lg overflow-hidden flex-col space-y-2 sticky top-20 border border-gray-300 dark:border-none">
        <div className="font-medium py-3 px-4 cursor-pointer space-y-0.5">
          <div className="flex items-center">
            <BookmarkOutlinedIcon fontSize="10px" />
            <p className="sidebarLink">Saved items</p>
          </div>
          <div className="flex items-center">
            <GroupsIcon fontSize="10px" />
            <p className="sidebarLink">Groups</p>
          </div>
          <div className="flex items-center">
            <NewspaperIcon fontSize="10px" />
            <p className="sidebarLink">Newsletters</p>
          </div>
          <div className="flex items-center">
            <EventIcon fontSize="10px" />
            <p className="sidebarLink">Events</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
