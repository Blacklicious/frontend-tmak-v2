import React, { useState } from 'react';
import { Form, Input, Button, Upload, message, DatePicker, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { UploadFile } from 'antd/lib/upload/interface';  // Correct typing
import axios from 'axios';  // Import axios

interface VideoFormProps {
  onClose: () => void;
  language: string;  // Automatically selected language from props
}

const { Option } = Select;

const VideoForm: React.FC<VideoFormProps> = ({ onClose, language }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [thumbnailFileList, setThumbnailFileList] = useState<UploadFile[]>([]);  // Correct type
  const [videoFileList, setVideoFileList] = useState<UploadFile[]>([]);  // Correct type

  // Handle file uploads for thumbnail and PDF
  const handleUploadChange = (info: any, type: string) => {
    if (type === 'thumbnail') {
      setThumbnailFileList(info.fileList as UploadFile[]);  // Update fileList for thumbnail
    } else if (type === 'mp4') {
      setVideoFileList(info.fileList as UploadFile[]);  // Update fileList for PDF
    }
  };

  // Handle form submission
  const handleSubmit = async (values: any) => {
    setLoading(true);
    const formData = new FormData();

    formData.append('category', 'Mining');  // Set category to 'Mining'
    formData.append('publisher', 'T-MAK');  // Set publisher to 'T-MAK'
    formData.append('platform', 't-mak.org');  // Set platform to 'web'
    formData.append('language', values.language);  // Use the selected language from the dropdown
    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('tags', values.tags);

    if (values.link) {
      // Check if the link starts with 'https://youtu.be/' and replace it
      const modifiedLink = values.link.replace('https://youtu.be/', 'https://www.youtube.com/embed/');
      
      // Append the modified link to formData
      formData.append('link', modifiedLink);
    }

    if (values.release_date) {
      formData.append('release_date', values.release_date.format('YYYY-MM-DD'));  // Format release date
    }

    if (thumbnailFileList.length > 0 && thumbnailFileList[0].originFileObj) {
      formData.append('thumbnail', thumbnailFileList[0].originFileObj);  // Append thumbnail file
    }

    if (videoFileList.length > 0 && videoFileList[0].originFileObj) {
      formData.append('content', videoFileList[0].originFileObj);  // Append PDF file
    }

    // Get token from session storage
    const token = sessionStorage.getItem('access_token');  // Ensure this retrieves a valid token

    // Debugging: Log the token and check if it's correctly retrieved
    console.log('Token:', token);
    if (!token) {
      message.error('Authentication token missing. Please log in.');
      setLoading(false);
      return;
    }

    try {
      // Axios request
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/news/video/api/`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,  // Include token in the Authorization header
          'Content-Type': 'multipart/form-data',  // Set correct content type
        },
      });

      // Debugging: Log the response from the server
      console.log('Response:', response);

      if (response.status === 201) {
        message.success('Magazine created successfully!');
        form.resetFields();
        onClose();
      } else {
        throw new Error(`Unexpected status code: ${response.status}`);
      }
    } catch (error: any) {
      // Debugging: Log the error details
      console.error('Error:', error);
      if (error.response) {
        console.error('Response Error Data:', error.response.data);
        console.error('Response Status:', error.response.status);
        console.error('Response Headers:', error.response.headers);
      }
      message.error('Failed to create magazine');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={{ language }}  // Set the initial value for language from props
    >
      {/* Language Dropdown */}
      <Form.Item
        name="language"
        rules={[{ required: true, message: 'Please select a language!' }]}
      >
        <Select placeholder="Select a language">
          <Option value="en-US">English</Option>
          <Option value="fr-FR">French</Option>
          <Option value="es-ES">Spanish</Option>
        </Select>
      </Form.Item>

      {/* Title */}
      <Form.Item
        name="title"
        rules={[{ required: true, message: 'Please input the title!' }]}
      >
        <Input.TextArea rows={2} placeholder="Enter Title" />
      </Form.Item>

      {/* Thumbnail Upload (single file) */}
      <Form.Item>
        <Upload
          listType="picture"
          maxCount={1}
          beforeUpload={() => false}  // Prevent auto upload
          fileList={thumbnailFileList}  // Use fileList to track uploaded files
          onChange={(info) => handleUploadChange(info, 'thumbnail')}
          className='flex flex-col'
        >
          <Button icon={<UploadOutlined />} className='w-[100%]'>
            Upload Thumbnail
          </Button>
        </Upload>
      </Form.Item>

      {/* PDF Upload (single file) */}
      <Form.Item
        name="mp4"
        rules={[{ required: false, message: 'Please upload a Video file for the content!' }]}
      >
        <Upload
          listType="text"
          accept=".mp4"
          maxCount={1}
          beforeUpload={() => false}  // Prevent auto upload
          fileList={videoFileList}  // Use fileList to track uploaded files
          onChange={(info) => handleUploadChange(info, 'mp4')}
          className='flex flex-col'
        >
          <Button icon={<UploadOutlined />} className='w-[100%]'>
            Upload Video
          </Button>
        </Upload>
      </Form.Item>

      {/* Description */}
      <Form.Item
        name="description"
        rules={[{ required: true, message: 'Please input the description!' }]}
      >
        <Input.TextArea rows={4} placeholder="Enter Description" />
      </Form.Item>

      {/* Release Date */}
      <Form.Item
        name="release_date"
        rules={[{ required: true, message: 'Please select the release date!' }]}
      >
        <DatePicker className="w-[100%]" placeholder="Select Release Date" />
      </Form.Item>

      {/* Link */}
      <Form.Item
        name="link"
        rules={[{ type: 'url', message: 'Please input a valid URL!' }]}
      >
        <Input placeholder="Enter External Content Link (Optional)" />
      </Form.Item>

      {/* Tags */}
      <Form.Item
        name="tags"
        rules={[{ required: true, message: 'Please input the tags!' }]}
      >
        <Input placeholder="Enter Tags" />
      </Form.Item>

      {/* Submit Button */}
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}
          className='w-[100%] h-[45px] text-lg font-bold'>
          Create Emmission TV
        </Button>
      </Form.Item>
    </Form>
  );
};

export default VideoForm;