import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInitialProfile = async () => {
      try {
        const savedId = localStorage.getItem("playerId");

        if (!savedId) {
          setLoading(false);
          navigate("/auth");
          return;
        }

        const response = await fetch(
          `http://localhost:8080/api/players/${savedId}`
        );
        if (response.ok) {
          const result = await response.json();
          setPlayer(result.data);
        } else {
          localStorage.removeItem("playerId");
          navigate("/auth");
        }
      } catch (error) {
        console.error("Stadium database connection failed:", error);
        navigate("/auth");
      } finally {
        setLoading(false);
      }
    };

    fetchInitialProfile();
  }, [navigate]);

  const updatePlayer = (playerData) => {
    if (playerData && playerData.id) {
      localStorage.setItem("playerId", playerData.id);
    }
    setPlayer(playerData);
  };

  const logout = () => {
    localStorage.removeItem("playerId");
    setPlayer(null);
    navigate("/auth");
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center font-black italic uppercase text-gray-400 animate-pulse">
        Checking Player Credentials...
      </div>
    );
  }

  return (
    <PlayerContext.Provider value={{ player, updatePlayer, logout }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => useContext(PlayerContext);
