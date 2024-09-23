import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message, Select } from 'antd';
import axios from 'axios';
import Image from 'next/image';

const { Option } = Select;

interface Application {
  id: number;
  role: string;
  image: string | null;
  cover_letter: string;
  resume: string;
  job_nzid: number;
  job_department: string;
  job_title: string;
  job_email: string;
  job_phone: string;
  status: string;
  created_at: string;
  updated_at: string;
  user: {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
  };
  business: number;
}

interface EditJobApplicationPageProps {
  application: Application; // The array of job applications
  job: {
    id: number;
    title: string;
    department: string;
    description: string;
    // Add other fields as necessary
  }[];
}

const EditJobApplicationPage: React.FC<EditJobApplicationPageProps> = ({ application }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Set form fields with application data
  useEffect(() => {
    form.setFieldsValue({
      applicantName: `${application.user.first_name} ${application.user.last_name}`,
      email: application.user.email,
      resume: application.resume,
      coverLetter: application.cover_letter,
      jobTitle: application.job_title,
      jobDepartment: application.job_department,
      jobEmail: application.job_email,
      jobPhone: application.job_phone,
      status: application.status,  // We will allow updating this field
    });
  }, [application, form]);

  // Handle form submission
  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      // Submit updated status
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/users/employee/${application.id}/api`, {
        status: values.status, // Only updating the status
      });
      message.success('Job application status updated successfully!');
    } catch (error) {
      message.error('Failed to update job application.');
    } finally {
      setLoading(false);
    }
  };

  // Handling newlines in cover letter with the secure JSX approach
  const formattedCoverLetter = application.cover_letter.split('\n').map((line, index) => (
    <React.Fragment key={index}>
      {line}
      <br />
    </React.Fragment>
  ));

  return (
    <div className='text-black'>        
    <div className='text-xl mb-2'><strong>Job:</strong> {application.job_title}</div>      
      <div className=' bg-gray-200 rounded-lg flex flex-col justify-between shadow-md'>
      <div className='w-[100%] h-[300px] bg-gray-200 rounded-t-md flex justify-center items-center'>
        <div className='relative w-full h-full'>
          <Image
            src={application.image ? application.image : '/images/default-avatar.png'}
            alt='avatar'
            layout='fill' // Makes the image fill the parent container
            className='rounded-t-md object-cover' // Ensures the image maintains aspect ratio and covers the container
            onError={(e) => {
              // If the image fails to load, fallback to default avatar
              (e.target as HTMLImageElement).src = '/images/default-avatar.png';
            }}
          />
        </div>
      </div>
        <div className='bg-white border w-[100%] py-2 px-3 rounded-b-md'>
          <div className='text-xl font-bold'>{`${application.user.first_name} ${application.user.last_name}`}</div>
          <div>{application.user.email}</div>
          {/*
          <div>
            <div>{application.profile.sexe}</div>
            <div>{application.profile.age}</div>
          </div>
          */}
        </div>
      </div>
      <div className='px-2 py-4'>
        <div><strong>Department:</strong> {application.job_department}</div>
        <div><strong>Date d'application: </strong>{application.created_at}</div>
        <div>{}</div>
      </div>
      <div>
        < iframe className='rounded-lg  mb-6'
          src={"https://docs.google.com/viewer?url=" + encodeURIComponent(application.resume) + "&embedded=true"} width="100%" height="530px" />
        <div className='p-3 bg-gray-200 rounded-lg mb-6'>
          <div className='bg-white rounded-md py-2 px-2 shadow-lg'>
            <div className=' mb-2 text-lg font-bold underline'>Cover Letter:</div>
            <div>{formattedCoverLetter}</div>
          </div>
        </div>
      </div>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>

        {/* Status - Editable */}
        <Form.Item
          name="status"
          label="Application Status"
          rules={[{ required: true, message: 'Please select a status!' }]}
        >
          <Select placeholder="Select Status">
            <Option value="pending">Pending</Option>
            <Option value="approved">Approved</Option>
            <Option value="rejected">Rejected</Option>
          </Select>
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}
            disabled
            className='w-full h-[45px]'>
            Update Status
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditJobApplicationPage;