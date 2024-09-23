'use client';
import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
import ArticleManagerPage from '../articles-board/managers/page';
import NavbarProfile from '../../navbarProfiles'
import ManagersNavbar from '../navbarManagers'
import Navbar from '@/components/Navbar';

interface Article {
  id: number;
  category: string;
  title: string;
  content: string;
  tags: string[];
  status: string;
  images: string[];
}

const ArticlePage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [locale, setLocale] = useState<string>('en');
  return (
    <div className="w-[100%]  flex flex-col bg-gray-100">
      < Navbar locale='en' setLocale={setLocale} />
      <div className='p-4 flex flex-col'>
        < ManagersNavbar />
      </div>
      < ArticleManagerPage />
      <NavbarProfile />
    </div>
  );
};

export default ArticlePage;