'use client';

import Navbar from '@/components/Navbar';
import { Button } from 'antd';
import { useEffect, useState } from 'react';
import { StepBackwardOutlined, LikeOutlined, SaveOutlined, ShareAltOutlined } from '@ant-design/icons';

interface Video {
  id: number;
  link: string; // Assuming this holds the video URL
  title: string;
  description: string;
}

export default function VideoDetailPage({ params }: { params: { id: number } }) {
  const [linkUrl, setlinkUrl] = useState<string | null>(null);
  const [videoDetails, setVideoDetails] = useState<Video | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch video details from your own backend
  const fetchVideoDetails = async () => {
    try {
      const response = await fetch(`http://192.168.1.3:8000/news/video/${params.id}/api/`);
      const data = await response.json();
      if (data.length > 0) {
        const video = data[0];
        setVideoDetails(video);

        // Ensure content exists before setting video URL
        if (video.link) {
          setlinkUrl(video.link); // Assuming 'link' contains the video URL
        } else {
          setError("Video content not available.");
        }
      } else {
        setError("No video details found.");
      }
    } catch (error) {
      setError("Error fetching video details");
      console.error('Error fetching video details:', error);
    }
  };

  useEffect(() => {
    fetchVideoDetails();
  }, [params.id]);

  if (error) return <div>{error}</div>;
  if (!linkUrl) return <div>Loading Video...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Navbar */}
      <Navbar locale="en-GB" setLocale={() => { }} />

      {/* Header Section */}
      <div className="px-4 py-6 flex flex-col items-center justify-center">
        <Button
          className="mb-4 bg-white/10 text-white hover:bg-white/20 flex items-center justify-center"
          onClick={() => window.history.back()}
          icon={<StepBackwardOutlined />}
        >
          Back
        </Button>
        <h1 className="text-3xl font-bold mb-2 text-center">{videoDetails?.title}</h1>
        <p className="text-md text-gray-400 text-center max-w-4xl">{videoDetails?.description}</p>
      </div>

      {/* Video Player Section */}
      <div className="flex-grow relative flex justify-center items-center">
        <iframe
          src={`${linkUrl}`}
          title="Video player"
          className="w-full h-[400px] max-h-[80vh] object-cover
            md:h-[500px] lg:h-[600px] rounded-lg shadow-lg"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>

      {/* Action Buttons Section */}
      <div className="bg-gray-800 py-4 flex justify-center items-center space-x-6">
        <Button
          className="bg-white/10 text-white hover:bg-white/20"
          icon={<LikeOutlined />}
        >
          Like
        </Button>
        <Button
          className="bg-white/10 text-white hover:bg-white/20"
          icon={<SaveOutlined />}
        >
          Save
        </Button>
        <Button
          className="bg-white/10 text-white hover:bg-white/20"
          icon={<ShareAltOutlined />}
        >
          Share
        </Button>
      </div>
    </div>
  );
}