'use client';

import React, { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload, message } from 'antd';
import ImgCrop from 'antd-img-crop';
import type { UploadFile, UploadProps } from 'antd';
import type { RcFile } from 'antd/lib/upload';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Navbar from '@/components/Navbar';

interface FormData {
  bio: string;
  age: number | null;
  sex: string;
  phone: string;
  address: string;
  image: RcFile | null;
  language: string;
  note: string;
  platform: string;
  created_from: string;
  status: string;
}

const ProfileCreatePage: React.FC = () => {

  const [formData, setFormData] = useState<FormData>({
    bio: '',
    age: null,
    sex: '',
    phone: '',
    address: '',
    image: null,
    language: '',
    note: '',
    platform: 'www.t-mak.org',
    created_from: '',
    status: 'inactive',
  });

  const [error, setError] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const router = useRouter();
  const [locale, setLocale] = useState<string>('en-GB');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleImageUpload: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    if (newFileList.length > 0) {
      const latestFile = newFileList[newFileList.length - 1];
      setFormData({
        ...formData,
        image: latestFile.originFileObj || null,  // Store the file object
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData();
    data.append('bio', formData.bio || '');
    data.append('age', formData.age?.toString() || '');
    data.append('sex', formData.sex || '');
    data.append('phone', formData.phone || '');
    data.append('address', formData.address || '');
    if (formData.image) {
      data.append('image', formData.image);  // Attach the image file
    }
    data.append('language', formData.language || '');
    data.append('note', formData.note || '');
    data.append('platform', formData.platform || '');
    data.append('created_from', formData.created_from || '');
    data.append('status', formData.status || 'inactive');

    // Logging FormData
    for (let pair of Array.from(data.entries())) {
        console.log(pair[0] + ': ' + pair[1]);
    }

    // Retrieve the token from sessionStorage
    const token = sessionStorage.getItem('access_token');
    console.log('Token:', token);

    try {
      console.log('Submitting form data:', data);
      
      const userProfileResponse = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/members/api/`, data, {
        headers: {
          'Authorization': `Bearer ${token}`,  // Include the token in the Authorization header
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Profile created successfully.');
      message.success('Profile created successfully.');
      sessionStorage.setItem('profile_data', JSON.stringify(userProfileResponse.data));
      router.push('/users/dashboards/');  // Redirect to the dashboard
    } catch (err) {
      console.error('Error creating profile:', err);
      setError('Failed to create profile. Please try again.');
      message.error('Failed to create profile. Please try again.');
    }
  };

  return (
    <div>
        < Navbar locale={locale} setLocale={setLocale}/>
      <div className="p-6 h-[100%]">
        <div className=" h-[80px] flex justify-center items-center bg-gray-300 mb-4
          rounded-xl text-2xl font-bold">Create Member Profile</div>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-wrap space-y-2 justify-between">
          <textarea
            name="bio"
            placeholder="Bio"
            value={formData.bio}
            onChange={handleChange}
            className="w-[100%] p-2 border rounded-lg"
            rows={3}
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age || ''}
            onChange={handleChange}
            className="w-[49%] p-2 border rounded-lg"
          />
          <select
            name="sex"
            value={formData.sex}
            onChange={handleChange}
            className="w-[49%] p-2 border rounded-lg"
          >
            <option value="" disabled>Select Sex</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-[100%] p-2 border rounded-lg"
          />
          <textarea
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="w-[100%] p-2 border rounded-lg"
            rows={6}
          />

          {/* Image Upload and Crop */}
          <div className="w-[100%] p-2 border-2 flex justify-center rounded-xl">
            <ImgCrop aspect={1}>
              <Upload
                listType="picture"
                fileList={fileList}
                onChange={handleImageUpload}
                className="w-[100%] flex flex-col"
                maxCount={1}  // Allow only one image upload
              >
                <Button type="primary" icon={<UploadOutlined />} className="w-[100%] h-[35px]">
                  Upload Profile Image
                </Button>
              </Upload>
            </ImgCrop>
          </div>

          <input
            type="text"
            name="language"
            placeholder="Language"
            value={formData.language}
            onChange={handleChange}
            className="w-[100%] p-2 border rounded-lg"
          />

          <textarea
            name="note"
            placeholder="Note"
            value={formData.note}
            onChange={handleChange}
            className="w-[100%] p-2 border rounded-lg hidden"
          />
          <input
            type="text"
            name="created_from"
            placeholder="Created From"
            value={formData.created_from}
            onChange={handleChange}
            className="w-[100%] p-2 border rounded-lg hidden"
          />
          <button
            type="submit"
            className="w-[100%] h-[45px] bg-green-500 text-white
            px-4 rounded-lg text-[19px] font-medium"
          >
            Create Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileCreatePage;
