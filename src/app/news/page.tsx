'use client';
import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import NewsNavbar from "./navbarNews";

export default function News() {
  const [activeTab, setActiveTab] = useState<string>("articles");
  const [country, setCountry] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("newest");
  const [language, setLanguage] = useState<string>("en"); // Default language is English


  return (
    <div className="flex flex-col min-h-screen bg-gray-200" >
      <Navbar locale={language} setLocale={setLanguage} />
      news page content
    </div>
  );
}