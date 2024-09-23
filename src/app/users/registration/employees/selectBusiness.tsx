'use client';

import React, { useEffect, useState } from 'react';
import { Select, Avatar } from 'antd';
import axios from 'axios';

interface SelectBusinessProps {
  value?: string;
  onChange?: (value: string) => void;
}

const SelectBusiness: React.FC<SelectBusinessProps> = ({ value, onChange }) => {
  const [businesses, setBusinesses] = useState<{ value: string; label: string; logo: string }[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch the list of businesses
    const fetchBusinesses = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/businesses/api/`);

        const businessOptions = response.data.map((business: any) => ({
          value: business.id,
          label: business.name,
          logo: business.logo, // Assuming the API returns a `logo` URL for each business
        }));

        setBusinesses(businessOptions);
      } catch (err) {
        console.error('Error fetching businesses:', err);
        setError('Failed to fetch businesses. Please try again.');
      }
    };

    fetchBusinesses();
  }, []);

  return (
    <Select
      value={value}
      onChange={onChange}
      placeholder="Select Business"
      className="w-full h-[60px]"
    >
      {businesses.map((business) => (
        <Select.Option key={business.value} value={business.value}>
          <div className="flex items-center">
            <Avatar src={business.logo} size="small" className="mr-2 h-[50px] w-[50px]" />
            {business.label}
          </div>
        </Select.Option>
      ))}
    </Select>
  );
};

export default SelectBusiness;
