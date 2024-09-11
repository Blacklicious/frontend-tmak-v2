'use client'; // Ensure this is a Client Component
import { useEffect, useState } from "react";
import { Carousel } from "antd";  // Import Carousel from antd
import Image from "next/image";
import ServiceSection from "../components/sectionService";
import Navbar from "../components/Navbar";
import TmakActuality from "../components/sectionTmakActuality";
import MiningNewsSection from "../components/sectionMiningNews";

interface Translations {
  tagline: string;
  latest_news: string;
  latest_news_description: string;
  market_analysis: string;
  market_analysis_description: string;
  technology: string;
  technology_description: string;
  interviews: string;
  interviews_description: string;
}

export default function Home() {
  const [locale, setLocale] = useState<string>("en");
  const [t, setT] = useState<Translations | null>(null);

  useEffect(() => {
    async function loadTranslations() {
      const res = await fetch(`/locales/${locale}.json`);
      const translations: Translations = await res.json();
      setT(translations);
    }

    loadTranslations();
  }, [locale]);

  if (!t) return <div className="">Loading...</div>;

  return (
    <main className=" w-[100%] p-2 ">
      <div className="">
        <Navbar locale={locale} setLocale={setLocale} /> {/* Pass locale and setLocale */}
        <div className="my-3 border-2 border-black bg-gray-200 w-[100%] p-2">
          {t.tagline}
        </div>
        < ServiceSection />
        
        <div className="my-3 rounded-md bg-white/80  w-[100%] px-2 py-1">
          <div className="">
            < TmakActuality locale={locale} setLocale={setLocale} />
          </div>
        </div>
        <div className="my-3 border-2 border-black bg-gray-200 w-[100%] p-1`">
          <div className="p-2">< MiningNewsSection /></div>
        </div>
        <div className="my-3 border-2 border-black bg-gray-200 w-[100%] p-2">
          Events
          <div className="p-2">(events this week)</div>
        </div>
        <div className="my-3 border-2 border-black bg-gray-200 w-[100%] p-2">
          Parteners
        </div>
        <div className="my-3 border-2 border-black bg-gray-200 w-[100%] p-2">footer</div>
      </div>
    </main>
  );
};