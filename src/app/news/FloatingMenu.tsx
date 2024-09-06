import React from 'react';

interface FloatingMenuProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const FloatingMenu: React.FC<FloatingMenuProps> = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white flex justify-around p-4">
      <button
        className={`focus:outline-none ${activeTab === "articles" ? "font-bold" : ""}`}
        onClick={() => setActiveTab("articles")}
      >
        Articles
      </button>
      <button
        className={`focus:outline-none ${activeTab === "magazines" ? "font-bold" : ""}`}
        onClick={() => setActiveTab("magazines")}
      >
        Magazines
      </button>
      <button
        className={`focus:outline-none ${activeTab === "podcasts" ? "font-bold" : ""}`}
        onClick={() => setActiveTab("podcasts")}
      >
        Podcasts
      </button>
      <button
        className={`focus:outline-none ${activeTab === "videos" ? "font-bold" : ""}`}
        onClick={() => setActiveTab("videos")}
      >
        Videos
      </button>
    </nav>
  );
};

export default FloatingMenu;