'use client';

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Navbar from "../../../components/Navbar";
import FloatingMenu from "../FloatingMenu";
import ArticleFilterBar from "./articlesFilterBar";

// Define the structure for ArticleContent
interface ArticleContent {
  id: number;
  category: string;
  title: { [key: string]: string };
  content_introduction: { [key: string]: string };
  content: { [key: string]: { title: string; content: string }[] };
  content_conclusion: { [key: string]: string };
  tags: string[];
  status: string;
  views: number;
  platform: string;
  date: string;
  country: string;
  publisher: string;
  images: { id: number; image: string; caption: string }[];
  audios: { id: number; audio: string; language: string }[];
}

export default function ArticlesDisplayPage() {
  const [articles, setArticles] = useState<ArticleContent[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<ArticleContent[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [country, setCountry] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<string>("newest");
  const [language, setLanguage] = useState<string>("en-GB"); // Default language is English
  const router = useRouter();

  useEffect(() => {
    // Fetch articles from the API
    const fetchArticles = async () => {
      try {
        const response = await axios.get<ArticleContent[]>('http://192.168.1.3:8000/news/articles-full/api/');
        setArticles(response.data);
        console.log(response.data);
        setFilteredArticles(response.data); // Initialize filteredArticles with all articles
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };
    fetchArticles();
  }, []);

  // Handle sorting logic
  const handleSort = (content: ArticleContent[]) => {
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

  // Handle filtering and search
  const filterArticles = () => {
    const filtered = articles
      .filter((item) => country === "all" || item.country === country)
      .filter((item) => item.title[language]?.toLowerCase().includes(searchTerm.toLowerCase()) || item.title['en']?.toLowerCase().includes(searchTerm.toLowerCase()));
    
    setFilteredArticles(handleSort(filtered));
  };

  // Update filtered articles whenever searchTerm, country, or sortOrder changes
  useEffect(() => {
    filterArticles();
  }, [searchTerm, country, sortOrder, articles]);

  const handleArticleClick = (id: number) => {
    router.push(`/news/articles/${id}`); // Navigate to the article detail page
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-200 text-black">
      <Navbar locale={language} setLocale={setLanguage} />
      <div className="flex-grow mb-[50px] mt-4">
        
        {/* Filter and Search Bar */}
        <div className="px-2">
          <ArticleFilterBar
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

        {/* Display Articles */}
        <div className="p-2 flex flex-wrap justify-around">
          {filteredArticles.map((article) => (
            <div 
              key={article.id} 
              className="mb-6  bg-white border-b border-[3px]
                rounded-xl hover:shadow-md transition duration-300 ease-in-out
                 flex flex-wrap justify-between cursor-pointer
                xs:w-[90%]
                sm:w-[48%]
                md:w-[32%] 
                xl:w-[18%] 
              "
            >
              {/* Image */}
              <div className="w-[100%] bg-gray-300 rounded-t-md mb-2"
                onClick={() => handleArticleClick(article.id)}
              >
                {article.images[0] ? (
                  <Image
                    src={article.images[0].image}
                    alt={article.images[0].caption || "Article Image"}
                    width={1000}
                    height={650}
                    className="rounded-t-md object-cover"
                  />
                ) : (
                  <div className="bg-gray-400 w-full h-full rounded-md flex items-center justify-center">
                    No Image
                  </div>
                )}
              </div>

              {/* Article Info */}
              <div className="w-[100%] px-3 pb-2">
                <h2 
                  className="text-[14px] font-semibold md:text-[10px]" 
                  onClick={() => handleArticleClick(article.id)}>
                  {article.title[language] || article.title['en'] || 'Title not available'}
                </h2>
                <p className="my-1 text-[12px] md:text-[9px]" onClick={() => handleArticleClick(article.id)}>
                  {article.content[language]?.[0]?.content.slice(0, 100) || article.content['en']?.[0]?.content.slice(0, 100) || 'Content not available'}...
                </p> {/* Show a snippet of the content */}
                <p className="text-sm text-gray-500">Date: {article.date} | Views: {article.views}</p>
                {article.audios[0] && article.audios.some(audio => audio.language === language) && (
                  <audio controls className="mt-2 w-[100%]">
                    {/* Find the audio that matches the selected language */}
                    <source src={article.audios.find(audio => audio.language === language)?.audio} type="audio/mp3" />
                    Your browser does not support the audio element.
                  </audio>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating menu for switching tabs */}
      <FloatingMenu />
    </div>
  );
}