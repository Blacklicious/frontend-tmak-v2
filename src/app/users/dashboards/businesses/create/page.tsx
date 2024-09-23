import React, { useState } from 'react';
import { Button, Drawer, message } from 'antd';
import BusinessForm from './form-business/page';
import { refreshAuthToken } from '@/utils/authUtils';
import { useRouter } from 'next/navigation';

const BusinessCreatePage: React.FC = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
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


  const closeDrawer = () => {
    setDrawerVisible(false);
    window.location.reload();
  };

  return (
    <div className='h-[100%]'>
      {/* Button to open Drawer */}
      <Button type="primary" onClick={showDrawer}
        className='w-[100%] h-[200px] rounded-lg font-bold text-3xl'>
        + 
      </Button>

      {/* Drawer for the Business Form */}
      <Drawer
        title="Create Business"
        width={720}
        onClose={closeDrawer}
        visible={drawerVisible}
        bodyStyle={{ paddingBottom: 80 }}
      >
        {/* Business Form inside the Drawer */}
        <BusinessForm />
      </Drawer>
    </div>
  );
};

export default BusinessCreatePage;