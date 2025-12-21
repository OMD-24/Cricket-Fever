import React, { useState, useEffect } from "react";
import MatchCard from "../components/Sections/MatchCard";


const Matches = () => {
  const [filter, setFilter] = useState("live");
  const [matchList, setMatchList] = useState([]);
  const [standings, setStandings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const fetchMatchData = async () => {
      setIsLoading(true);
      try {
    
        const matchRes = await fetch(
          `http://localhost:8080/api/matches/${filter}`
        );
        const matchData = await matchRes.json();
        setMatchList(matchData);

        const standingsRes = await fetch(
          "http://localhost:8080/api/matches/standings"
        );
        const standingsData = await standingsRes.json();
        setStandings(standingsData);
      } catch (error) {
        console.error("Scoreboard connection error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMatchData();
  }, [filter]);

  return (
    <div className="flex h-screen overflow-hidden bg-white mt-16 max-w-7xl mx-auto">
      <div className="flex-[0.7] border-r border-gray-100 h-full flex flex-col">
        <div className="flex bg-white border-b border-gray-100 sticky top-0 z-10">
          {["live", "upcoming", "recent"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`flex-1 py-4 text-xs font-black uppercase tracking-widest transition-all ${
                filter === tab
                  ? "border-b-4 border-black text-black"
                  : "text-gray-400 hover:text-black"
              }`}
            >
              {tab} Matches
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar bg-gray-50/30 pb-24">
          {isLoading ? (
            <div className="flex items-center justify-center py-20 font-black italic text-gray-400 uppercase tracking-widest animate-pulse">
              Syncing Live Scorecards...
            </div>
          ) : matchList.length > 0 ? (
            matchList.map((match, index) => (
              <MatchCard key={match.id || index} match={match} type={filter} />
            ))
          ) : (
            <div className="text-center py-20">
              <p className="font-black italic text-gray-300 uppercase text-2xl">
                No {filter} matches
              </p>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">
                Check back during match hours
              </p>
            </div>
          )}
        </div>
      </div>


      <aside className="flex-[0.3] hidden lg:flex flex-col h-full p-4 bg-white overflow-hidden">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 text-gray-400">
          Series Standings
        </h3>

        <div className="border border-black rounded-xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white">
          <table className="w-full text-left text-xs">
            <thead className="bg-black text-white uppercase italic">
              <tr>
                <th className="p-3">Team</th>
                <th className="p-3 text-center">P</th>
                <th className="p-3 text-center">Pts</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((team, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 font-bold hover:bg-gray-50 transition-colors"
                >
                  <td className="p-3 italic uppercase">{team.name}</td>
                  <td className="p-3 text-center text-gray-500">
                    {team.played}
                  </td>
                  <td className="p-3 text-center font-black">{team.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 text-gray-400">
            Pitch Headlines
          </h3>
          <div className="p-4 bg-gray-50 rounded-xl border border-dashed border-gray-200">
            <p className="text-[11px] font-bold italic leading-relaxed">
              "Heavy rain delay in London. Match officials expected to inspect
              the pitch at 14:30 GMT."
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Matches;
