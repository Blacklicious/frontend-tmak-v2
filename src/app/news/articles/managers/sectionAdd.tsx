import React from 'react';
import ArticleForm from './Form';

interface Article {
    id: number;
    category: string;
    title: string;
    content: string;
    tags: string[];
    status: string;
    images: string[];
  }
  
const SectionAdd: React.FC<{ addArticle: (article: Article) => void }> = ({ addArticle }) => {
  return (
    <ArticleForm
      onSubmit={addArticle}
      submitButtonText="Add Article"
    />
  );
};

export default SectionAdd;
