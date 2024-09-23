'use client';
import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../../../utils/axiosInstance';
import { useRouter, useParams } from 'next/navigation';

const ProfileEditPage = () => {
  const { id } = useParams();  // Extract profile ID from the URL
  const [formData, setFormData] = useState({
    nzid: '',
    role: '',
    bio: '',
    age: null,
    sex: '',
    address: '',
    phone: '',
    images: null,
    language: '',
    note: '',
    platform: '',
    created_from: '',
    status: '',
    user: null
  });

  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get(`profiles/${id}/`);
        setFormData(response.data);
      } catch (err) {
        setError('Failed to fetch profile. Please try again.');
      }
    };

    fetchProfile();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axiosInstance.put(`profiles/${id}/`, formData);
      router.push('/profiles');  // Redirect to profile list page after update
    } catch (err) {
      setError('Failed to update profile. Please try again.');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Edit Profile</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input 
          type="text" 
          name="nzid" 
          placeholder="NZID" 
          value={formData.nzid} 
          onChange={handleChange} 
          required 
          className="p-2 border rounded" 
        />
        <input 
          type="text" 
          name="role" 
          placeholder="Role" 
          value={formData.role} 
          onChange={handleChange} 
          required 
          className="p-2 border rounded" 
        />
        <textarea 
          name="bio" 
          placeholder="Bio" 
          value={formData.bio} 
          onChange={handleChange} 
          className="p-2 border rounded" 
        />
        <input 
          type="number" 
          name="age" 
          placeholder="Age" 
          value={formData.age !== null ? formData.age : ''} 
          onChange={handleChange} 
          className="p-2 border rounded" 
        />
        <input 
          type="text" 
          name="sex" 
          placeholder="Sex" 
          value={formData.sex} 
          onChange={handleChange} 
          className="p-2 border rounded" 
        />
        <input 
          type="text" 
          name="address" 
          placeholder="Address" 
          value={formData.address} 
          onChange={handleChange} 
          className="p-2 border rounded" 
        />
        <input 
          type="text" 
          name="phone" 
          placeholder="Phone" 
          value={formData.phone} 
          onChange={handleChange} 
          className="p-2 border rounded" 
        />
        <input 
          type="text" 
          name="language" 
          placeholder="Language" 
          value={formData.language} 
          onChange={handleChange} 
          className="p-2 border rounded" 
        />
        <textarea 
          name="note" 
          placeholder="Note" 
          value={formData.note} 
          onChange={handleChange} 
          className="p-2 border rounded" 
        />
        <input 
          type="text" 
          name="platform" 
          placeholder="Platform" 
          value={formData.platform} 
          onChange={handleChange} 
          className="p-2 border rounded" 
        />
        <input 
          type="text" 
          name="created_from" 
          placeholder="Created From" 
          value={formData.created_from} 
          onChange={handleChange} 
          className="p-2 border rounded" 
        />
        <input 
          type="text" 
          name="status" 
          placeholder="Status" 
          value={formData.status} 
          onChange={handleChange} 
          className="p-2 border rounded" 
        />
        <button 
          type="submit" 
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default ProfileEditPage;