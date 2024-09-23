'use client';

import React, { useEffect, useState } from 'react';
import { Button, message } from 'antd';
import JobPage from './jobs-board/page';
import CreateBusinessPage from './create/page';
import axios from 'axios';
import Image from 'next/image'; // Use Next.js Image for image optimization

interface Business {
  id: number;
  name: string;
  logo: string;
  phone: string;
  email: string;
}

const ListBusinessesPage: React.FC = () => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);

  // Fetch the list of businesses from the API
  const fetchBusinesses = async () => {
    try {
      const response = await axios.get<Business[]>('http://192.168.1.3:8000/users/businesses/api/');
      setBusinesses(response.data);
    } catch (error) {
      message.error('Failed to fetch businesses');
    }
  };

  useEffect(() => {
    fetchBusinesses();
  }, []);

  // Handle business selection
  const handleBusinessChange = (business: Business | null) => {
    if (business) {
      // Business is selected
      setSelectedBusiness(business);
      console.log('Selected Business:', business);
    } else {
      // Business is deselected
      setSelectedBusiness(null);
    }
  };

  return (
    <div className="w-full bg-white rounded-lg mt-2 mb-[50px] p-2 text-black">
      <div className="flex w-full justify-between bg-gray-200 rounded-xl p-2">
        {/* List of businesses */}
        <div className="w-[83%] h-[200px] p-3 overflow-y-auto flex flex-wrap">
          {businesses.map((business) => (
            <div className="w-min mb-2 mr-4" key={business.id}>
              <div
                className="bg-white rounded-md w-min"
                onClick={() => handleBusinessChange(business)}
              >
                <div
                  className={`rounded-lg w-max h-[80px] flex justify-between items-center pl-3 pr-4 ${
                    selectedBusiness?.id === business.id ? 'border-l-[6px] border-yellow-500' : ''
                  }`}
                >
                  <Image src={business.logo} alt={business.name} width={80} height={70} className="rounded-full" />
                  <div className="flex flex-col justify-between w-full px-1 ml-2">
                    <div className="text-[20px] font-bold">{business.name}</div>
                    <div>{business.email}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Create new business form */}
        <CreateBusinessPage />
      </div>

      {/* Display selected business */}
      <div className="mt-1 mb-2">
        {selectedBusiness ? (
          <div>
            <h3 className="pl-2 mb-1">Selected Business:</h3>
            <ul className="bg-gray-300 rounded-lg p-1">
              <li className="w-full bg-white border-2 border-black/70 pl-2 rounded-md flex justify-between">
                <div className="w-[80%]">{selectedBusiness.name}</div>
                <button
                  className="text-white font-bold ml-2 bg-black/60 w-[20%] hover:bg-black"
                  onClick={() => handleBusinessChange(null)}
                >
                  X
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <p className="bg-gray-200/70 rounded-lg p-1 text-center">No business selected.</p>
        )}
      </div>

      {/* Job Page - passing selected business */}
      {selectedBusiness && <JobPage businessId={selectedBusiness.id} locale={''} />}
    </div>
  );
};

export default ListBusinessesPage;