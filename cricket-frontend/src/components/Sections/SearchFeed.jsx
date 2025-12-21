import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const SearchFeed = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    
    const delayDebounceFn = setTimeout(() => {
      if (query.trim().length > 0) {
        fetch(`http://localhost:8080/api/players/search?q=${query}`)
          .then((res) => res.json())
          .then((data) => setResults(data))
          .catch((err) => console.error("Search Error:", err));
      } else {
        setResults([]);
      }
    }, 300); 

    
    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  return (
    <div className="flex flex-col h-full">
      <div className="relative mb-4">
        <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Jersey No... (e.g. 18)"
          className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-xl outline-none focus:ring-1 focus:ring-black text-sm font-medium italic"
        />
      </div>

      <div className="space-y-3 overflow-y-auto no-scrollbar">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
          Scouting Results
        </p>

        {results.map((player) => (
          <div
            key={player.id}
            className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-xl hover:border-black transition-all group"
          >
            <div className="flex items-center gap-3">
              <div
                className={`h-10 w-10 rounded-xl ${
                  player.teamColor || "bg-black"
                } flex flex-col items-center justify-center text-white shadow-sm`}
              >
                <span className="text-[6px] font-black uppercase leading-none">
                  No.
                </span>
                <span className="text-sm font-black italic">
                  {player.jerseyNo}
                </span>
              </div>
              <div>
                <p className="text-xs font-black uppercase italic">
                  {player.name}
                </p>
                <p className="text-[9px] text-gray-400 font-bold uppercase">
                  {player.role}
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate(`/profile/${player.id}`)}
              className="text-[9px] font-black border-2 border-black px-4 py-1.5 rounded-full hover:bg-black hover:text-white transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
            >
              VIEW PROFILE
            </button>
          </div>
        ))}

        {query.length > 0 && results.length === 0 && (
          <p className="text-center text-[10px] font-bold text-gray-400 mt-4 uppercase italic">
            No players found with that number
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchFeed;
