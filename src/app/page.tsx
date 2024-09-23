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
  const [locale, setLocale] = useState<string>("en-US");
  const [t, setT] = useState<Translations | null>(null);

  useEffect(() => {
    // Detect the user's OS language
  const navLanguage = navigator.language.slice(0, 2);

  // Check if sessionStorage has a stored language preference
  const storedLanguage = sessionStorage.getItem("language");

  if (storedLanguage) {
    setLocale(storedLanguage); // Use the stored language
  } else {
    // Define a map for language codes (e.g., en => en-US)
    const languageMap: { [key: string]: string } = {
      en: "en-US",
      fr: "fr-FR",
      es: "es-ES",
      pt: "pt-PT",
    };

    // Set the language if it's in the map, otherwise default to 'en-US'
    const detectedLanguage = languageMap[navLanguage] || "en-US";
    setLocale(detectedLanguage);

    // Optionally, you could store the detected language in sessionStorage
    sessionStorage.setItem("language", detectedLanguage);
  }

    console.log(navigator.language)
    async function loadTranslations() {
      const res = await fetch(`/locales/${locale}.json`);
      const translations: Translations = await res.json();
      setT(translations);
    }

    loadTranslations();
  }, [locale]);

  if (!t) return <div className="">Loading...</div>;

  return (
    <main className=" w-[100%] bg-gray-200 text-black">
      <Navbar locale={locale} setLocale={setLocale} /> {/* Pass locale and setLocale */}
      <div className="p-2 ">
        <div className="my-3 border-2 border-black bg-gray-100 w-[100%] p-2 rounded-lg">
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