import React from "react";
import { Link, useLocation } from "react-router-dom";

const BottomNav = () => {
  const location = useLocation();
  const tabs = [
    { id: "/", label: "Home" },
    { id: "/community", label: "Community" },
    { id: "/matches", label: "Matches" },
    { id: "/news", label: "News" },
  ];

  return (
    <div className="fixed bottom-0 w-full h-16 bg-white border-t border-gray-200 flex justify-around items-center z-50">
      {tabs.map((tab) => (
        <Link
          key={tab.id}
          to={tab.id}
          className={`flex flex-col items-center text-[10px] uppercase font-bold tracking-tighter ${
            location.pathname === tab.id ? "text-blue-700" : "text-gray-400"
          }`}
        >
          <div
            className={`h-1 w-8 mb-1 rounded-full ${
              location.pathname === tab.id ? "bg-blue-700" : "bg-transparent"
            }`}
          />
          {tab.label}
        </Link>
      ))}
    </div>
  );
};

export default BottomNav;
