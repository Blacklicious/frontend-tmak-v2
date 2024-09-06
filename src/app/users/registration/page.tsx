'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    confirmPassword: '',
  });

  const router = useRouter();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      // Register the user
      const registrationResponse = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/register/api/`, {
        username: formData.username,
        email: formData.email,
        first_name: formData.first_name,
        last_name: formData.last_name,
        password: formData.password,
      });

      setSuccess('Registration successful! Logging in...');

      // Log the user in directly after successful registration
      const loginResponse = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/login/api/`, {
        username: formData.username,
        password: formData.password,
      });

      // Assuming the login response contains both access and refresh tokens
      const { access, refresh } = loginResponse.data;
      
      // Store tokens in sessionStorage
      sessionStorage.setItem('access_token', access);
      sessionStorage.setItem('refresh_token', refresh);

      // Redirect to profile creation page after successful login
      router.push('/users/profiles/members/registration');
    } catch (err) {
      setError('Registration failed. Please check your details and try again.');
      setSuccess('');
    }
  };

  return (
    <div className='w-[100%] h-[100vh]'>
      <div className='text-3xl font-bold p-6 h-[15vh] hidden bg-gray-800'>
        Registration Page
      </div>
      <div className='p-6 mt-28'>
        <div className='p-6 bg-white/80 rounded-lg'>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {success && <p style={{ color: 'green' }}>{success}</p>}
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
              type="email"
              name="email"
              placeholder="Email"
              className='px-3 rounded h-[35px] shadow-sm'
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="last_name"
              placeholder="Nom de Famille"
              className='px-3 rounded h-[35px] shadow-sm'
              value={formData.last_name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="first_name"
              placeholder="Prenom"
              className='px-3 rounded h-[35px] shadow-sm'
              value={formData.first_name}
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
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className='px-3 rounded h-[35px] shadow-sm'
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <div className='w-[100%] py-1'>
              <button type="submit" 
                className='bg-green-500/50 rounded h-[35px] w-[100%] shadow-sm'
              >Register</button>
              <div className='mt-[20px] h-[25px] flex items-center justify-center text-gray-500 cursor-pointer text-sm'>
                Already have an account? 
              </div>
              <div className='flex items-center justify-center text-green-600 font-semibold cursor-pointer'
                onClick={() => router.push('/users/auth/login')}
              >
                Login here
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;