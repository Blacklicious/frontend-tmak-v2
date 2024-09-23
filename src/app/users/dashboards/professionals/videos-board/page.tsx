'use client';
import React, { useState } from 'react';
import VideoManagerPage from './managers/page';
import NavbarProfile from '../../navbarProfiles'
import ManagersNavbar from '../navbarManagers'
import Navbar from '@/components/Navbar';

const VideoPage: React.FC = () => {
  const [locale, setLocale] = useState<string>('fr-FR');
  return (
    <div className="w-[100%]  flex flex-col bg-gray-100 text-black">
      < Navbar locale={locale} setLocale={setLocale} />
      <div className='p-4 flex flex-col'>
        < ManagersNavbar />
      </div>
      < VideoManagerPage />
      <NavbarProfile />
    </div>
  );
};

export default VideoPage;