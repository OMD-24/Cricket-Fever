import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePlayer } from "../context/PlayerContext";
import CricketFeed from "../components/Sections/CricketFeed";

const Profile = () => {
  const { id } = useParams();
  const { player: currentPlayer, updatePlayer } = usePlayer();

  const [viewedPlayer, setViewedPlayer] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    if (id) {
      const fetchScoutedPlayer = async () => {
        try {
          const response = await fetch(
            `http://localhost:8080/api/players/${id}`
          );
          if (response.ok) {
            const result = await response.json();
            setViewedPlayer(result.data);
          }
        } catch (error) {
          console.error("Scouting Error: Could not find player", error);
        }
      };
      fetchScoutedPlayer();
    } else {
      setViewedPlayer(currentPlayer);
      setEditData({ ...currentPlayer });
    }
  }, [id, currentPlayer]);

  const handleSave = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/players/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...currentPlayer, ...editData }),
      });
      if (response.ok) {
        const result = await response.json();
        updatePlayer(result.data);
      }
    } catch (error) {
      console.error("Locker Error: Could not save profile", error);
    }
    setIsEditing(false);
  };

  if (!viewedPlayer) {
    return (
      <div className="h-screen flex items-center justify-center font-black italic uppercase tracking-widest text-gray-400">
        Searching the Stadium for Player...
      </div>
    );
  }

  const isOwnProfile = !id || Number(id) === viewedPlayer.id;

  return (
    <div className="flex h-screen overflow-hidden bg-white mt-16 max-w-7xl mx-auto">
      <div className="flex-[0.7] border-r border-gray-100 h-full flex flex-col overflow-y-auto no-scrollbar pb-24">
        <div className="relative">
          <div className="h-48 bg-gray-900 w-full overflow-hidden">
            <div className="w-full h-full opacity-40 bg-[url('https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=1000')] bg-cover bg-center"></div>
          </div>

          <div className="px-8 -mt-16 relative z-10 flex items-end gap-6">
            <div
              className="h-32 w-32 rounded-3xl border-4 border-white shadow-xl flex flex-col items-center justify-center text-white transition-colors duration-500"
              style={{ backgroundColor: viewedPlayer.teamColor || "#1d4ed8" }}
            >
              <span className="text-xs font-black uppercase opacity-80">
                No.
              </span>
              <span className="text-5xl font-extrabold italic">
                {viewedPlayer.jerseyNo}
              </span>
            </div>
            <div className="mb-2">
              <h1 className="text-3xl font-black italic uppercase tracking-tighter">
                {viewedPlayer.name}
              </h1>
              <p className="text-gray-500 font-bold uppercase tracking-wide text-xs">
                {viewedPlayer.role} ·{" "}
                {isOwnProfile ? "Active Pro" : "Draft Prospect"}
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-around py-8 border-b border-gray-100 mt-4 mx-8 text-center">
          <Stat label="Innings" value="154" />
          <Stat label="Cheers" value="8.2k" color="text-red-600" />
          <Stat label="Boundaries" value="42" color="text-blue-600" />
        </div>

        <div className="p-4">
          <h3 className="text-[10px] font-black uppercase mb-4 sticky top-0 bg-white py-2 tracking-[0.2em] text-gray-400">
            {isOwnProfile
              ? "My History on the Pitch"
              : `${viewedPlayer.name}'s Pitch History`}
          </h3>
          <CricketFeed playerId={viewedPlayer.id} />
        </div>
      </div>

      <aside className="flex-[0.3] hidden lg:flex flex-col h-full p-6 bg-gray-50">
        {isOwnProfile ? (
          !isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="w-full border-2 border-black py-3 font-black text-xs uppercase italic hover:bg-black hover:text-white transition-all rounded-xl mb-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none"
            >
              Open Locker (Edit)
            </button>
          ) : (
            <div className="bg-white p-6 rounded-2xl border-2 border-black shadow-lg mb-8 space-y-4">
              <h3 className="font-black italic uppercase text-sm border-b pb-2">
                Customize Gear
              </h3>

              <EditInput
                label="Player Name"
                value={editData.name}
                onChange={(v) => setEditData({ ...editData, name: v })}
              />

              <EditInput
                label="Jersey No."
                value={editData.jerseyNo}
                maxLength="2"
                onChange={(v) => setEditData({ ...editData, jerseyNo: v })}
              />

              <div>
                <label className="text-[10px] font-black uppercase text-gray-400 block mb-1">
                  Jersey Color
                </label>
                <input
                  type="color"
                  className="w-full h-10 rounded-lg"
                  value={editData.teamColor || "#1d4ed8"}
                  onChange={(e) =>
                    setEditData({ ...editData, teamColor: e.target.value })
                  }
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={handleSave}
                  className="flex-1 bg-black text-white py-2 rounded-lg font-black text-[10px] uppercase"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex-1 bg-gray-200 py-2 rounded-lg font-black text-[10px] uppercase"
                >
                  Cancel
                </button>
              </div>
            </div>
          )
        ) : (
          <div className="space-y-4 mb-8">
            <button className="w-full bg-blue-700 text-white py-3 font-black text-xs uppercase italic rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] shadow-blue-900 active:translate-y-1 active:shadow-none">
              Follow Player
            </button>
            <button className="w-full border-2 border-black py-3 font-black text-xs uppercase italic hover:bg-black hover:text-white transition-all rounded-xl">
              Send Scouting Request
            </button>
          </div>
        )}

        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 text-gray-400">
          Trophy Cabinet
        </h3>
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-16 bg-white border border-gray-200 rounded-lg flex items-center justify-center grayscale hover:grayscale-0 cursor-help transition-all shadow-sm"
            >
              🏆
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
};

const Stat = ({ label, value, color = "" }) => (
  <div>
    <p className={`text-2xl font-black italic ${color}`}>{value}</p>
    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
      {label}
    </p>
  </div>
);

const EditInput = ({ label, value, onChange, ...props }) => (
  <div>
    <label className="text-[10px] font-black uppercase text-gray-400 block mb-1">
      {label}
    </label>
    <input
      className="w-full bg-gray-50 border-b-2 border-gray-200 p-2 text-sm font-bold italic outline-none focus:border-black transition-colors"
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      {...props}
    />
  </div>
);

export default Profile;
