import React from "react";
import SearchFeed from "./SearchFeed";

const SearchPage = () => {
  return (
    <div className="h-screen overflow-hidden mt-16 max-w-2xl mx-auto bg-white border-x border-gray-100">
      <div className="h-full flex flex-col">
        <div className="p-4 border-b">
          <h2 className="text-2xl font-black italic uppercase tracking-tighter">
            Scouting Dept.
          </h2>
        </div>

        <div className="flex-1 overflow-hidden">
          <SearchFeed />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
