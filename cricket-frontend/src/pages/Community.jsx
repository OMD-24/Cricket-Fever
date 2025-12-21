import React, { useState } from "react";
import CricketFeed from "../components/Sections/CricketFeed";
import SearchFeed from "../components/Sections/SearchFeed";
import PostBoard from "../components/Sections/PostBoard";
import { usePlayer } from "../context/PlayerContext";

const Community = () => {
  const { player } = usePlayer();
  const [newPosts, setNewPosts] = useState([]);

  
  const handleBroadcast = async (postText) => {
    const newEntry = {
      name: player.name,
      jerseyNo: player.jerseyNo,
      teamColor: player.teamColor,
      text: postText,
      cheers: "0",
    };

    try {
     
      const response = await fetch(
        "http://localhost:8080/api/tweets/broadcast",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newEntry),
        }
      );

      if (response.ok) {
        const savedTweet = await response.json();
        setNewPosts((prev) => [savedTweet, ...prev]);
        console.log("Broadcast successfully saved to Postgres");
      } else {
        console.error("Server failed to save broadcast");
      }
    } catch (error) {
      console.error(
        "Network error: Is the Spring Boot backend running?",
        error
      );
    }
  };

  return (
    <div className="flex h-[calc(100vh-64px)] w-full overflow-hidden bg-white pt-2">
      <section className="flex-[0.7] border-r border-gray-100 h-full flex flex-col">
       
        <div className="flex-1 overflow-y-auto no-scrollbar bg-gray-50/20 mt-2">
          <CricketFeed extraPosts={newPosts} />
        </div>
      </section>

    
      <aside className="flex-[0.3] h-full flex flex-col bg-white">
        <div className="p-4 mt-4 border-b border-gray-100 bg-gray-50/50">
          <h3 className="text-[10px] font-black uppercase tracking-widest mb-3">
            Broadcast
          </h3>
          <PostBoard onBroadcast={handleBroadcast} />
        </div>

        <div className="flex-1 p-4 overflow-hidden flex flex-col">
          <h3 className="text-[10px] font-black uppercase tracking-widest mb-3 text-gray-400">
            Scouting Dept.
          </h3>
          <div className="flex-1 overflow-y-auto no-scrollbar">
            <SearchFeed />
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Community;
