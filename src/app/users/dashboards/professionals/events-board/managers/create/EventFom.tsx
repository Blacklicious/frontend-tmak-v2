import React, { useState } from 'react';
import { Form, Input, Button, Upload, message, DatePicker, Select, TimePicker } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { UploadFile } from 'antd/lib/upload/interface';  // Correct typing
import axios from 'axios';

const { Option } = Select;

interface EventFormProps {
  onClose: () => void;
}

const EventForm: React.FC<EventFormProps> = ({ onClose }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [bannerFileList, setBannerFileList] = useState<UploadFile[]>([]);

  // Handle file uploads for event banner
  const handleUploadChange = (info: any) => {
    setBannerFileList(info.fileList as UploadFile[]);
  };

  // Handle form submission
  const handleSubmit = async (values: any) => {
    setLoading(true);
    const formData = new FormData();

    formData.append('category', values.category);  
    formData.append('organizer', values.organizer);  
    formData.append('event_type', values.event_type);  
    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('tags', values.tags);
    formData.append('capacity', values.capacity);

    if (values.location) {
      formData.append('location', values.location);
    }

    if (values.start_date && values.start_time) {
      formData.append('start_date', values.start_date.format('YYYY-MM-DD'));  // Format start date
      formData.append('start_time', values.start_time.format('HH:mm'));  // Format start time
    }

    if (values.end_date && values.end_time) {
      formData.append('end_date', values.end_date.format('YYYY-MM-DD'));  // Format end date
      formData.append('end_time', values.end_time.format('HH:mm'));  // Format end time
    }

    if (bannerFileList.length > 0 && bannerFileList[0].originFileObj) {
      formData.append('banner', bannerFileList[0].originFileObj);  // Append banner file
    }

    const token = sessionStorage.getItem('access_token');
    if (!token) {
      message.error('Authentication token missing. Please log in.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/events/api/`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        message.success('Event created successfully!');
        form.resetFields();
        onClose();
      } else {
        throw new Error(`Unexpected status code: ${response.status}`);
      }
    } catch (error) {
      message.error('Failed to create event');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
    >
      {/* Event Title */}
      <Form.Item
        name="title"
        rules={[{ required: true, message: 'Please input the event title!' }]}
      >
        <Input.TextArea rows={2} placeholder="Enter Event Title" />
      </Form.Item>

      {/* Organizer Name */}
      <Form.Item
        name="organizer"
        rules={[{ required: true, message: 'Please input the organizer name!' }]}
      >
        <Input placeholder="Enter Organizer Name" />
      </Form.Item>

      {/* Event Type */}
      <Form.Item
        name="event_type"
        rules={[{ required: true, message: 'Please select an event type!' }]}
      >
        <Select placeholder="Select Event Type">
          <Option value="Conference">Conference</Option>
          <Option value="Workshop">Workshop</Option>
          <Option value="Webinar">Webinar</Option>
          <Option value="Meetup">Meetup</Option>
        </Select>
      </Form.Item>

      {/* Location */}
      <Form.Item
        name="location"
        rules={[{ required: false, message: 'Please input the event location (optional for virtual events)!' }]}
      >
        <Input placeholder="Enter Event Location" />
      </Form.Item>

      {/* Event Description */}
      <Form.Item
        name="description"
        rules={[{ required: true, message: 'Please input the event description!' }]}
      >
        <Input.TextArea rows={4} placeholder="Enter Event Description" />
      </Form.Item>
      <div className='p-2 rounded-md bg-gray-200/70 mb-6 shadow-md'>
        {/* Event Banner Upload */}
          <Upload
            listType="picture"
            maxCount={1}
            beforeUpload={() => false}
            fileList={bannerFileList}
            onChange={handleUploadChange}
            className='w-[100%] flex flex-col'
          >
            <Button icon={<UploadOutlined />}
            className='w-[100%] h-[35px]'
            >
              Upload Event Banner
            </Button>
          </Upload>
        <div className='flex justify-between my-2'>
          {/* Start Date and Time */}
            <DatePicker placeholder="Select Start Date" className='w-[58%]'/>
            <TimePicker use12Hours format="h:mm a"  className='w-[40%]' />
        </div>
        <div className='flex justify-between'>
          {/* End Date and Time */}
            <DatePicker placeholder="Select End Date"  className='w-[58%]' />

            
            <TimePicker use12Hours format="h:mm a"  className='w-[40%]'name="end_time"
          />
        </div>
      </div>

      {/* Capacity */}
      <Form.Item
        name="capacity"
        rules={[{ required: true, message: 'Please input the event capacity!' }]}
      >
        <Input placeholder="Enter Event Capacity" />
      </Form.Item>

      {/* Tags */}
      <Form.Item
        name="tags"
        rules={[{ required: true, message: 'Please input event tags!' }]}
      >
        <Input placeholder="Enter Event Tags (e.g. business, networking)" />
      </Form.Item>

      {/* Submit Button */}
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Create Event
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EventForm;