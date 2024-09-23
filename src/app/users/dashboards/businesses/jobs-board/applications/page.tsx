'use client';

import React, { useEffect, useState } from 'react';
import { Drawer, Button, message } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import EditJobApplicationPage from './edit';
import axios from 'axios';

interface User{
  id: number;
  email: string;
}
interface Application {
  id: number;
  title: string;
  user: User;
  cover_letter: string;
  resume: string;
  job: number;
  job_email: string;
  created_at: string;
  updated_at: string;
  status: string;
}

interface JobApplicationPageProps {
  locale: string;
  job: number;
}

const JobApplicationPage: React.FC<JobApplicationPageProps> = ({ locale, job }) => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);

  // Fetch applications for the selected job
  const fetchApplications = async () => {
    try {
      const response = await axios.get<Application[]>( `${process.env.NEXT_PUBLIC_API_URL}/users/employees/application/${job}/api/`,
        { headers: { Authorization: `Bearer ${sessionStorage.getItem('access_token')}` } }
      );
      setApplications(response.data);
    } catch (error) {
      message.error('Failed to fetch applications');
    }
  };

  useEffect(() => {
    fetchApplications(); // Fetch applications whenever the job changes
  }, [job]);

  // Open drawer with selected application
  const openDrawer = (application: Application) => {
    setSelectedApplication(application);
    setIsDrawerVisible(true);
  };

  // Close the drawer
  const closeDrawer = () => {
    setIsDrawerVisible(false);
    setSelectedApplication(null); // Reset the selected application
  };

  return (
    <div className="p-2 bg-white rounded-md w-full text-black">
      {/* List of Job Applications */}
      <div>
        {applications.length > 0 ? (
          <ul className="list-disc">
            {applications.map((application) => (
              <li
                key={application.id}
                className="bg-gray-200 pl-3 rounded-md flex justify-between items-center shadow-md p-1 mb-2"
              >
                <div className="font-bold w-[80%]">{application.user.email}</div>
                <Button
                  type="primary"
                  className="w-[18%] font-bold text-lg bg-yellow-500 hover:bg-yellow-600 text-black"
                  onClick={() => openDrawer(application)}
                >
                  <EyeOutlined />
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No applications found for this job.</p>
        )}
      </div>

      {/* Drawer for editing job application */}
      <Drawer
        title="Edit Job Application"
        placement="right"
        onClose={closeDrawer}
        open={isDrawerVisible} // Changed from 'visible' to 'open'
        width={720}
      >
        {selectedApplication && (
          <EditJobApplicationPage application={selectedApplication} />
        )}
      </Drawer>
    </div>
  );
};

export default JobApplicationPage;