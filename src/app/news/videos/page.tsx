'use client';

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Navbar from "../../../components/Navbar";
import FloatingMenu from "../FloatingMenu";
import VideoFilterBar from "./VideosFilterBar";

interface VideoContent {
  id: number;
  category: string;
  language: string;
  title: string;
  content: string;
  thumbnail: string;
  tags: string[];
  status: string;
  views: number;
  platform: string;
  date: string;
  country: string;
  publisher: string;
}

export default function VideosDisplayPage() {
  const [Videos, setVideos] = useState<VideoContent[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<VideoContent[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [country, setCountry] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<string>("newest");
  const [language, setLanguage] = useState<string>("en-GB"); // Default language is English
  const router = useRouter();
  const fetchVideos = async () => {
    try {
      const response = await axios.get<VideoContent[]>('http://192.168.1.3:8000/news/videos/api/');
      setVideos(response.data);
      setFilteredVideos(response.data); // Initialize filteredVideos with all Videos
    } catch (error) {
      console.error('Error fetching Videos:', error);
    }
  };
  useEffect(() => {
    
    fetchVideos();
  }, []);

  const handleSort = (content: VideoContent[]) => {
    switch (sortOrder) {
      case "newest":
        return content.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      case "oldest":
        return content.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      case "alphabetical":
        return content.sort((a, b) => a.title.localeCompare(b.title));
      case "mostViewed":
        return content.sort((a, b) => b.views - a.views);
      default:
        return content;
    }
  };

  const filterVideos = () => {
    const filtered = Videos
      .filter((item) => country === "all" || item.country === country)
      .filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
    setFilteredVideos(handleSort(filtered));
  };

  useEffect(() => {
    filterVideos();
  }, [searchTerm, country, sortOrder, Videos]);

  const handleMagazineClick = (Id: number) => {
    router.push(`/news/videos/${Id}`); // Navigate to the Magazine detail page
  };


  return (
    <div className="flex flex-col min-h-screen bg-gray-200 text-black">
      <Navbar locale={language} setLocale={setLanguage} />
      <div className="flex-grow mb-[50px] mt-4">
        <div className="px-2">
          <VideoFilterBar
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

        {/* Display Videos */}
        <div className="p-2 flex flex-wrap justify-around">
          {filteredVideos.map((video) => (
            <div key={video.id} 
              className="w-[48%] bg-white p-1 rounded-md
                 sm:w-[23%] md:w-[32%] lg:w-[18%] mb-4">
                {/* Image */}
                <div className="w-[100%] h-[100px] md:h-[150px] lg:h-[200px] bg-gray-300 rounded-t-md mb-2"
                  onClick={() => handleMagazineClick(video.id)}
                >
                  {video.thumbnail ? (
                    <Image
                      src={video.thumbnail}
                      alt={video.title || "Magazine Image"}
                      width={900}
                      height={1650}
                      className="rounded-t-md object-cover h-[100%]"
                    />
                  ) : (
                    <div className="bg-gray-400 w-full h-full rounded-md flex items-center justify-center">
                      No Image
                    </div>
                  )}
                </div>

                {/* Magazine Info */}
                <div className="w-[100%] px-3 pb-2">
                  <h2 
                    className="text-[12px] font-semibold md:text-[10px]" 
                    onClick={() => handleMagazineClick(video.id)}
                  >
                    {video.title || 'Title not available'}
                  </h2>
                  
                  <p className="text-[10px] text-gray-500">Date: {video.date} | Views: {video.views}</p>
                </div>
            </div>
          ))}
        </div>
      </div>
      <FloatingMenu />
    </div>
  );
}