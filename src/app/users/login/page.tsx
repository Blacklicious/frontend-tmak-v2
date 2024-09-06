'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const router = useRouter();
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/login/api/`, formData); // Replace with your backend endpoint
      // Assuming the response contains both access and refresh tokens
      const { access, refresh } = response.data;
      
      // Store tokens in sessionStorage
      sessionStorage.setItem('access_token', access);
      sessionStorage.setItem('refresh_token', refresh);
      // Fetch the user profile data
      const userResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/api/get`, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });
      
      // Store profile data in sessionStorage
      sessionStorage.setItem('user_data', JSON.stringify(userResponse.data));
      
      router.push('/'); // Redirect to home page or dashboard
    } catch (err) {
      setError('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <div className='w-[100%] h-[100vh]'>
      <div className=' text-3xl font-bold  p-6 h-[15vh] hidden
        bg-gray-800'>
        Login page
      </div>
      <div className='p-6 mt-28'>
        <div className='p-6 bg-white/80 rounded-lg'>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <form onSubmit={handleSubmit} className='flex flex-col space-y-3'>
            <input
              type="text"
              name="username"
              placeholder="Username"
              className='px-3 rounded h-[35px] shadow-sm'
              value={formData.username}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className='px-3 rounded h-[35px] shadow-sm'
              value={formData.password}
              onChange={handleChange}
              required
            />
            <div className='w-[100%] py-1'>
              <button type="submit" 
                className='bg-green-500/50 rounded h-[35px] w-[100%] shadow-sm'
              >Login</button>
              <div className='mt-[20px] h-[25px] flex items-center justify-center text-gray-500
              cursor-pointer text-sm'
              >Vous n'avez pas de compte T-MAK ? </div>
              <div className='flex items-center justify-center text-green-600
                font-semibold cursor-pointer'
              ><Link rel="stylesheet" href="/users/auths/registration/"> Creez un compte ici </Link></div>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;