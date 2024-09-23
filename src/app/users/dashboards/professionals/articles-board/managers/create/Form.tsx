import React, { useState } from 'react';
import { Button, Input, Upload, Select, Form , message} from 'antd';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';

const { TextArea } = Input;
const { Option } = Select;

interface Image {
  category: string;
  article_id: number | null;
  file: string;
  caption: string;
  tags: string;
}

interface ArticleFormProps {
  onClose: () => void; // Accept the onClose prop
}

const ArticleForm: React.FC<ArticleFormProps> = ({ onClose }) => {
  // State variables
  const [category, setCategory] = useState('Mining');
  const [title, setTitle] = useState('');
  const [language, setLanguage] = useState('fr');
  const [contentIntroduction, setContentIntroduction] = useState('');
  const [contentParagraphs, setContentParagraphs] = useState<{ title: string; content: string }[]>([]);
  const [contentConclusion, setContentConclusion] = useState('');
  const [coverImages, setCoverImages] = useState<Image[]>([]);
  const [illustrations, setIllustrations] = useState<Image[]>([]);
  const [tags, setTags] = useState('mali, mining, gold');
  const [platform, setPlatform] = useState('t-mak.org');

  // Handle paragraph addition
  const addParagraph = () => {
    setContentParagraphs([...contentParagraphs, { title: '', content: '' }]);
  };

  // Handle paragraph change
  const handleParagraphChange = (index: number, field: 'title' | 'content', value: string) => {
    const updatedParagraphs = contentParagraphs.map((paragraph, i) =>
      i === index ? { ...paragraph, [field]: value } : paragraph
    );
    setContentParagraphs(updatedParagraphs);
  };

  // Handle paragraph deletion
  const deleteParagraph = (index: number) => {
    const updatedParagraphs = contentParagraphs.filter((_, i) => i !== index);
    setContentParagraphs(updatedParagraphs);
  };

  // Handle cover image upload
  const handleCoverImageUpload = ({ fileList }: any) => {
    const uploadedImages = fileList.map((file: any) => ({
      category: 'cover',
      article_id: null,
      file: file.originFileObj,  // Send the actual file
      caption: '',
      tags: 'cover-image',
    }));
    setCoverImages(uploadedImages);
  };

  // Handle illustration upload
  const handleIllustrationUpload = (index: number, { fileList }: any) => {
    const updatedIllustrations = fileList.map((file: any) => ({
      category: 'illustration',
      article_id: null,
      file: file.originFileObj,  // Send the actual file
      caption: '',
      tags: `p-${index + 1}`,
    }));

    const newIllustrations = [...illustrations, ...updatedIllustrations];
    setIllustrations(newIllustrations);
  };

  // Handle removing a cover image
  const handleCoverImageRemove = (file: any) => {
    setCoverImages((prevImages) =>
      prevImages.filter((img) => img.file !== file.originFileObj) // Remove the image by comparing the file object
    );
  };

  // Handle removing an illustration
  const handleIllustrationRemove = (index: number, file: any) => {
    const updatedIllustrations = illustrations.filter((img, i) => img.file !== file.originFileObj);
    setIllustrations(updatedIllustrations);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Concatenate all the content into one big content string
    const fullContent = `
      ${contentIntroduction}\n\n
      ${contentParagraphs.map((p) => `${p.title}\n${p.content}`).join('\n\n')}
      \n\n
      ${contentConclusion}
    `;
    // Check the total character length
    const contentLength = fullContent.length;

    // Block submission if content length exceeds 4000 characters
    if (contentLength > 4000) {
      message.error(`The content is too long. It has ${contentLength} characters. Please reduce it to 4000 characters or less.`);
      return; // Stop further execution
    }

    const articleData = {
      category,
      title: { [language]: title },
      language: language,
      content_introduction: { [language]: contentIntroduction },
      content: { [language]: contentParagraphs },
      content_conclusion: { [language]: contentConclusion },
      tags: tags.split(',').map((tag) => tag.trim()), // Split tags by comma and trim whitespace
      platform,
    };

    console.log('Article Data:', JSON.stringify(articleData, null, 2));
    try {
      // Step 1: Create the article and get the article ID
      const token = sessionStorage.getItem('access_token');
      if (!token) {
        console.log('User not authenticated');
        return;
      }
      const articleResponse = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/news/article/api/`, articleData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const articleId = articleResponse.data.id;

      // Step 2: Upload images (cover and illustrations)
      const uploadImage = async (image: Image) => {
        const formData = new FormData();
        formData.append('article_id', String(articleId));
        formData.append('category', image.category);
        formData.append('file', image.file);
        formData.append('caption', image.caption);
        formData.append('tags', image.tags);
        console.log('Uploading image:', image);
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/news/articles/image/api/`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        });
      };

      // Upload cover images
      for (const coverImage of coverImages) {
        await uploadImage(coverImage);
      }

      // Upload illustrations
      for (const illustration of illustrations) {
        await uploadImage(illustration);
      }

      // Upload Article audio
      
      // Step 2: Send the full content to the backend to generate audio
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/news/article/${articleId}/generate-audio/api/`,
        {
          content: fullContent,
          language: language,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      message.success('Article created images and audio uploaded successfully!');
      onClose(); // Close the drawer after success
    } catch (error) {
      console.error('Error submitting article:', error);
      message.error('Failed to create article or upload images.');
    }
  };

  return (
    <div className="">
      <Form onFinish={handleSubmit} layout="vertical">
        {/* Language Selector */}
        <Select
          value={language}
          onChange={setLanguage}
          className="mb-2 w-full"
          placeholder="Select Language"
        >
          <Option value="en">English</Option>
          <Option value="fr">French</Option>
          <Option value="es">Spanish</Option>
          <Option value="de">German</Option>
        </Select>

        {/* Category Selector */}
        <Select
          value={category}
          onChange={setCategory}
          className="mb-2 w-full hidden"
          placeholder="Select Category"
        >
          <Option value="Mining">Mining</Option>
          <Option value="Technology">Technology</Option>
          <Option value="Business">Business</Option>
        </Select>

        {/* Cover Image Upload */}
        < Form.Item label="Cover Image:" className='h-[100%] mb-3 bg-gray-200/30
         px-3 pt-2 pb-3 font-bold shadow-sm rounded-xl'>
          <Upload
            listType="picture-card"
            beforeUpload={() => false}
            onChange={handleCoverImageUpload}
            onRemove={handleCoverImageRemove}  // Handle image removal
            className=" w-full "
          >
            <Button icon={<UploadOutlined />}> Image</Button>
          </Upload>
        </Form.Item>

        {/* Article Title */}
        <TextArea
          placeholder="Article Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mb-3"
          rows={2}
        />

        {/* Content Paragraphs */}
        <div className='bg-black/30 rounded-lg p-2 shadow-sm'>

          {/* contentIntroduction */}
          <TextArea
            placeholder="Introduction"
            value={contentIntroduction}
            onChange={(e) => setContentIntroduction(e.target.value)}
            className="mb-2"
            rows={4}
          />
          {contentParagraphs.map((paragraph, index) => (
            <div key={index} className="mb-2 p-2 bg-white/70 rounded-md">
              <TextArea
                placeholder={`Paragraph ${index + 1} Title`}
                value={paragraph.title}
                onChange={(e) => handleParagraphChange(index, 'title', e.target.value)}
                rows={2}
                className="mb-2"
              />
              <TextArea
                placeholder={`Paragraph ${index + 1} Content`}
                value={paragraph.content}
                onChange={(e) => handleParagraphChange(index, 'content', e.target.value)}
                rows={8}
                className="mb-2"
              />

              {/* Illustration Upload for Paragraph */}
              <Upload
                name={`illustration-${index}`}
                listType="picture"
                beforeUpload={() => false}
                onChange={(info) => handleIllustrationUpload(index, info)}
                onRemove={(file) => handleIllustrationRemove(index, file)}  // Handle illustration removal
                className='flex flex-col'
              >
                <Button icon={<UploadOutlined />} className='w-full'>Upload Illustration</Button>
              </Upload>
              {/* Delete Paragraph Button */}
              <Button
                onClick={() => deleteParagraph(index)}
                className="mt-2 w-full border-red-400"
                icon={<DeleteOutlined />}
              >
                Delete Paragraph
              </Button>
            </div>
          ))}
          
          <Button type="dashed" onClick={addParagraph} 
            className="mb-2 w-full border-gray-400 border-[1px]"
          >
            Add Paragraph
          </Button>

          {/* contentConclusion */}
          <TextArea
            placeholder="Conclusion"
            value={contentConclusion}
            onChange={(e) => setContentConclusion(e.target.value)}
            className="mb-1"
            rows={3}
          />
        </div>

        {/* Tags */}
        <Input
          placeholder="Tags (comma-separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="my-3"
        />

        {/* Submit Button */}
        <Button type="primary" onClick={handleSubmit} className="w-full h-[40px]  bg-yellow-500
           border-black border-[1px] text-black font-semibold">
          Submit Article
        </Button>
      </Form>
    </div>
  );
};

export default ArticleForm;