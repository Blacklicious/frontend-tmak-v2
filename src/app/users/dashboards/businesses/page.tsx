'use client';
import Navbar from '@/components/Navbar';
import React, { useState } from 'react';
import NavbarProfile from '../navbarProfiles';
import ListBusinessPage from './list';

const BusinessDashboard = () => {
  const [locale, setLocale] = useState('');
  const [selectedBusinesses, setSelectedBusinesses] = useState<any[]>([]);
  const [selectedJobs, setSelectedJobs] = useState<any[]>([]);

  // Handle selection of businesses
  const handleBusinessSelection = (selectedBusiness: any) => {
    // Toggle selection: if already selected, remove it, otherwise add it
    setSelectedBusinesses((prevSelected) =>
      prevSelected.includes(selectedBusiness)
        ? prevSelected.filter((business) => business !== selectedBusiness)
        : [...prevSelected, selectedBusiness]
    );
  };

  return (
    <div>
      <Navbar locale={locale} setLocale={setLocale} />
      <div className="flex w-full justify-center items-center space-y-4 p-2">
        {/* Business Page */}
        < ListBusinessPage />
      </div>
      <NavbarProfile />
    </div>
  );
};

export default BusinessDashboard;