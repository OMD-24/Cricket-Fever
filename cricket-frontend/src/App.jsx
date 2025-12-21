import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Layout/Navbar";
import BottomNav from "./components/Layout/BottomNav";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-black">
      <Navbar />
      <main className="mt-16 pb-20">
        <Outlet /> 
      </main>
      <BottomNav />
    </div>
  );
}

export default App;
