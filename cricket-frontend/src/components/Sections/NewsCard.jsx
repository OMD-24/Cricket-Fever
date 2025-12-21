import React from "react";

const NewsCard = ({ news }) => {
  if (!news) return null;

  return (
    <div className="flex flex-col group cursor-pointer">
      <div className="w-full h-40 bg-gray-100 rounded-2xl border border-gray-100 overflow-hidden mb-3">
        <div className="w-full h-full bg-blue-50 flex items-center justify-center text-gray-300 font-black italic">
          {news.category.toUpperCase()} IMAGE
        </div>
      </div>

      <div className="space-y-1">
        <span className="text-[9px] font-black text-red-600 uppercase tracking-widest">
          {news.category}
        </span>
        <h3 className="text-sm font-black uppercase italic leading-tight group-hover:text-blue-700 transition-colors">
          {news.title}
        </h3>
        <p className="text-[11px] text-gray-500 font-medium line-clamp-2">
          {news.description}
        </p>
        <div className="flex items-center gap-2 pt-2">
          <span className="text-[9px] font-bold text-gray-400 uppercase">
            {news.time}
          </span>
          <span className="text-gray-300">|</span>
          <span className="text-[9px] font-bold text-gray-400 uppercase">
            By Sports Desk
          </span>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
