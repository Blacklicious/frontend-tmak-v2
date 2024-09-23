import React, { useState } from 'react';
import { Form, Input, Button, Upload, message, DatePicker, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { UploadFile } from 'antd/lib/upload/interface';  // Correct typing

interface MagazineEditFormProps {
  onClose: () => void;
  language: string;  // Automatically selected language from props
}

const { Option } = Select;

const MagazineEditForm: React.FC<MagazineEditFormProps> = ({ onClose, language }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [thumbnailFileList, setThumbnailFileList] = useState<UploadFile[]>([]);  // Correct type
  const [pdfFileList, setPdfFileList] = useState<UploadFile[]>([]);  // Correct type

  // Handle file uploads for thumbnail and PDF
  const handleUploadChange = (info: any, type: string) => {
    if (type === 'thumbnail') {
      setThumbnailFileList(info.fileList as UploadFile[]);  // Update fileList for thumbnail
    } else if (type === 'pdf') {
      setPdfFileList(info.fileList as UploadFile[]);  // Update fileList for PDF
    }
  };

  // Handle form submission
  const handleSubmit = async (values: any) => {
    setLoading(true);
    const formData = new FormData();

    formData.append('category', 'Mining');  // Set category to 'Mining'
    formData.append('publisher', 'T-MAK');  // Set publisher to 'T-MAK'
    formData.append('language', values.language);  // Use the selected language from the dropdown
    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('tags', values.tags);

    if (values.link) {
      formData.append('link', values.link);  // Add the link if provided
    }

    if (values.release_date) {
      formData.append('release_date', values.release_date.format('YYYY-MM-DD'));  // Format release date
    }

    if (thumbnailFileList.length > 0 && thumbnailFileList[0].originFileObj) {
      formData.append('thumbnail', thumbnailFileList[0].originFileObj);  // Append thumbnail file
    }

    if (pdfFileList.length > 0 && pdfFileList[0].originFileObj) {
      formData.append('content', pdfFileList[0].originFileObj);  // Append PDF file
    }

    // Get token from session storage
    const token = sessionStorage.getItem('token');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/news/magazines/create/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,  // Include the token in the Authorization header
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to create magazine');
      }

      message.success('Magazine created successfully!');
      form.resetFields();
      onClose();
    } catch (error) {
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
          <Option value="en">English</Option>
          <Option value="fr">French</Option>
          <Option value="es">Spanish</Option>
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
        name="pdf"
        rules={[{ required: true, message: 'Please upload a PDF file for the content!' }]}
      >
        <Upload
          listType="text"
          accept=".pdf"
          maxCount={1}
          beforeUpload={() => false}  // Prevent auto upload
          fileList={pdfFileList}  // Use fileList to track uploaded files
          onChange={(info) => handleUploadChange(info, 'pdf')}
          className='flex flex-col'
        >
          <Button icon={<UploadOutlined />} className='w-[100%]'>
            Upload PDF
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
          Create Magazine
        </Button>
      </Form.Item>
    </Form>
  );
};

export default MagazineEditForm;