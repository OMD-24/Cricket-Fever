import React, { useState, useEffect } from "react";
import NewsCard from "../components/Sections/NewsCard";

const News = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/news/latest");
        if (response.ok) {
          const result = await response.json();
          setArticles(result.data || []);
        }
      } catch (error) {
        console.error("Failed to fetch news headlines:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-white mt-16 max-w-7xl mx-auto">
      <div className="flex-[0.7] border-r border-gray-100 h-full flex flex-col">
        <header className="p-4 bg-white border-b border-gray-100 sticky top-0 z-10">
          <h2 className="text-xl font-black italic uppercase tracking-tighter">
            Headline News
          </h2>
        </header>

        <div className="flex-1 overflow-y-auto p-4 space-y-8 no-scrollbar pb-24">
          {articles.length > 0 && (
            <div className="group cursor-pointer">
              <div className="w-full h-72 bg-gray-900 rounded-3xl overflow-hidden border-2 border-black relative shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-transform hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-90"></div>
                <div className="absolute bottom-0 p-6">
                  <span className="bg-red-600 text-white text-[10px] font-black px-3 py-1 uppercase rounded-full">
                    {articles[0].category || "Breaking"}
                  </span>
                  <h1 className="text-white text-3xl font-black italic uppercase leading-tight mt-2 group-hover:underline">
                    {articles[0].title}
                  </h1>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {loading ? (
              <div className="col-span-2 text-center py-10 font-black italic text-gray-400 animate-pulse uppercase">
                Fetching Latest Headlines...
              </div>
            ) : (
              articles
                .slice(1)
                .map((item, index) => <NewsCard key={index} news={item} />)
            )}
          </div>

          {!loading && articles.length === 0 && (
            <div className="text-center py-20 font-black italic text-gray-300 uppercase">
              No recent reports from the stadium.
            </div>
          )}
        </div>
      </div>

      <aside className="flex-[0.3] hidden lg:flex flex-col h-full bg-gray-50 p-4">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 text-gray-400">
          Quick Singles
        </h3>

        <div className="space-y-6">
          {articles.slice(0, 3).map((item, i) => (
            <div
              key={i}
              className="border-l-4 border-black pl-4 py-1 cursor-pointer hover:bg-white transition-all group"
            >
              <p className="text-[10px] font-bold text-blue-600 uppercase">
                {item.category}
              </p>
              <h4 className="text-xs font-black uppercase italic mt-1 leading-snug group-hover:text-red-600">
                {item.title}
              </h4>
            </div>
          ))}
        </div>

        <div className="mt-10 p-5 bg-black rounded-2xl border-b-4 border-red-600 shadow-xl">
          <h3 className="text-white font-black italic text-sm uppercase">
            The Pitch Report
          </h3>
          <p className="text-gray-400 text-[10px] mt-1 uppercase font-bold tracking-tight">
            Get every wicket update in your inbox.
          </p>
          <button className="w-full bg-white text-black font-black text-[10px] uppercase py-2.5 rounded-lg mt-4 hover:bg-red-600 hover:text-white transition-all transform active:scale-95">
            Subscribe Now
          </button>
        </div>
      </aside>
    </div>
  );
};

export default News;