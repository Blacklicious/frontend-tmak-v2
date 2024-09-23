'use client';

import React from 'react';

interface VideosFilterBarProps {
  country: string;
  setCountry: (value: string) => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  sortOrder: string;
  setSortOrder: (value: string) => void;
  language: string;
  setLanguage: (value: string) => void;
}

const VideosFilterBar: React.FC<VideosFilterBarProps> = ({
  country,
  setCountry,
  searchTerm,
  setSearchTerm,
  sortOrder,
  setSortOrder,
  language,
  setLanguage,
}) => {
  return (
    <div className="w-full bg-white p-4 mb-4 rounded-md shadow-md">
      <div className="flex flex-wrap justify-between items-center">
        {/* Country Filter */}
        <div className="w-full md:w-[30%] mb-4 md:mb-0">
          <label className="block text-sm font-semibold mb-1">Country:</label>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full p-2 border rounded-md bg-gray-100"
          >
            <option value="all">All Countries</option>
            <option value="mali">Mali</option>
            <option value="senegal">Senegal</option>
            <option value="guinea">Guinea</option>
            <option value="niger">Niger</option>
            <option value="burkina">Burkina Faso</option>
            {/* Add more countries as needed */}
          </select>
        </div>

        {/* Search Bar */}
        <div className="w-full md:w-[30%] mb-4 md:mb-0">
          <label className="block text-sm font-semibold mb-1">Search:</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title..."
            className="w-full p-2 border rounded-md bg-gray-100"
          />
        </div>

        {/* Sort Order */}
        <div className="w-full md:w-[30%] mb-4 md:mb-0">
          <label className="block text-sm font-semibold mb-1">Sort By:</label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="w-full p-2 border rounded-md bg-gray-100"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="alphabetical">Alphabetical</option>
            <option value="mostViewed">Most Viewed</option>
          </select>
        </div>

        {/* Language Selector */}
        <div className="w-full md:w-[30%] mt-4">
          <label className="block text-sm font-semibold mb-1">Language:</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full p-2 border rounded-md bg-gray-100"
          >
            <option value="en-GB">English</option>
            <option value="fr-FR">French</option>
            <option value="es-ES">Spanish</option>
            <option value="ar">Arabic</option>
            <option value="zh-cn">Chinese</option>
            <option value="pt">Portuguese</option>
            <option value="de">German</option>
            <option value="ru">Russian</option>
            <option value="ja">Japanese</option>
            <option value="hi">Hindi</option>
            {/* Add more languages as needed */}
          </select>
        </div>
      </div>
    </div>
  );
};

export default VideosFilterBar;