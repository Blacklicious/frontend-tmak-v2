import React from 'react';
import { Card, Button } from 'antd';

interface Article {
  id: number;
  category: string;
  title: string;
  content: string;
  tags: string[];
  status: string;
  images: string[];
}

interface SectionDisplayProps {
  articles: Article[];
  onEditClick: (article: Article) => void;
}

const SectionDisplay: React.FC<SectionDisplayProps> = ({ articles, onEditClick }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {articles.map((article) => (
        <Card
          key={article.id}
          title={article.title}
          extra={
            <Button type="link" onClick={() => onEditClick(article)}>
              Edit
            </Button>
          }
        >
          <p><strong>Category:</strong> {article.category}</p>
          <p>{article.content}</p>
          <p><strong>Tags:</strong> {article.tags.join(', ')}</p>
          <p><strong>Status:</strong> {article.status}</p>
          <div className="flex flex-wrap">
            {article.images.map((image, index) => (
              <img key={index} src={image} alt={`article-${index}`} className="w-16 h-16 m-1" />
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default SectionDisplay;
