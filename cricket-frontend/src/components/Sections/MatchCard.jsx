import React from "react";

const MatchCard = ({ match, type }) => {
  if (!match) return null; 

  return (
    <div className="bg-white border-2 border-black rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
     
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-blue-800 rounded-md border border-black flex items-center justify-center text-white text-[10px] font-bold italic">
              {match.team1.substring(0, 3).toUpperCase()}
            </div>
            <span className="font-black italic uppercase">{match.team1}</span>
          </div>
          <span className="font-black text-xl">{match.score1}</span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-gray-800 rounded-md border border-black flex items-center justify-center text-white text-[10px] font-bold italic">
              {match.team2.substring(0, 3).toUpperCase()}
            </div>
            <span className="font-black italic uppercase">{match.team2}</span>
          </div>
          <span className="font-black text-xl">{match.score2}</span>
        </div>
      </div>
      <div className="mt-5 pt-3 border-t border-dashed border-gray-200">
        <p className="text-[11px] font-medium italic text-gray-500">
          {match.status}
        </p>
      </div>
    </div>
  );
};

export default MatchCard;
