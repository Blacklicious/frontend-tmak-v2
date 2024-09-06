import React, { useState, useEffect } from 'react';
import { Button, Modal } from "antd";
import axios from 'axios';

interface Article {
  id: number;
  title: { [key: string]: string }; // Title is now an object with language keys
  content: { [key: string]: string }; // Content is also an object with language keys
  tags: string;
}


interface TmakActualityProps {
  locale: string;
  setLocale: (locale: string) => void;
}

const TmakActuality: React.FC<TmakActualityProps> = ({ locale, setLocale }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  // const [locale, setLocale] = useState<string>("en"); // Assume the default language is English

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get<Article[]>('http://192.168.1.4:8000/api/v1/news/articles/');
        const filteredArticles = response.data.filter(article => article.tags.includes("T-MAK")).slice(0, 12);
        setArticles(filteredArticles);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);

  const showModal = (article: Article) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='flex flex-wrap justify-center items-center w-[100%]'>
      <div className='w-max text-[43px] font-extrabold text-center mt-2 text-black
         rounded-md'>
        Actualité T-MAK
      </div>
      <div className='w-[100%] '>
        <div className="h-[70vh] overflow-y bg-gray-200 px-1 py-2 mb-1 rounded-md
          w-[100%] flex flex-wrap justify-between">
          {articles.map(article => (
            <div
              key={article.id}
              className='mb-3 h-[220px] lg:h-[300px] w-[100%] md:w-[450px] bg-gray-300 rounded-md p-1 cursor-pointer'
              onClick={() => showModal(article)}
            >
              <div className='h-[100%] bg-gray-400 rounded-md '>
                {/* Placeholder for image */}
              </div>
              <div className='h-[80px] bg-black/40 rounded-md mt-[-80px]  px-2 pt-1 text-white'>
                {article.title[locale]?.slice(0, 109) || article.title['en']?.slice(0, 90) || 'Title not available'}
              </div>
            </div>
          ))}
        </div>
        <Modal
          title={selectedArticle?.title[locale] || selectedArticle?.title['en'] || 'Title not available'}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          width={1000}
        >
          <div>{selectedArticle?.content[locale] || selectedArticle?.content['en'] || 'Content not available'}</div>
        </Modal>
      </div>
    </div>
  );
}

export default TmakActuality;