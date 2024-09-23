import React, { useState, useEffect } from 'react';
import { Drawer, Button, Form, Input, message, Card, Modal } from 'antd';
import axios from 'axios';
import Image from 'next/image';

// Define Magazine interface to match the Django model structure
interface Magazine {
  id: number;
  category: string;
  title: string;
  thumbnail: string;
  content: string;
  tags: string[];
  status: string;
  total_views: number;
  total_likes: number;
  total_dislikes: number;
  total_saves: number;
  total_shares: number;
  total_comments: number;
  total_reports: number;
  language: string;
  publisher: string;
  release_date: string;
}

interface MagazineListSectionProps {
  locale: string;
}

const MagazineListSection: React.FC<MagazineListSectionProps> = ({ locale }) => {
  const [magazines, setMagazines] = useState<Magazine[]>([]);
  const [loading, setLoading] = useState(true);
  const [ selectedMagazine, setSelectedMagazine ] = useState<Magazine | null>(null);

  useEffect(() => {
    fetchMagazines();
  }, []);

  // Fetch Magazines from the API
  const fetchMagazines = async () => {
    try {
      console.log('Fetching magazines...');
      const response = await axios.get<Magazine[]>(`${process.env.NEXT_PUBLIC_API_URL}/news/magazines/api/`);
      setMagazines(response.data);
      console.log('Magazines:', response.data);
    } catch (error) {
      message.error('Failed to fetch magazines');
    } finally {
      setLoading(false);
    }
  };

  // Handle magazine deletion
  const handleDelete = async (id: number) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this magazine?',
      okText: 'Yes, Delete',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          const token = sessionStorage.getItem('access_token');
          if (!token) {
            message.error('User not authenticated');
            return;
          }

          await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/news/magazine/${id}/delete/api/`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          message.success('Magazine deleted successfully');
          fetchMagazines(); // Refresh the magazine list
        } catch (error) {
          message.error('Failed to delete magazine');
        }
      },
    });
  };

  return (
    <div>
      <h2>Magazine List ({locale})</h2>

      <div className="flex flex-wrap justify-around w-[100%] mb-[60px]">
        {magazines.map((magazine) => (
          < div key={magazine.id} className='flex flex-col bg-white rounded-md shadow-md p-1 
            w-[48%] sm:w-[31%] md:w-[23%] lg:w-[19%] xl:w-[15%] mt-4'>
            <div className='flex justify-between pb-1' >
              <Button className='h-[26px]' >
                Edit
              </Button>
              <Button danger className='h-[26px]' 
                onClick={() => handleDelete(magazine.id)}>
                Delete
              </Button>
            </div>
            <div className='w-[100%]'>
              <Image
                src={magazine.thumbnail}
                alt={magazine.title || "Magazine Image"}
                width={900}
                height={1650}
                className="rounded-t-md object-cover h-[100%]"
              />
            </div>
            <div className='text-[14px] font-semibold'>{magazine.title}</div>
            <div className='flex justify-between w-full text-xs'>
              <p>Category: {magazine.category} </p>
              <p>||</p>
              <p>{magazine.total_views} views</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MagazineListSection;