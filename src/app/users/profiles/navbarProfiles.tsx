import React from 'react';
import { ProjectOutlined, UserOutlined,SolutionOutlined, SettingOutlined } from '@ant-design/icons';

const NavbarProfile = () => {
  return (
    <div className=''>
      <div className="fixed bottom-0 left-0 w-full flex justify-center items-center p-2">
        <div className=' bg-white/50 shadow-md flex w-[100%]  h-[60px] justify-around  items-center
          rounded-xl p-1'>
          <button className="flex flex-col items-center justify-center text-gray-700 hover:bg-gray-200
            w-[100%] h-[100%] rounded-lg pt-1">
            <UserOutlined className="text-2xl" />
            <span className="text-sm">Member</span>
          </button>
          <button className="flex flex-col items-center justify-center text-gray-700 hover:bg-gray-200
            w-[100%] h-[100%] rounded-lg pt-1">
            <ProjectOutlined className="text-2xl" />
            <span className="text-sm">Events</span>
          </button>
          <button className="flex flex-col items-center justify-center text-gray-700 hover:bg-gray-200
            w-[100%] h-[100%] rounded-lg pt-1">
            <SolutionOutlined className="text-2xl" />
            <span className="text-sm">Pro</span>
          </button>
          <button className="flex flex-col items-center justify-center text-gray-700 hover:bg-gray-200
            w-[100%] h-[100%] rounded-lg pt-1">
            <SettingOutlined className="text-2xl" />
            <span className="text-sm">Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default NavbarProfile;
