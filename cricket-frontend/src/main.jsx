import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Home from "./pages/Home";
import Community from "./pages/Community";
import Matches from "./pages/Matches";
import News from "./pages/News";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import { PlayerProvider } from "./context/PlayerContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      {" "}
      <PlayerProvider>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="community" element={<Community />} />
            <Route path="matches" element={<Matches />} />
            <Route path="news" element={<News />} />
            <Route path="profile" element={<Profile />} />
            <Route path="profile/:id" element={<Profile />} />
          </Route>
        </Routes>
      </PlayerProvider>
    </Router>
  </StrictMode>
);
