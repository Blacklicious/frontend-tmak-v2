import React, { useEffect, useState } from 'react';
import { Card, Button, message, Modal } from 'antd';
import axios from 'axios';
import Image from 'next/image';
import EditArticle from './edit/page';


interface Article {
  id: number;
  category: string;
  title: { [key: string]: string }; // Title in multiple languages
  content_introduction: { [key: string]: string };
  content: { [key: string]: { title: string; content: string }[] };
  content_conclusion: { [key: string]: string };
  tags: string[];
  status: string;
  images: { id: number; image: string }[];
}

interface ArticleListSectionProps {
  locale: string;
}

const ArticleListSection: React.FC<ArticleListSectionProps> = ({ locale }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  // Fetch articles from the API
  const fetchArticles = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/news/articles-full/api/`);
      setArticles(response.data);
    } catch (error) {
      message.error('Failed to fetch articles');
    } finally {
      setLoading(false);
    }
  };


  // Show the edit drawer
  const showDrawer = (article: Article) => {
    setSelectedArticle(article);
    setDrawerVisible(true);
  };

  // Close the edit drawer
  const onClose = () => {
    setDrawerVisible(false);
    setSelectedArticle(null);
  };

  // Handle save and refresh articles
  const onSave = () => {
    fetchArticles();
  };
  // Handle article deletion
  const handleDelete = async (articleId: number) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this article?',
      okText: 'Yes, Delete',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          const token = sessionStorage.getItem('access_token');
          if (!token) {
            message.error('User not authenticated');
            return;
          }

          await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/news/article/${articleId}/delete/api/`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          message.success('Article deleted successfully');
          fetchArticles(); // Refresh the article list
        } catch (error) {
          message.error('Failed to delete article');
        }
      },
    });
  };


  useEffect(() => {
    fetchArticles();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="flex flex-wrap justify-around space-y-4">
      {articles.map((article) => {
        const title = article.title[locale] || article.title.en || 'Untitled';
        const introduction = article.content_introduction[locale] || article.content_introduction.en || '';
        const content = article.content[locale] || article.content.en || [];
        const conclusion = article.content_conclusion[locale] || article.content_conclusion.en || '';
        const truncateText = (text: string, maxLength: number) => {
          if (text.length <= maxLength) return text;
          return `${text.slice(0, maxLength)}...`;
        };
        return (
          <Card key={article.id} title={`Article ( ${article.id} )`}
            extra={<div>
              <Button onClick={() => showDrawer(article)} style={{ marginRight: 8 }}>
                Edit
              </Button>
              <Button danger onClick={() => handleDelete(article.id)}>
                Delete
              </Button>
            </div>} className='w-[100%] md:w-[45%] lg:w-[30%]'
          >
            <p><strong>Category:</strong> {article.category}</p>
            <div className='text-[15px] my-2 font-black'> {title}</div>
            {introduction && <div className='text-xs hidden md:block'><strong>Introduction:</strong> {introduction}</div>}
            {/* 
            {content.map((section, index) => (
              <div key={index}>
                {section.title && <h4>{section.title}</h4>}
                <p>{section.content}</p>
              </div>
            ))}
            {conclusion && <p><strong>Conclusion:</strong> {truncateText(conclusion, 200)}</p>}
            */}


            <p><strong>Tags:</strong> {article.tags.join(', ')}</p>
            <p><strong>Status:</strong> {article.status}</p>

            <div className="flex flex-wrap">
              {article.images.map((image, index) => (
                <Image key={index} src={`${image.image}`} alt={`article-${index}`} 
                  width={800} height={400}
                  className="w-[30%] h-16 m-1" />
              ))}
            </div>
          </Card>
        );
      })}
      < EditArticle 
        visible={drawerVisible}
        article={selectedArticle}
        onClose={onClose}
        onSave={onSave}
        locale={locale}
      />
    </div>
  );
};

export default ArticleListSection;