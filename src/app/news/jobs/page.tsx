'use client'; // Ensures client-side rendering in Next.js

import React, { useEffect, useState } from 'react';
import { Button, Drawer, Form, Input, message, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import Image from 'next/image';
import type { RcFile } from 'antd/lib/upload';
import { UploadFile, UploadProps } from 'antd/lib/upload/interface';
import { refreshAuthToken } from '@/utils/authUtils';
import { useRouter } from 'next/navigation';
import FloatingMenu from '../FloatingMenu';
import Navbar from '@/components/Navbar';

interface Job {
  id: number;
  title: string;
  qualifications: string;
  description: string;
  company: string;
  location: string;
  salary: string;
  expiration_date: string;
}

const JobPage: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [hoveredJobId, setHoveredJobId] = useState<number | null>(null);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null); 
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [form] = Form.useForm();
  const [resumeFile, setResumeFile] = useState<File | null>(null); // Manage resume file
  const [imageFile, setImageFile] = useState<File | null>(null); // Manage image file
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [cvFileList, setCvFileList] = useState<UploadFile[]>([]);
  const router = useRouter();

  // Fetch jobs from API
  const fetchJobs = async () => {
    try {
      const response = await axios.get<Job[]>(`${process.env.NEXT_PUBLIC_API_URL}/news/jobs/api/`);
      setJobs(response.data);
    } catch (error) {
      message.error('Failed to fetch jobs.');
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Open Drawer for job application
  const applyForJob = async (job: Job) => {
    setSelectedJob(job);
		// Check if token is valid when trying to open the drawer
    let token = sessionStorage.getItem('access_token');
    if (!token) {
      // If token doesn't exist, redirect to login
      message.error('User not authenticated. Redirecting to login.');
      router.push('/users/login');
      return;
    }

    try {
      // Try refreshing the token if needed
      token = await refreshAuthToken() || null; // This will refresh the token if it's expired

      if (token) {
        // Token is valid, show the drawer
        setIsDrawerVisible(true);
      } else {
        message.error('Session expired. Redirecting to login.');
        router.push('/users/login');
      }
    } catch (error) {
      console.error('Error verifying token:', error);
      message.error('Error verifying token. Redirecting to login.');
      router.push('/users/login');
    }
  };

  // Close Drawer
  const closeDrawer = () => {
    setIsDrawerVisible(false);
    form.resetFields(); // Reset form fields when drawer closes
    setResumeFile(null); // Reset the resume file state
    setImageFile(null); // Reset the image file state
  };

  // Handle resume upload and validate if it's a PDF
  const handleResumeUpload: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setCvFileList(newFileList);
    const file = newFileList[0]?.originFileObj as RcFile;
    if (file && file.type !== 'application/pdf') {
      message.error('Please upload a PDF file.');
      setCvFileList([]); // Clear the file list if not PDF
      return;
    }
    setResumeFile(file || null);
  };

  // Handle image upload (optional)
  const handleImageUpload: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    const file = newFileList[0]?.originFileObj as RcFile;
    setImageFile(file || null);
  };

  // Handle form submission
  const handleSubmit = async (values: any) => {
    const formData = new FormData();
  
    // Add cover letter
    formData.append('cover_letter', values.cover_letter); 

    // Ensure resume file is present
    if (resumeFile) {
      formData.append('resume', resumeFile); // Add resume file
    } else {
      message.error('Please upload your resume in PDF format.');
      return;
    }

    // Ensure image file is present (optional)
    if (imageFile) {
      formData.append('image', imageFile); // Add image file if available
    }

    formData.append('job_title', selectedJob?.title || '');
		formData.append('job_nzid', selectedJob?.id.toString() || '');

    // Get the access_token from session storage
    const token = sessionStorage.getItem('access_token');
    if (!token) {
      message.error('Authentication token missing. Please log in.');
      return; // Stop form submission if no token is found
    }

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/employee/api/`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`, // Add the token to the headers
          'Content-Type': 'multipart/form-data',
        },
      });
      message.success('Application submitted successfully!');
      closeDrawer();
    } catch (error) {
      message.error('Failed to submit application.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-black">
			< Navbar locale={''} setLocale={function (locale: string): void {
				throw new Error('Function not implemented.');
			} } />
      {/* Job Listings */}
      <div className="container mx-auto p-4">
        <div className="rounded-lg mb-6">
          <Image src="/images/news_hero/news_hero12.png" priority={true} alt="Jobs" width={1200} height={600} className="rounded-md border border-gray-300 shadow-2xl object-cover" />
        </div>

        <div className="bg-white p-4 rounded-lg shadow-lg mb-8">
          <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-4">
            Available Jobs
          </h1>
          <p className="text-center text-gray-600 text-lg">
            Find your perfect job and apply today!
          </p>
        </div>
        
        <ul className="">
          {jobs.map((job) => (
            <li 
              key={job.id} 
              className="bg-white h-[100%] p-6 mb-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 relative"
              onMouseEnter={() => setHoveredJobId(job.id)} 
              onMouseLeave={() => setHoveredJobId(null)}
            >
              <h2 className="text-xl font-bold text-gray-800 mb-2">{job.title}</h2>
              <p className="text-gray-600 mb-2"><strong>Qualifications:</strong> {job.qualifications}</p>
              <p className="text-gray-600 mb-4"><strong>Description:</strong> {job.description}</p>

              {hoveredJobId === job.id && (
                <button
                  className="w-[100%] bg-yellow-500 hover:bg-yellow-600 font-bold py-2 px-4 rounded-lg shadow-lg transition-transform duration-300 ease-in-out"
                  onClick={() => applyForJob(job)}
                >
                  Apply Here !!
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Job Application Drawer */}
      <Drawer
        title={`Apply for job number #${selectedJob?.id}`}
        placement="right"
        onClose={closeDrawer}
        open={isDrawerVisible}
        width={600}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <div className='text-3xl font-bold mb-4'>{selectedJob?.title}</div>
					<div className='mb-6'>
						{/* Google Map */}
						<iframe
                width="100%"
                height="450"
                className='rounded-md shadow-md '
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${encodeURIComponent(selectedJob?.location || 'Bamako, Mali')}`}
              >
              </iframe>
					</div>
          <div className='text-lg '>
            <div className='font-bold'>Qualifications :</div>
            <div className='p-2'>{selectedJob?.qualifications}</div>
          </div>
          <div className='text-lg mb-4'>
            <div className='font-bold'>Descriptions :</div>
            <div className='p-2'>{selectedJob?.description}</div>
          </div>
          <div className='bg-yellow-500 p-1 rounded-md mt-6 mb-4'>
            {/* Resume Upload (PDF Only) */}
            <Upload 
              className='flex flex-col mb-1' 
              maxCount={1} 
              beforeUpload={() => false} 
              fileList={cvFileList}
              onChange={handleResumeUpload} // Handle resume upload
              accept=".pdf" // Only accept PDF files
            >
              <Button icon={<UploadOutlined />} className='w-full'>Upload Curriculum Vitae (PDF)</Button>
            </Upload>

            {/* Image Upload (Optional) */}
            <Upload 
              className='flex flex-col' 
              beforeUpload={() => false} 
              listType="picture" 
              maxCount={1}
              fileList={fileList}
              onChange={handleImageUpload} // Handle image upload
            >
              <Button icon={<UploadOutlined />} className='w-full'>Upload Professional Image</Button>
            </Upload>
          </div>

          {/* Cover Letter Input */}
          <Form.Item
            name="cover_letter"
            label="Cover Letter"
            rules={[{ required: true, message: 'Please provide a cover letter.' }]}
          >
            <Input.TextArea rows={8} placeholder="Write your cover letter here..." />
          </Form.Item>

          <div>*Date limite d'application :{selectedJob?.expiration_date}</div>
          {/* Submit Button */}
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full h-[40px]">
              Submit Application
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
			< FloatingMenu />
    </div>
  );
};

export default JobPage;