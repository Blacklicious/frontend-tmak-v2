'use client';
import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
import CreatePage from './create/page';
import SectionDisplay from './list';
import ListSection from './list';
import ArticleAudioGenerator from './audioGenerator';

interface Article {
  id: number;
  category: string;
  title: string;
  content: string;
  tags: string[];
  status: string;
  images: string[];
}

const ManagerPage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  


  return (
    <div className="w-[100%]  flex flex-col p-2">
      < CreatePage />
      < ListSection locale='fr'/>
      {/* Display list of articles */}
      < ArticleAudioGenerator />
    </div>
  );
};

export default ManagerPage;