// components/BusinessForm.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import IndustrySelect from './selectIndustry';
import TextInput from './inputText';
import TextAreaInput from './inputTextArea';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload, UploadFile, UploadProps } from 'antd';
import type { RcFile } from 'antd/lib/upload';
import ImgCrop from 'antd-img-crop';
import { refreshAuthToken } from '@/utils/authUtils'; // Adjust path according to your file structure

const MAX_COUNT = 3;

interface FormData {
  industry: string[];
  name: string;
  description: string;
  email: string;
  logo: RcFile | null;
  phone: string;
  website: string;
  platform: string;
}

const BusinessForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    industry: [],
    name: '',
    description: '',
    logo: null,
    email: '',
    phone: '',
    website: '',
    platform: 'www.t-mak.org',
  });

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleIndustryChange = (value: string[]) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      industry: value,
    }));
  };

  const handleLogoUploadChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    if (newFileList.length > 0) {
      const latestFile = newFileList[newFileList.length - 1];
      setFormData({
        ...formData,
        logo: latestFile.originFileObj || null,  // Store the file object
      });
    }
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData();

    // Convert the industry array to JSON and append it
    const industryJson = JSON.stringify(formData.industry);
    data.append('industry', industryJson);

    for (const key in formData) {
        const value = formData[key as keyof typeof formData];

        if (key !== 'industry') {  // Skip the industry key since it's already handled
            if (value instanceof File) {
                data.append(key, value); // Append the file directly
            } else if (Array.isArray(value)) {
                value.forEach((item) => {
                    data.append(key, item);
                });
            } else if (value !== null && value !== undefined) {
                data.append(key, value as string | Blob);
            }
        }
    }
    let token = sessionStorage.getItem('access_token');
    try {
      if (!token) {
          setError('User not authenticated');
          return;
      }

      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/business/api/`, data, {
          headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`,
          },
      });

      router.push('/users/dashboards/businesses'); // Redirect to businesses page
    } catch (err:any) {
        console.error('Error registering business:', err);
        setError('Failed to register business. Please try again.');
        if (err.response?.status === 401 && err.response.data.code === 'token_not_valid') {
          // Try to refresh the token
          console.log('Token expired, attempting refresh...');
          token = (await refreshAuthToken()) || null;
          if (token) {
              // Retry the request with the new token
              try {
                  await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/business/api/`, data, {
                      headers: {
                          'Content-Type': 'multipart/form-data',
                          Authorization: `Bearer ${token}`,
                      },
                  });
                  router.push('/users/dashboards/businesses'); // Redirect to businesses page
              } catch (retryError) {
                  console.error('Error retrying business registration:', retryError);
                  setError('Failed to register business. Please try again.');
              }
          } else {
              setError('Session expired. Please log in again.');
          }
      } else {
          setError('Failed to register business. Please try again.');
      }
    }
  };


  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <IndustrySelect value={formData.industry} onChange={handleIndustryChange} maxCount={MAX_COUNT} />
      <TextInput type="text" name="name" placeholder="Business Name" value={formData.name} onChange={handleChange} />
      <TextAreaInput name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
      <TextInput type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
      <TextInput type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />
      <TextInput type="url" name="website" placeholder="Website URL" value={formData.website} onChange={handleChange} />
      <div className='p-2 bg-gray-200/70 rounded-lg shadow-md'>
        <ImgCrop aspect={1}>
          <Upload 
            listType="picture"
            fileList={fileList} 
            onChange={handleLogoUploadChange} 
            maxCount={1}  // Allow only one image upload
            className='flex flex-col '
          >
            <Button type="primary" icon={<UploadOutlined />} className="w-[100%] h-[35px] bg-yellow-500">
              Upload Logo 
            </Button>
          </Upload>
        </ImgCrop>
      </div>
      
<button
  type="submit"
  className="w-full h-[45px] bg-white/60 border-[3px] border-yellow-500 text-black px-4 rounded-lg text-[19px] font-bold 
    hover:bg-green-800 hover:text-white"
>
  Register Business
</button>
    </form>
  );
};

export default BusinessForm;
