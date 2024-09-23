'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Navbar from '../../../../components/Navbar';
import Image from 'next/image';

interface Audio {
  id: number;
  audio: string;
  language: string;
}

interface ArticleImage {
  id: number;
  image: string;
  caption: string;
}

interface ContentParagraph {
  title: string;
  content: string;
}

interface Article {
  id: number;
  category: string;
  title: { [key: string]: string };
  content_introduction: { [key: string]: string };
  content: { [key: string]: ContentParagraph[] };
  content_conclusion: { [key: string]: string };
  tags: string[];
  total_views: number;
  total_likes: number;
  total_dislikes: number;
  total_saves: number;
  total_shares: number;
  total_comments: number;
  total_reports: number;
  platform: string;
  created_at: string;
  created_from: string;
  status: string;
  images: ArticleImage[];
  audios: Audio[];
}

export default function ArticleDetailPage({ params }: { params: { id: number } }) {
  const [articleDetails, setArticleDetails] = useState<Article | null>(null);
  const [language, setLanguage] = useState<string>('fr-FR'); // Default language is French
  const router = useRouter();

  // Fetch article by ID
  const fetchArticle = async () => {
    try {
      const response = await axios.get<Article[]>(`http://192.168.1.3:8000/news/article/${params.id}/api/`);
      if (response.data.length > 0) {
        setArticleDetails(response.data[0]); // Access the first object from the array
        console.log('article Details ------>', response.data[0]);
      } else {
        console.error('No article found.');
      }
    } catch (error) {
      console.error('Error fetching article:', error);
    }
  };

  useEffect(() => {
    fetchArticle();
  }, [params.id]);

  if (!articleDetails) return <div>Loading...</div>;

  // Safely access article content based on the current language or fall back to 'en-GB'
  const articleTitle = articleDetails.title[language] || articleDetails.title['en-GB'] || 'Title not available';
  const articleIntroduction = articleDetails.content_introduction[language] || articleDetails.content_introduction['en-GB'] || 'Introduction not available';
  const articleContent = articleDetails.content[language] || articleDetails.content['en-GB'] || [];
  const articleConclusion = articleDetails.content_conclusion[language] || articleDetails.content_conclusion['en-GB'] || 'Conclusion not available';

  return (
    <div className="flex flex-col min-h-screen bg-gray-200">
      <Navbar locale={language} setLocale={setLanguage} />
      <div className="flex-grow">
        {articleDetails.images?.length > 0 && (
        <div
          className="bg-cover bg-center h-[50vh] w-full flex flex-col justify-between px-2 py-3"
          style={{ backgroundImage: `url(${articleDetails.images[0].image})` }}
        >
          <button
            className=" px-4 py-1 bg-black/80 text-white rounded-md w-[25%]"
            onClick={() => router.back()}
          >
            Back
          </button>
          
        </div>
        )}
        <div className='bg-black/80 p-3 text-white'>
          {/* Article Title */}
          <h1 className="text-lg font-bold">{articleTitle}</h1>
          {/* Article Meta Information */}
          <div className="my-2 text-sm text-gray-500">
            <p>Published on: {articleDetails.created_at} | Views: {articleDetails.total_views}</p>
            <p>Category: {articleDetails.category} | Platform: {articleDetails.platform}</p>
            {/* Audio for the article */}
            {articleDetails.audios[0] && articleDetails.audios.some(audio => audio.language === language) && (
              <audio controls className="mt-4 w-[100%] bg-white/90 shadow-md rounded-xl">
                <source src={articleDetails.audios[0].audio} type="audio/mp3" />
                Your browser does not support the audio element.
              </audio>
            )}
          </div>
        </div>
        <div className='px-4 text-black'>
          {/* Article Introduction */}
          <div className="my-4">
            <p>{articleIntroduction}</p>
          </div>
          {/* Article Content Paragraphs */}
          <div className="my-4">
            {Array.isArray(articleContent) &&
              articleContent.map((paragraph, index) => (
                <div key={index}>
                  {paragraph.title && <h3 className="text-lg font-semibold">{paragraph.title}</h3>}
                  <p className='my-4'>{paragraph.content}</p>
                </div>
              ))}
          </div>
          {/* Article Conclusion */}
          <div className="my-4">
            <h2 className="text-xl font-semibold">Conclusion</h2>
            <p>{articleConclusion}</p>
          </div>
        </div>
      </div>
    </div>
  );
}