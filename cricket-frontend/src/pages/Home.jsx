import React from "react";

const Home = () => {
  return (
    <div className="p-4 max-w-7xl mx-auto pb-20 mt-16">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-5 flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-white border-2 border-black p-3 rounded-lg shadow-sm">
              <p className="text-[10px] font-bold text-gray-400">MATCH 1</p>
              <div className="flex justify-between items-center mt-2">
                <span className="font-bold">IND</span>
                <span className="text-xs">vs</span>
                <span className="font-bold">AUS</span>
              </div>
            </div>
            <div className="bg-white border-2 border-black p-3 rounded-lg shadow-sm">
              <p className="text-[10px] font-bold text-gray-400">MATCH 2</p>
              <div className="flex justify-between items-center mt-2">
                <span className="font-bold">ENG</span>
                <span className="text-xs">vs</span>
                <span className="font-bold">SA</span>
              </div>
            </div>
          </div>

          <div className="bg-red-600 text-white p-4 rounded-lg h-90 shadow-lg overflow-hidden relative">
            <h2 className="text-xl font-black italic uppercase tracking-tighter">
              Cricket News
            </h2>
            <div className="mt-4">
              <p className="font-bold text-lg">
                Rohit Sharma hits a double century!
              </p>
              <p className="text-sm opacity-80 mt-2">
                Check out the highlights of the historic innings at Eden
                Gardens...
              </p>
            </div>
            <div className="absolute bottom-0 right-0 p-2 bg-white text-red-600 font-bold text-xs">
              READ MORE
            </div>
          </div>
        </div>


        <div className="md:col-span-7 flex flex-col gap-4">

          <div className="bg-black text-white p-3 rounded-md flex items-center justify-between border-l-8 border-yellow-400 shadow-xl">
            <div className="flex items-center gap-4">
              <div className="bg-yellow-400 text-black px-2 py-1 font-black text-sm italic">
                LIVE
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-400">ICC WORLD CUP</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-lg">IND 284/4</span>
                  <span className="text-gray-500 text-sm">(42.2 Over)</span>
                </div>
              </div>
            </div>
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-yellow-400 underline italic">
                CRICKET FEVER BROADCAST
              </p>
            </div>
          </div>
          <div className="bg-gray-600 border border-gray-200 rounded-lg flex flex-col h-[375px] mt-2">
            <div className="p-3 border-b border-gray-300 font-bold flex justify-between items-center">
              <span>Live Community Chat</span>
              <span className="text-green-500 text-[10px] flex items-center gap-1">
                ● 1.2k Online
              </span>
            </div>
            <div className="flex-1 p-3 overflow-y-auto space-y-3">
              <p className="text-sm">
                <span className="font-bold text-blue-600">Rahul:</span> What a
                shot by Kohli! 🏏
              </p>
              <p className="text-sm">
                <span className="font-bold text-red-600">Sam:</span> Australia
                needs a wicket now.
              </p>
              <p className="text-sm">
                <span className="font-bold text-green-600">CricketFan:</span>{" "}
                The pitch is looking dry.
              </p>
            </div>
            <div className="p-2 bg-white border-t">
              <input
                type="text"
                placeholder="Join the conversation..."
                className="w-full bg-gray-50 p-2 rounded border focus:outline-none text-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
