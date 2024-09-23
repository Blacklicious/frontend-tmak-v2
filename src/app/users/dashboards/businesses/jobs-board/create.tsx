import React, { useState, useEffect } from 'react';
import { Button, DatePicker, Drawer, Form, Input, message, Select } from 'antd';
import axios from 'axios';
import moment from 'moment';
import SelectBusiness from '@/app/users/registration/employees/selectBusiness';
import { useRouter } from 'next/navigation';
import { refreshAuthToken } from '@/utils/authUtils';

interface JobFormProps {
  locale: string;
  businessId: number;
}

const { Option } = Select;

const JobCreatePage: React.FC<JobFormProps> = ({ locale, businessId }) => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // Function to toggle the drawer visibility after token validation
  const showDrawer = async () => {
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
        setDrawerVisible(true);
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

  // Function to close the drawer
  const onClose = () => {
    setDrawerVisible(false);
    window.location.reload(); // Reload the page after closing the drawer
  };

  // Handle form submission
  const handleSubmit = async (values: any) => {
    setLoading(true);
    console.log("businessId---->", businessId);  // Check if businessId is correct here
    // Create a new FormData object
    const formData = new FormData();
    formData.append('company', businessId.toString()); // Use 'company' as the field name
    formData.append('title', values.title);
    formData.append('job_type', values.job_type);
    formData.append('description', values.description);
    formData.append('qualifications', values.qualifications);
    formData.append('location', values.location);
    formData.append('salary_range', values.salary_range || ''); // Optional
    formData.append('platform', values.platform || ''); // Optional
    formData.append('status', values.status || 'active'); // Default to 'active'
    
    // Add dates
    if (values.expiration_date) {
      formData.append('expiration_date', values.expiration_date.format('YYYY-MM-DD'));
    }
    formData.append('posted_date', moment().format('YYYY-MM-DD')); // Use current date as posted date

    // Get token from session storage
    const token = sessionStorage.getItem('access_token');
    if (!token) {
      message.error('Authentication token missing. Please log in.');
      setLoading(false);
      return;
    }

    try {
      // Axios request to create a job
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/news/job/api/`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        message.success('Job created successfully!');
        form.resetFields();
        onClose(); // Close the drawer
      } else {
        throw new Error(`Unexpected status code: ${response.status}`);
      }
    } catch (error) {
      message.error('Failed to create job');
      console.error('Error:', error);


    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Button to trigger the drawer */}
      <div className="flex flex-col justify-center items-center sm:items-end">
        <Button
          type="primary"
          onClick={showDrawer}
          className="mb-2 w-[100%] h-[35px] bg-yellow-500 border-black border-[1px] text-black"
        >
          Create Job
        </Button>
      </div>

      {/* Drawer with JobForm inside */}
      <Drawer
        title="Create a New Job"
        placement="right"
        onClose={onClose}
        open={drawerVisible}
        width={800}
      >

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >

          
          {/* Job Title */}
          <Form.Item
            name="title"
            label="Job Title"
            rules={[{ required: true, message: 'Please input the job title!' }]}
          >
            <Input placeholder="Enter Job Title" />
          </Form.Item>

          {/* Job Type */}
          <Form.Item
            name="job_type"
            label="Job Type"
            rules={[{ required: true, message: 'Please select the job type!' }]}
          >
            <Select placeholder="Select Job Type">
              <Option value="full-time">Full-time</Option>
              <Option value="part-time">Part-time</Option>
              <Option value="contract">Contract</Option>
            </Select>
          </Form.Item>

          {/* Location */}
          <Form.Item
            name="location"
            label="Location"
            rules={[{ required: true, message: 'Please input the job location!' }]}
          >
            <Input placeholder="Enter Job Location" />
          </Form.Item>


          {/* Qualifications */}
          <Form.Item
            name="qualifications"
            label="Qualifications"
            rules={[{ required: true, message: 'Please input the qualifications!' }]}
          >
            <Input.TextArea rows={4} placeholder="Enter Required Qualifications" />
          </Form.Item>

          {/* Description */}
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please input the job description!' }]}
          >
            <Input.TextArea rows={6} placeholder="Enter Job Description" />
          </Form.Item>

          {/* Salary Range */}
            <div>Salary Range</div>
            <div className='flex justify-between mt-2 mb-6'>
                <Input className='w-[48%]' placeholder="Range min (Optional)" />
                <Input className='w-[48%]' placeholder="Range max (Optional)" />
            </div>

          {/* Expiration Date */}
          <Form.Item
            name="expiration_date"
            label="Expiration Date"
            rules={[{ required: true, message: 'Please select the expiration date!' }]}
          >
            <DatePicker className="w-[100%]" placeholder="Select Expiration Date" />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} className='w-[100%] h-[45px] text-lg font-bold'>
              Create Job
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default JobCreatePage;