import React from 'react';

interface FilterBarProps {
  country: string;
  setCountry: (country: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  sortOrder: string;
  setSortOrder: (order: string) => void;
  language: string;
  setLanguage: (language: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
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
    <div className='p-[8px] bg-gray-100/30 border text-black flex flex-wrap
      justify-between items-center w-[100%] rounded-xl'>
      <div className='w-[100%]'>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
            className="border-[3px] bg-white p-2 rounded-md w-[100%] h-[40px] mb-[6px]"
        />
      </div>
      <div className='w-[36%]'>
        <label htmlFor="country-filter" className=" font-semibold"></label>
        <select
          id="country-filter"
          className="border-[3px] bg-white p-2 rounded-md w-[100%] h-[40px]"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        >
          <option value="all">All Countries</option>
          <option value="USA">USA</option>
          <option value="Canada">Canada</option>
          <option value="UK">UK</option>
          <option value="Australia">Australia</option>
          <option value="India">India</option>
          {/* Add more countries as needed */}
        </select>
      </div>
      <div className='w-[43%] '>
        <label htmlFor="sort-order" className=" font-semibold"></label>
        <select
          id="sort-order"
          className="border-[3px] bg-white p-2 rounded-md w-[100%] h-[40px]"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="newest">Newest to Oldest</option>
          <option value="oldest">Oldest to Newest</option>
          <option value="alphabetical">Alphabetical</option>
          <option value="mostViewed">Most Viewed</option>
        </select>
      </div>
      <div className=" w-[18%]  text-black">
        <label htmlFor="language" className=" font-semibold"></label>
        <select
          id="language"
          className="border p-2 w-[100%] h-[40px] rounded-md bg-white"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="en">EN</option>
          <option value="fr">FR</option>
          <option value="zh-cn">ZH-CN</option>
          <option value="ar">AR</option>
          <option value="es">ES</option>
          <option value="ru">RU</option>
          <option value="pt">PT</option>
          <option value="ja">JA</option>
          <option value="hi">HI</option>
          <option value="de">DE</option>
          {/* Add more languages as needed */}
        </select>
      </div>
    </div>
  );
};

export default FilterBar;