'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { fetchContentData, ContentItem } from '../contentData';
import Navbar from '../../../components/Navbar';

export default function ArticlePage() {
  const [articleData, setArticleData] = useState<ContentItem | null>(null);
  const [language, setLanguage] = useState<string>('en'); // Default language is English
  const router = useRouter();
  const params = useParams();
  const { article } = params; // Access the dynamic article ID from the URL

  useEffect(() => {
    const loadArticleData = async () => {
      const { articles } = await fetchContentData();
      const selectedArticle = articles.find((item) => item.id === Number(article));
      setArticleData(selectedArticle || null);
    };
    if (article) {
      loadArticleData();
    }
  }, [article]);

  if (!articleData) return <div>Loading...</div>;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar locale={language} setLocale={setLanguage} />
      <div className="flex-grow p-4">
        <button
          onClick={() => router.back()}
          className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Back
        </button>
        <h1 className="text-3xl font-bold">{articleData.title[language] || articleData.title['en']}</h1>
        <div className="my-4">
          <p className="text-gray-500">Published on: {articleData.date} | Views: {articleData.views}</p>
        </div>
        <div className="bg-gray-300 rounded-md p-4">
          <p>Image</p>
        </div>
        <div className="mt-4">
          <p>{articleData.content[language] || articleData.content['en']}</p>
        </div>
      </div>
    </div>
  );
}