'use client';

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Navbar from "../../../components/Navbar";
import FloatingMenu from "../FloatingMenu";
import MagazineFilterBar from "./MagazinesFilterBar";

interface MagazineContent {
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
  images: { id: number; image: string; caption: string }[];
  audios: { id: number; audio: string; language: string }[];
}

export default function MagazinesDisplayPage() {
  const [Magazines, setMagazines] = useState<MagazineContent[]>([]);
  const [filteredMagazines, setFilteredMagazines] = useState<MagazineContent[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [country, setCountry] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<string>("newest");
  const [language, setLanguage] = useState<string>("en-GB"); // Default language is English
  const router = useRouter();
  const fetchMagazines = async () => {
    try {
      const response = await axios.get<MagazineContent[]>('http://192.168.1.3:8000/news/magazines/api/');
      setMagazines(response.data);
      setFilteredMagazines(response.data); // Initialize filteredMagazines with all Magazines
    } catch (error) {
      console.error('Error fetching Magazines:', error);
    }
  };
  useEffect(() => {
    
    fetchMagazines();
  }, []);

  const handleSort = (content: MagazineContent[]) => {
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

  const filterMagazines = () => {
    const filtered = Magazines
      .filter((item) => country === "all" || item.country === country)
      .filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
    setFilteredMagazines(handleSort(filtered));
  };

  useEffect(() => {
    filterMagazines();
  }, [searchTerm, country, sortOrder, Magazines]);

  const handleMagazineClick = (Id: number) => {
    router.push(`/news/magazines/${Id}`); // Navigate to the Magazine detail page
  };


  return (
    <div className="flex flex-col min-h-screen bg-gray-200 text-black">
      <Navbar locale={language} setLocale={setLanguage} />
      <div className="flex-grow mb-[50px] mt-4">
        <div className="px-2">
          <MagazineFilterBar
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

        {/* Display Magazines */}
        <div className="p-2 flex flex-wrap justify-around">
          {filteredMagazines.map((magazine) => (
            <div key={magazine.id} 
              className="w-[48%] sm:w-[23%] md:w-[18%] lg:w-[15%] bg-white p-1 rounded-md">
                {/* Image */}
                <div className="w-[100%] xs:h-[200px] sm:h-[230px] md:h-[200px] lg:h-[230px] xl:h-[320px] 2xl:h-[380px] bg-gray-300 rounded-t-md mb-2"
                  onClick={() => handleMagazineClick(magazine.id)}
                >
                  {magazine.thumbnail ? (
                    <Image
                      src={magazine.thumbnail}
                      alt={magazine.title || "Magazine Image"}
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
                    onClick={() => handleMagazineClick(magazine.id)}
                  >
                    {magazine.title || 'Title not available'}
                  </h2>
                  
                  <p className="text-[10px] text-gray-500">Date: {magazine.date} | Views: {magazine.views}</p>
                </div>
            </div>
          ))}
        </div>
      </div>
      <FloatingMenu />
    </div>
  );
}