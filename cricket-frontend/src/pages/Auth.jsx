import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePlayer } from "../context/PlayerContext";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { updatePlayer } = usePlayer();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    jerseyNo: "",
    teamColor: "#1d4ed8",
    role: "PLAYER",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const endpoint = isLogin
      ? "http://localhost:8080/api/players/login"
      : "http://localhost:8080/api/players/register";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        updatePlayer(result.data);
        navigate("/");
      } else {
        if (result.data && typeof result.data === 'object' && !Array.isArray(result.data)) {
           const messages = Object.values(result.data).join(" | ");
           setError(messages || result.message || "Registration failed.");
        } else {
           setError(result.message || "Invalid credentials.");
        }
      }
    } catch (err) {
      setError("Cannot reach backend server. Is Spring Boot running?");
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-900 p-4 relative overflow-hidden">
      <div className="bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl z-10 border-b-8 border-black">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black italic uppercase tracking-tighter">
            Cricket<span className="text-blue-700">Fever</span>
          </h1>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-2">
            {isLogin ? "Return to the Pavilion" : "Enter the Draft"}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-[10px] font-black uppercase italic">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <Input
                label="Player Name"
                required
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Jersey No."
                  maxLength="2"
                  required
                  onChange={(e) =>
                    setFormData({ ...formData, jerseyNo: e.target.value })
                  }
                />
                <div className="flex flex-col">
                  <label className="text-[10px] font-black uppercase mb-1">
                    Jersey Color
                  </label>
                  <input
                    type="color"
                    className="w-full h-10 rounded-lg"
                    value={formData.teamColor}
                    onChange={(e) =>
                      setFormData({ ...formData, teamColor: e.target.value })
                    }
                  />
                </div>
              </div>
            </>
          )}
          <Input
            label="Email"
            type="email"
            required
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <Input
            label="Password"
            type="password"
            required
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <button
            type="submit"
            className="w-full bg-black text-white py-4 rounded-xl font-black uppercase italic mt-4 hover:bg-blue-700"
          >
            {isLogin ? "Start Match" : "Sign Contract"}
          </button>
        </form>
        <p className="text-center mt-6 text-xs font-bold text-gray-400">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-black ml-1 underline font-black uppercase italic"
          >
            {isLogin ? "Register Now" : "Login here"}
          </button>
        </p>
      </div>
    </div>
  );
};

const Input = ({ label, ...props }) => (
  <div className="flex flex-col">
    <label className="text-[10px] font-black uppercase mb-1 ml-1">
      {label}
    </label>
    <input
      className="w-full p-3 bg-gray-50 rounded-lg border-2 border-transparent focus:border-black outline-none font-medium italic transition-all text-sm"
      {...props}
    />
  </div>
);

export default Auth;
