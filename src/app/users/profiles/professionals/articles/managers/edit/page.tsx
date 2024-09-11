// EditArticle.tsx
import React from 'react';
import { Drawer, Form, Input, Button, message, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import ContentEditor from './paragraphs/page'; // Import the new ContentEditor

interface Article {
  id: number;
  category: string;
  title: { [key: string]: string };
  content_introduction: { [key: string]: string };
  content: { [key: string]: { title: string; content: string }[] };
  content_conclusion: { [key: string]: string };
  images: { id: number; image: string }[];
  tags: string[];
}

interface EditArticleProps {
  visible: boolean;
  article: Article | null;
  onClose: () => void;
  onSave: () => void;
  locale: string;
}

const EditArticle: React.FC<EditArticleProps> = ({ visible, article, onClose, onSave, locale }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = React.useState<any[]>([]);
  const [contentSections, setContentSections] = React.useState<{ title: string; content: string }[]>([]);

  const onSubmit = async (values: any) => {
    try {
      const updatedValues = { ...values, content: contentSections }; // Add content sections to the form data
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/news/article/${article?.id}/api`, values);
      message.success('Article updated successfully!');
      onSave(); // Notify the parent to refresh the articles
      onClose(); // Close the drawer
    } catch (error) {
      message.error('Failed to update the article');
    }
  };

  const handleImageChange = ({ fileList: newFileList }: any) => {
    setFileList(newFileList);
  };

  React.useEffect(() => {
    if (article) {
      form.setFieldsValue({
        title: article.title[locale] || article.title.en || '',
        category: article.category,
        content_introduction: article.content_introduction[locale] || article.content_introduction.en || '',
        content: article.content[locale] ? article.content[locale].map(section => section.content).join('\n\n') : '',
        content_conclusion: article.content_conclusion[locale] || article.content_conclusion.en || '',
        tags: article.tags.join(', '),
      });
      setFileList(article.images.map(image => ({
        uid: image.id,
        name: image.image.split('/').pop(),
        status: 'done',
        url: image.image,
      })));
    }
  }, [article, locale]);

  return (
    <Drawer
      title={`Edit Article ${article?.id}`}
      width={900}
      onClose={onClose}
      open={visible}
    >
      <Form form={form} layout="vertical" onFinish={onSubmit}>
        
      <Form.Item label="Images">
          <Upload
            listType="picture"
            fileList={fileList}
            onChange={handleImageChange}
            beforeUpload={() => false}  // Prevent auto-upload
          >
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item name="title" label="Title">
          <Input placeholder="Enter article title" />
        </Form.Item>

        <Form.Item name="category" label="Category">
          <Input placeholder="Enter article category" />
        </Form.Item>

        <Form.Item name="content_introduction" label="Introduction">
          <Input.TextArea rows={4} placeholder="Enter article introduction" />
        </Form.Item>


        <Form.Item label="Content">
          <ContentEditor 
            initialContent={article?.content[locale] || []} 
            onChange={(updatedContent) => setContentSections(updatedContent)} 
          />
        </Form.Item>


        <Form.Item name="content_conclusion" label="Conclusion">
          <Input.TextArea rows={4} placeholder="Enter article conclusion" />
        </Form.Item>

        <Form.Item name="tags" label="Tags">
          <Input placeholder="Enter tags, separated by commas" />
        </Form.Item>


        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default EditArticle;