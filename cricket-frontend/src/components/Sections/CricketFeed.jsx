import React, { useState, useEffect } from "react";
import {
  TrophyIcon,
  ChatBubbleLeftIcon,
  ArrowsRightLeftIcon,
  TrashIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/outline";
import { TrophyIcon as TrophySolid } from "@heroicons/react/24/solid";

const CricketFeed = ({ extraPosts = [] }) => {
  const [baseTweets, setBaseTweets] = useState([]);
  const [cheeredTweets, setCheeredTweets] = useState({});

  
  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/tweets/all");
        if (response.ok) {
          const data = await response.json();
          setBaseTweets(data);
        }
      } catch (error) {
        console.error("Failed to fetch the Pitch feed:", error);
      }
    };
    fetchTweets();
  }, []);

  
  const allTweets = [...extraPosts, ...baseTweets];

  
  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/tweets/delete/${id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setBaseTweets(baseTweets.filter((t) => t.id !== id));
      }
    } catch (error) {
      console.error("Could not remove broadcast:", error);
    }
  };

 

  const toggleCheer = async (tweetId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/tweets/${tweetId}/cheer`,
        {
          method: "PATCH",
        }
      );

      if (response.ok) {
        const updatedTweet = await response.json();

        
        setBaseTweets((prev) =>
          prev.map((t) => (t.id === tweetId ? updatedTweet : t))
        );

       
        setCheeredTweets((prev) => ({
          ...prev,
          [tweetId]: true,
        }));
      }
    } catch (error) {
      console.error("Could not send cheer to the pitch:", error);
    }
  };

  const handleCheer = async (tweetId) => {
    try {
      
      const response = await fetch(
        `http://localhost:8080/api/tweets/${tweetId}/cheer`,
        {
          method: "PATCH",
        }
      );

      if (response.ok) {
        const updatedTweet = await response.json();

        
        setBaseTweets((prev) =>
          prev.map((t) => (t.id === tweetId ? updatedTweet : t))
        );

        
        setCheeredTweets((prev) => ({
          ...prev,
          [tweetId]: true,
        }));
      }
    } catch (error) {
      console.error("Pitch Error: Could not send cheer", error);
    }
  };

  return (
    <div className="h-full overflow-y-auto no-scrollbar pb-32">
      <div className="px-5 py-3 border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <h2 className="text-sm font-black uppercase italic tracking-widest">
          The Pitch
        </h2>
      </div>

      <div className="flex flex-col">
        {allTweets.map((tweet) => (
          <div
            key={tweet.id}
            className="p-4 border-b border-gray-100 hover:bg-gray-50/50 transition-colors group cursor-default"
          >
            <div className="flex gap-4">
              <div
                className={`h-12 w-12 rounded-xl ${
                  tweet.color || "bg-blue-700"
                } border-2 border-black flex flex-col items-center justify-center shadow-sm shrink-0 mt-1 transition-transform group-hover:rotate-2`}
              >
                <span className="text-[6px] text-white font-black leading-none uppercase">
                  No.
                </span>
                <span className="text-sm text-white font-black italic">
                  {tweet.no || tweet.jerseyNo || "00"}
                </span>
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-1">
                    <span className="font-black uppercase italic text-[13px] tracking-tight hover:underline cursor-pointer">
                      {tweet.name}
                    </span>
                    <CheckBadgeIcon className="h-3.5 w-3.5 text-blue-500" />
                    <span className="text-gray-400 text-[11px] font-medium ml-1">
                      @{tweet.name?.toLowerCase().replace(/\s/g, "")}
                    </span>
                  </div>


                  <button
                    onClick={() => handleDelete(tweet.id)}
                    className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-600 transition-all p-1"
                    title="Remove Broadcast"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>

                <p className="mt-1 text-gray-800 text-[14px] leading-relaxed font-medium italic">
                  {tweet.text}
                </p>


                <div className="flex justify-between items-center mt-3 max-w-[85%] text-gray-500">
                  <div className="flex items-center gap-1.5 hover:text-blue-500 cursor-pointer transition-colors group/action">
                    <div className="p-2 rounded-full group-hover/action:bg-blue-50">
                      <ChatBubbleLeftIcon className="h-4 w-4" />
                    </div>
                    <span className="text-[10px] font-bold">8</span>
                  </div>

                  <div className="flex items-center gap-1.5 hover:text-green-500 cursor-pointer transition-colors group/action">
                    <div className="p-2 rounded-full group-hover/action:bg-green-50">
                      <ArrowsRightLeftIcon className="h-4 w-4" />
                    </div>
                    <span className="text-[10px] font-bold">3</span>
                  </div>

                  <div
                    onClick={() => handleCheer(tweet.id)}
                    className={`flex items-center gap-1.5 cursor-pointer transition-colors mt-3 ${
                      cheeredTweets[tweet.id]
                        ? "text-red-600"
                        : "text-gray-500 hover:text-red-600"
                    }`}
                  >
                    <div
                      className={`p-2 rounded-full ${
                        cheeredTweets[tweet.id]
                          ? "bg-red-50"
                          : "hover:bg-red-50"
                      }`}
                    >
                      <TrophyIcon className="h-4 w-4" />
                    </div>
                    <span className="text-[10px] font-bold">
                      {tweet.cheers || "0"}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-gray-300">
                    <span className="text-[9px] font-black uppercase tracking-tighter">
                      Live Form
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CricketFeed;
