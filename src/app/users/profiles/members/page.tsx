'use client';
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../../utils/axiosInstance';
import { useRouter } from 'next/navigation';

const ProfileListPage = () => {
  const [profiles, setProfiles] = useState([]);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axiosInstance.get('profiles/');
        setProfiles(response.data);
      } catch (err) {
        setError('Failed to fetch profiles. Please try again.');
      }
    };

    fetchProfiles();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await axiosInstance.delete(`profiles/${id}/`);
      setProfiles(profiles.filter(profile => profile.id !== id));
    } catch (err) {
      setError('Failed to delete profile. Please try again.');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Profile List</h1>
      {error && <p className="text-red-500">{error}</p>}
      <ul>
        {profiles.map(profile => (
          <li key={profile.id} className="p-4 bg-gray-100 my-2 rounded">
            <p>{profile.nzid}</p>
            <p>{profile.role}</p>
            <button onClick={() => router.push(`/profiles/edit/${profile.id}`)} className="bg-blue-500 text-white px-2 py-1 rounded">Edit</button>
            <button onClick={() => handleDelete(profile.id)} className="bg-red-500 text-white px-2 py-1 ml-2 rounded">Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={() => router.push('members/registration/')} className="bg-green-500 text-white px-4 py-2 mt-4 rounded">Create New Profile</button>
    </div>
  );
};

export default ProfileListPage;