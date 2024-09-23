'use client';
import React, { useEffect, useState } from 'react';
import { Button, Drawer, message } from 'antd';
import CreatePage from '../../articles-board/managers/create/page';
import ListSection from './list';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface Article {
  id: number;
  category: string;
  title: string;
  content: string;
  tags: string[];
  status: string;
  images: string[];
}

const ArticleManagerPage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [locale, setLocale] = useState<string>('fr');
  const router = useRouter(); // Initialize the router for navigation
  // Function to verify token and handle session expiration
  const checkTokenValidity = async () => {
    try {
      const token = sessionStorage.getItem('access_token');
      if (!token) {
        throw new Error('No token found');
      }

      // Verify token with API
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/api/get/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200) {
        throw new Error('Invalid token');
      }

      // Token is valid, continue rendering the page
    } catch (error) {
      // Token is invalid, clear session storage and redirect to login
      message.error('Session expired. Please log in again.');
      sessionStorage.clear(); // Clear all session data
      router.push('/users/login/'); // Redirect to the login page
    }
  };

  // Check token validity when the component mounts
  useEffect(() => {
    checkTokenValidity();
  }, []);



  return (
    <div className="w-[100%]  flex flex-col p-2">
      < CreatePage />
      < ListSection locale='fr'/>
    </div>
  );
};

export default ArticleManagerPage;