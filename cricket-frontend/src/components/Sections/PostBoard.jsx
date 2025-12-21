import React, { useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

const PostBoard = ({ onBroadcast }) => {

  const [text, setText] = useState("");

  const handlePost = () => {
    if (text.trim()) {
      onBroadcast(text);
      setText(""); 
    }
  };

  return (
    <div className="bg-white rounded-2xl p-4 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What's the match update?"
        className="w-full h-24 outline-none resize-none text-sm font-medium italic bg-transparent"
      />
      <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-100">
        <span className="text-[10px] font-bold text-gray-400">
          {text.length}/280
        </span>
        <button
          onClick={handlePost}
          className="bg-black text-white px-4 py-2 rounded-lg font-black text-[10px] uppercase flex items-center gap-2 hover:bg-red-600 transition-colors"
        >
          Broadcast <PaperAirplaneIcon className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
};

export default PostBoard;
