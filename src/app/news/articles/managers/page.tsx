'use client';
import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
import Navbar from "../../../../components/Navbar";
import ArticleForm from './Form';
import SectionDisplay from './sectionDisplay';

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
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [isDrawerVisible, setDrawerVisible] = useState(false);
  const [isAddDrawerVisible, setAddDrawerVisible] = useState(false);

  const [language, setLanguage] = useState<string>("en"); // Default language is English

  const addArticle = (article: Article) => {
    setArticles([...articles, article]);
    setAddDrawerVisible(false); // Close the drawer after adding the article
  };

  const updateArticle = (updatedArticle: Article) => {
    setArticles(
      articles.map((article) =>
        article.id === updatedArticle.id ? updatedArticle : article
      )
    );
    setDrawerVisible(false); // Close the drawer after editing the article
  };

  const handleEditClick = (article: Article) => {
    setEditingArticle(article);
    setDrawerVisible(true);
  };

  const handleAddClick = () => {
    setAddDrawerVisible(true);
  };

  const handleCloseDrawer = () => {
    setDrawerVisible(false);
    setEditingArticle(null);
  };

  const handleCloseAddDrawer = () => {
    setAddDrawerVisible(false);
  };

  return (
    <div className="w-[100%] h-[100vh] flex flex-col p-2">
      <Navbar locale={language} setLocale={setLanguage} />
      <div className="p-1 mt-4 w-[100%] bg-gray-200/30 text-xs py-2 rounded-lg flex overflow-x-auto">
        {/* Example categories, adjust as needed */}
        <div className="w-[80px] h-[88px] bg-blue-300 flex flex-col items-center justify-between p-[4px] rounded mx-2">
          <div className="h-[60px] w-[100%] bg-gray-200 rounded"></div> articles
        </div>
        <div className="w-[80px] h-[88px] bg-blue-300 flex flex-col items-center justify-between p-[4px] rounded mx-2">
          <div className="h-[60px] w-[100%] bg-gray-200 rounded"></div> Magazines
        </div>
        {/* Add more categories as needed */}
      </div>
      <div className="p-2 w-[100%] space-y-3">
        <h1>T-MAK Articles Management Page</h1>
        <Button type="primary" onClick={handleAddClick} style={{ marginBottom: '16px' , width: '100%', height:'40px' }}>
          Add New Article
        </Button>

        {/* Display list of articles */}
        <SectionDisplay articles={articles} onEditClick={handleEditClick} />

        {/* Drawer for Adding New Article */}
        <Drawer
          title="Add New Article"
          placement="right"
          onClose={handleCloseAddDrawer}
          open={isAddDrawerVisible}
          width={400}
        >
          <ArticleForm onSubmit={addArticle} submitButtonText="Add Article" />
        </Drawer>

        {/* Drawer for Editing Article */}
        <Drawer
          title="Edit Article"
          placement="right"
          onClose={handleCloseDrawer}
          open={isDrawerVisible}
          width={400}
        >
          {editingArticle && (
            <ArticleForm
              initialValues={editingArticle}
              onSubmit={updateArticle}
              submitButtonText="Update Article"
            />
          )}
        </Drawer>
      </div>
    </div>
  );
};

export default ArticleManagerPage;