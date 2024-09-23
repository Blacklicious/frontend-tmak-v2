import React, { useState, useEffect } from 'react';
import { Drawer, Button, Form, Input, message, Card, Modal } from 'antd';
import axios from 'axios';
import Image from 'next/image';

// Define Video interface to match the Django model structure
interface Video {
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

interface VideoListSectionProps {
  locale: string;
}

const VideoListSection: React.FC<VideoListSectionProps> = ({ locale }) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [ selectedVideo, setSelectedVideo ] = useState<Video | null>(null);

  useEffect(() => {
    fetchVideos();
  }, []);

  // Fetch Videos from the API
  const fetchVideos = async () => {
    try {
      console.log('Fetching Videos...');
      const response = await axios.get<Video[]>(`${process.env.NEXT_PUBLIC_API_URL}/news/videos/api/`);
      setVideos(response.data);
      console.log('Videos:', response.data);
    } catch (error) {
      message.error('Failed to fetch Videos');
    } finally {
      setLoading(false);
    }
  };

  // Handle Video deletion
  const handleDelete = async (id: number) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this Video?',
      okText: 'Yes, Delete',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          const token = sessionStorage.getItem('access_token');
          if (!token) {
            message.error('User not authenticated');
            return;
          }

          await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/news/video/${id}/delete/api/`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          message.success('Video deleted successfully');
          fetchVideos(); // Refresh the Video list
        } catch (error) {
          message.error('Failed to delete Video');
        }
      },
    });
  };

  return (
    <div>
      <h2>Video List ({locale})</h2>

      <div className="flex flex-wrap justify-around w-[100%] mb-[60px]">
        {videos.map((video) => (
          < div key={video.id} className='flex flex-col bg-white rounded-md shadow-md p-1 
            w-[48%] sm:w-[31%] md:w-[23%] lg:w-[19%] xl:w-[15%] mt-4'>
            <div className='flex justify-between pb-1' >
              <Button className='h-[26px]' >
                Edit
              </Button>
              <Button danger className='h-[26px]' 
                onClick={() => handleDelete(video.id)}>
                Delete
              </Button>
            </div>
            <div className='w-[100%]'>
              <Image
                src={video.thumbnail}
                alt={video.title || "Video Image"}
                width={900}
                height={1650}
                className="rounded-t-md object-cover h-[100%]"
              />
            </div>
            <div className='text-[14px] font-semibold'>{video.title}</div>
            <div className='flex justify-between w-full text-xs'>
              <p>Category: {video.category} </p>
              <p>||</p>
              <p>{video.total_views} views</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoListSection;