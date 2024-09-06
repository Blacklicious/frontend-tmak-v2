'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import TextInput from './inputText';
import TextAreaInput from './inputTextArea';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload, UploadFile, UploadProps } from 'antd';
import type { RcFile } from 'antd/lib/upload';
import axios from 'axios';
import SelectBusiness from './selectBusiness';

const EmployeeForm: React.FC = () => {
  const [formData, setFormData] = useState({
    business: '',
    jobDepartment: '',
    jobTitle: '',
    jobEmail: '',
    jobPhone: '',
    jobDescription: '',
    image: null as RcFile | null,
    resume: null as RcFile | null,
  });

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [cvFileList, setCvFileList] = useState<UploadFile[]>([]);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleBusinessChange = (value: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      business: value,
    }));
  };

  const handleImageUploadChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    if (newFileList.length > 0) {
      const latestFile = newFileList[newFileList.length - 1];
      setFormData((prevFormData) => ({
        ...prevFormData,
        image: latestFile.originFileObj || null,  // Store the image file object
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        image: null,
      }));
    }
  };

  const handleCvUploadChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setCvFileList(newFileList);
    if (newFileList.length > 0) {
      const latestFile = newFileList[newFileList.length - 1];
      setFormData((prevFormData) => ({
        ...prevFormData,
        resume: latestFile.originFileObj || null,  // Store the CV file object
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        resume: null,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData();

    // Append text fields and files
    for (const key in formData) {
      const value = formData[key as keyof typeof formData];

      if (value instanceof File) {
        data.append(key, value); // Append the file directly
      } else if (value !== null && value !== undefined) {
        data.append(key, value as string | Blob);
      }
    }

    try {
      const token = sessionStorage.getItem('access_token');
      if (!token) {
        setError('User not authenticated');
        return;
      }

      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/employe/api/`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      router.push('/users/profiles/employees'); // Redirect upon successful submission
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('Failed to submit form. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <SelectBusiness value={formData.business} onChange={handleBusinessChange} />
      <TextInput type="text" name="jobDepartment" placeholder="Job Department" value={formData.jobDepartment} onChange={handleChange} />
      <TextInput type="text" name="jobTitle" placeholder="Job Title" value={formData.jobTitle} onChange={handleChange} />
      <TextInput type="email" name="jobEmail" placeholder="Job Email" value={formData.jobEmail} onChange={handleChange} />
      <TextInput type="text" name="jobPhone" placeholder="Job Phone" value={formData.jobPhone} onChange={handleChange} />
      <TextAreaInput name="jobDescription" placeholder="Job Description" value={formData.jobDescription} onChange={handleChange} />

      <Upload
        name="image"
        listType="picture"
        fileList={fileList}
        onChange={handleImageUploadChange}
        beforeUpload={() => false} // Prevent automatic upload
        className='upload-classname'
      >
        <Button icon={<UploadOutlined />}>Upload Professionnal Image</Button>
      </Upload>

      <Upload
        name="resume"
        listType="text"  // CVs are typically not displayed as images
        fileList={cvFileList}
        onChange={handleCvUploadChange}
        beforeUpload={() => false} // Prevent automatic upload
        className='upload-classname'
      >
        <Button icon={<UploadOutlined />}>Upload CV</Button>
      </Upload>
      
      <button
        type="submit"
        className="w-full h-[45px] bg-green-500 text-white px-4 rounded-lg text-[19px] font-medium"
      >
        Register Employee
      </button>
    </form>
  );
};

export default EmployeeForm;
