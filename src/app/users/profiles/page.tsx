'use client';
import React, { useEffect, useState } from 'react';
import NavbarProfile from './navbarProfiles';
import { BellFilled } from '@ant-design/icons';
import axios from 'axios';
import Link from 'next/link';

// Define the structure of the profile data
interface ProfileData {
  role: string;
  bio: string;
  age: number;
  sex: string;
  phone: string;
  address: string;
  image: string | null;
  language: string;
  note: string;
  platform: string;
  created_from: string;
  status: string;
}

interface UserData {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
}

const Pages: React.FC = () => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem('access_token');
        if (!token) {
          console.error('No token found');
          return;
        }

        // Fetch profile data
        const profileResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/member/api/get`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProfileData(profileResponse.data);
        sessionStorage.setItem('profile_data', JSON.stringify(profileResponse.data));
        console.log('Profile data fetched and stored in session storage:', profileResponse.data);

        // Fetch user data
        const userResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/api/get/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserData(userResponse.data);
        sessionStorage.setItem('user_data', JSON.stringify(userResponse.data));
        console.log('User data fetched and stored in session storage:', userResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const showCreateProfessionalAccount = profileData && !['creator', 'employee', 'pro'].includes(profileData.role);

  return (
    <div>
      
      <div className='p-4'>
        <NavbarProfile />
        <div className='flex justify-between '>
          <div className='w-[100%] flex justify-start items-center'>
            <div className='w-[80px] h-[80px] bg-gray-400 rounded-lg shadow-lg border-2'>
              {profileData && profileData.image ? (
                <img
                  src={profileData.image}
                  alt="Profile"
                  className='w-full h-full object-cover rounded-lg'
                />
              ) : (
                'Profile'
              )}
            </div>
            <div className='px-2 py-2'>
              <div>{userData?.username || 'Username'}</div>
              <div className=''>{profileData?.role || 'Role'}</div>
              <div className='text-xs'>{profileData?.status || 'Status'}</div>
            </div>
          </div>
          <div className='w-[60px] flex justify-end items-center '>
            <div className=' w-[60px] h-[60px] flex justify-center items-center bg-white/20
              rounded-xl'>
              <BellFilled className="text-[28px] font-bold text-gray-400"/>
              <div className='bg-gray-500/80 rounded-full w-[10px] h-[10px] text-center
               font-black mb-4 ml-[-10px]'>
                
              </div>
            </div>
          </div>
        </div>
        <div className='w-[100%] h-[200px] bg-yellow-500 rounded-xl p-4 mt-3'>
          {showCreateProfessionalAccount ? (
            <div className="flex flex-col justify-center items-center h-[100%]">
              <h2 className="text-xl font-bold">Create a Professional Account</h2>
              <p className="text-sm mt-2">Upgrade to a professional account to access more features.</p>
              < Link href={'/users/profiles/employees/registration'} className='w-[100%]' >
                <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg w-[100%]">
                  Upgrade Now
                </button>
              </Link>
            </div>
          ) : (
            <div className="flex justify-center items-center h-full">
              Hero section
            </div>
          )}
        </div>
        <div className='w-[100%] h-[60px] bg-blue-200 rounded-xl p-4 my-4'>
          submenu 
        </div>
      </div>
    </div>
  );
};

export default Pages;
