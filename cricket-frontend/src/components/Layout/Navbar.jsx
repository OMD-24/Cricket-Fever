import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HomeIcon,
  UserGroupIcon,
  TrophyIcon,
  NewspaperIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import ProfileDrawer from "./ProfileDrawer";
import { usePlayer } from "../../context/PlayerContext"; 

const Navbar = () => {
  const { player } = usePlayer(); 
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();


  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className="fixed top-0 left-0 w-full h-16 bg-white border-b border-gray-100 z-[90] flex items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-4">
          <div
            onClick={() => setDrawerOpen(true)}
            className={`h-10 w-10 rounded-xl ${player.teamColor} border-2 border-black flex flex-col items-center justify-center cursor-pointer hover:rotate-3 transition-transform shadow-sm`}
          >
            <span className="text-[6px] text-white font-black leading-none uppercase">
              No.
            </span>
            <span className="text-sm text-white font-black italic">
              {player.jerseyNo}
            </span>
          </div>
          <h1 className="hidden md:block text-xl font-black italic tracking-tighter uppercase">
            Cricket<span className="text-blue-700">Fever</span>
          </h1>
        </div>

        <div className="flex items-center gap-1 md:gap-8">
          <NavLink
            to="/"
            icon={<HomeIcon className="h-5 w-5" />}
            label="Home"
            active={isActive("/")}
          />
          <NavLink
            to="/community"
            icon={<UserGroupIcon className="h-5 w-5" />}
            label="The Pitch"
            active={isActive("/community")}
          />
          <NavLink
            to="/matches"
            icon={<TrophyIcon className="h-5 w-5" />}
            label="Matches"
            active={isActive("/matches")}
          />
          <NavLink
            to="/news"
            icon={<NewspaperIcon className="h-5 w-5" />}
            label="News"
            active={isActive("/news")}
          />
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
            <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Quick Scout..."
              className="bg-transparent border-none outline-none text-xs ml-2 w-24 font-medium italic"
            />
          </div>
          <div className="relative cursor-pointer">
            <div className="h-2 w-2 bg-red-600 rounded-full absolute -top-0.5 -right-0.5 animate-pulse"></div>
            <TrophyIcon className="h-6 w-6 text-gray-700" />
          </div>
        </div>
      </nav>
      <ProfileDrawer
        isOpen={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </>
  );
};

const NavLink = ({ to, icon, label, active }) => (
  <Link
    to={to}
    className={`flex flex-col md:flex-row items-center gap-1 md:gap-2 px-3 py-2 rounded-xl transition-all ${
      active
        ? "text-blue-700 bg-blue-50/50"
        : "text-gray-400 hover:text-black hover:bg-gray-50"
    }`}
  >
    {icon}
    <span
      className={`text-[10px] md:text-xs font-black uppercase tracking-widest ${
        active ? "opacity-100" : "opacity-70"
      }`}
    >
      {label}
    </span>
  </Link>
);

export default Navbar;
