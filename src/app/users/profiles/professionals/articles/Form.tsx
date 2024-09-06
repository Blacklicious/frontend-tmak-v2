import React, { useState } from 'react';
import { Button, Input, Select, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import FormContent from './FormContent';

const { TextArea } = Input;
const { Option } = Select;

interface Article {
  id: number;
  category: string;
  title: string;
  content: string;
  tags: string[];
  status: string;
  images: string[];
  language: string; // Add language property
}


interface ArticleFormProps {
  initialValues?: Partial<Article>; // Initial values for editing
  onSubmit: (article: Article) => void;
  submitButtonText?: string;
}

const ArticleForm: React.FC<ArticleFormProps> = ({ initialValues = {}, onSubmit, submitButtonText = "Add Article" }) => {
  const [category, setCategory] = useState(initialValues.category || 'Mining');
  const [title, setTitle] = useState(initialValues.title || '');
  const [content, setContent] = useState(initialValues.content || '');
  const [tags, setTags] = useState(initialValues.tags?.join(', ') || '');
  const [status, setStatus] = useState(initialValues.status || 'Draft');
  const [images, setImages] = useState<string[]>(initialValues.images || []);
  const [language, setLanguage] = useState(initialValues.language || 'English'); // Language state

  

  const handleImageUpload = ({ fileList }: any) => {
    setImages(fileList.map((file: any) => file.url || URL.createObjectURL(file.originFileObj)));
  };

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };

  const handleSubmit = () => {
    const article: Article = {
      id: initialValues.id || Date.now(), // Use existing ID or create a new one
      category,
      title,
      content,
      tags: tags.split(',').map(tag => tag.trim()),
      status,
      images,
      language,
    };
    onSubmit(article);
  };

  return (
    <div className=" bg-white flex flex-col">
      <h2 className="text-lg font-semibold mb-4">{submitButtonText}</h2>
      <Select value={category} onChange={setCategory} className="mb-2 w-full hidden">
        <Option value="Mining">Mining</Option>
        <Option value="Technology">Technology</Option>
        <Option value="Business">Business</Option>
        {/* Add more categories as needed */}
      </Select>
      <Select value={language} onChange={setLanguage} 
        className="mb-2 w-full ">
        <Option value="English">English</Option>
        <Option value="French">French</Option>
        <Option value="Spanish">Spanish</Option>
        {/* Add more languages as needed */}
      </Select>
      <TextArea rows={3}
        placeholder="Article Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mb-2 "
      />
      {/* Content Editor Component */}
      < FormContent onContentChange={handleContentChange} />

      <Input
        placeholder="Tags (comma-separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        className="mb-2"
      />
      <Select value={status} onChange={setStatus} className="mb-2 w-full">
        <Option value="Draft">Draft</Option>
        <Option value="Published">Published</Option>
        <Option value="Archived">Archived</Option>
      </Select>
      <Upload listType="picture-card" onChange={handleImageUpload} 
        className="mb-2 w-[100%]">
        <Button icon={<UploadOutlined />}>Upload Image</Button>
      </Upload>
      <Button type="primary" onClick={handleSubmit}>
        {submitButtonText}
      </Button>
    </div>
  );
};

export default ArticleForm;
