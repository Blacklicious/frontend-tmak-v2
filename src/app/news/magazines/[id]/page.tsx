'use client';

import Navbar from '@/components/Navbar';
import { Button } from 'antd';
import { useEffect, useState } from 'react';
import { StepBackwardOutlined } from '@ant-design/icons';


interface Magazine {
  id: number;
  content: string; // Assuming this holds the PDF filename in Google Cloud Storage
  title: string;
}

export default function MagazineDetailPage({ params }: { params: { id: number } }) {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [magazineDetails, setMagazineDetails] = useState<Magazine | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch magazine details from your own backend
  const fetchMagazineDetails = async () => {
    try {
      const response = await fetch(`http://192.168.1.3:8000/news/magazine/${params.id}/api/`);
      const data = await response.json();
      if (data.length > 0) {
        const magazine = data[0];
        setMagazineDetails(magazine);

        // Ensure content exists before setting PDF URL
        if (magazine.content) {
          setPdfUrl(magazine.content); // Assuming 'content' contains the PDF filename or URL
        } else {
          setError("PDF content not available.");
        }
      } else {
        setError("No magazine details found.");
      }
    } catch (error) {
      setError("Error fetching magazine details");
      console.error('Error fetching magazine details:', error);
    }
  };

  useEffect(() => {
    fetchMagazineDetails();
  }, [params.id]);


  if (error) return <div>{error}</div>;
  if (!pdfUrl) return <div>Loading PDF...</div>;

  return (
    <div className='w-[100vw] bg-black '>
      < Navbar locale='en-GB' setLocale={() => { }} />
      <div className='h-[60px] p-[10px] flex items-center justify-between'>
        <Button className=' h-[100%] w-[26%] bg-white/10 text-white' 
          onClick={() => window.history.back()}>
            <StepBackwardOutlined />
            Back
        </Button>
        <div className='w-[60%] h-[100%] flex justify-between'>
          <Button className='h-[100%] w-[31%]'>
            like 
          </Button>
          <Button className='h-[100%] w-[31%]'>
            save
          </Button>
          <Button className='h-[100%] w-[31%]'>
            share
          </Button>
        </div>
      </div>
      <div 
       style={{ width: '100%', height: '100vh' }}
      >
        <iframe src={"https://docs.google.com/viewer?url=" + encodeURIComponent(pdfUrl) + "&embedded=true"} width="100%" height="94%"></iframe>

      </div>
    </div>
  );
}