'use client';
import { useState, useEffect } from "react";
import ContentList from "./contentList";
import FilterBar from "./contentFilterBar";
import FloatingMenu from "./FloatingMenu";
import { fetchContentData, ContentItem } from "./contentData";
import Navbar from "../../components/Navbar";

export default function News() {
  const [articles, setArticles] = useState<ContentItem[]>([]);
  const [magazines, setMagazines] = useState<ContentItem[]>([]);
  const [podcasts, setPodcasts] = useState<ContentItem[]>([]);
  const [videos, setVideos] = useState<ContentItem[]>([]);
  const [activeTab, setActiveTab] = useState<string>("articles");
  const [country, setCountry] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("newest");
  const [language, setLanguage] = useState<string>("en"); // Default language is English

  useEffect(() => {
    const loadContentData = async () => {
      const { articles, magazines, podcasts, videos } = await fetchContentData();
      setArticles(articles);
      setMagazines(magazines);
      setPodcasts(podcasts);
      setVideos(videos);
    };
    loadContentData();
  }, []);

  console.log('|----> articles', articles);
  const handleSort = (content: ContentItem[]) => {
    switch (sortOrder) {
      case "newest":
        return content.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      case "oldest":
        return content.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      case "alphabetical":
        return content.sort((a, b) => a.title[language].localeCompare(b.title[language]));
      case "mostViewed":
        return content.sort((a, b) => b.views - a.views);
      default:
        return content;
    }
  };


  const filteredContent = (content: ContentItem[]) =>
    content
      .filter((item) => country === "all" || item.country === country)
      .filter((item) => 
        item.title[language]?.toLowerCase().includes(searchTerm.toLowerCase())
      );

  const sortedContent = handleSort(filteredContent(activeTab === "articles" ? articles : activeTab === "magazines" ? magazines : activeTab === "podcasts" ? podcasts : videos));

  console.log('|----> sorted content', sortedContent);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar locale={language} setLocale={setLanguage} />
      <div className="flex-grow">
        <h1 className="text-3xl font-bold p-4">Mining News</h1>
          <div className="px-2">
            <FilterBar
              country={country}
              setCountry={setCountry}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
              language={language}
              setLanguage={setLanguage}
            />
        </div>
        
        <div className="">
          <ContentList content={sortedContent} language={language} />
        </div>
      </div>
      <FloatingMenu activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}