import React from 'react';
import { Drawer } from 'antd';
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

interface SectionEditProps {
  article: Article | null;
  visible: boolean;
  onClose: () => void;
  updateArticle: (article: Article) => void;
}

const SectionEdit: React.FC<SectionEditProps> = ({ article, visible, onClose, updateArticle }) => {
  return (
    <Drawer
      title="Edit Article"
      placement="right"
      onClose={onClose}
      visible={visible}
      width={400}
    >
      {article && (
        <ArticleForm
          initialValues={article}
          onSubmit={updateArticle}
          submitButtonText="Update Article"
        />
      )}
    </Drawer>
  );
};

export default SectionEdit;
