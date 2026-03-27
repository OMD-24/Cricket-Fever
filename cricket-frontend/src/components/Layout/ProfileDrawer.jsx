import React from "react";
import { useNavigate } from "react-router-dom"; 
import {
  UserIcon,
  TrophyIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { usePlayer } from "../../context/PlayerContext";

const ProfileDrawer = ({ isOpen, onClose }) => {
  const { player } = usePlayer();
  const navigate = useNavigate(); 

  
  const handleNavigation = (path) => {
    navigate(path);
    onClose(); 
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      ></div>

      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white z-[110] shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 bg-gray-900 text-white relative overflow-hidden">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>

          <div className="flex items-center gap-4 mt-4">
            <div
              className={`h-16 w-16 rounded-2xl border-2 border-white flex flex-col items-center justify-center shadow-lg`}
              style={{ backgroundColor: player?.teamColor || "#1d4ed8" }}
            >
              <span className="text-[8px] font-black uppercase">No.</span>
              <span className="text-2xl font-black italic leading-none">
                {player.jerseyNo}
              </span>
            </div>
            <div>
              <h2 className="text-lg font-black italic uppercase tracking-tighter">
                {player.name}
              </h2>
              <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest">
                {player.role}
              </p>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-1">
          <DrawerItem
            icon={<UserIcon className="h-5 w-5" />}
            label="My Locker (Profile)"
            onClick={() => handleNavigation("/profile")}
          />
          <DrawerItem
            icon={<TrophyIcon className="h-5 w-5" />}
            label="My Achievements"
          />
          <DrawerItem
            icon={<Cog6ToothIcon className="h-5 w-5" />}
            label="Gear Settings"
          />

          <div className="my-4 border-t border-gray-100"></div>

          <DrawerItem
            icon={<ArrowLeftOnRectangleIcon className="h-5 w-5 text-red-500" />}
            label="Exit Stadium (Logout)"
            danger
            onClick={() => {
              if (window.confirm("Are you sure you want to log out?")) {
                 navigate("/auth");
                 localStorage.removeItem("playerId");
                 window.location.reload(); 
              }
            }}
          />
        </nav>
      </div>
    </>
  );
};


const DrawerItem = ({ icon, label, danger, onClick }) => (
  <div
    onClick={onClick} 
    className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all hover:bg-gray-50 group`}
  >
    <div
      className={`${
        danger ? "text-red-500" : "text-gray-400 group-hover:text-black"
      }`}
    >
      {icon}
    </div>
    <span
      className={`text-sm font-bold uppercase tracking-tight ${
        danger ? "text-red-500" : "text-gray-600 group-hover:text-black"
      }`}
    >
      {label}
    </span>
  </div>
);

export default ProfileDrawer;
