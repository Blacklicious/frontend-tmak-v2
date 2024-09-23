import React from 'react';
import { ProjectOutlined, ProfileOutlined,SolutionOutlined, SettingOutlined } from '@ant-design/icons';
import Link from 'next/link';

const NavbarProfile = () => {
  return (
    <div className=''>
      <div className="fixed bottom-0 left-0 w-full flex justify-center items-center p-2">
        <div className=' bg-white/80 shadow-md flex w-[100%]  h-[60px] justify-around  items-center
          rounded-xl p-1'>
          <button className=" text-gray-700 hover:bg-gray-200
            w-[100%] h-[100%] rounded-lg pt-1">
            < Link href="/users/dashboards/" className='flex flex-col items-center justify-center'>
              <ProfileOutlined className="text-2xl" />
              <span className="text-sm">Dashboard</span>
            </Link>
          </button>
         
          <button className=" text-gray-700 hover:bg-gray-200
            w-[100%] h-[100%] rounded-lg pt-1">
            < Link href="/users/dashboards/professionals/articles-board/" className='flex flex-col items-center justify-center'>
              <ProjectOutlined className="text-2xl" />
              <span className="text-sm">Pro</span>
            </Link>
          </button>
          <button className=" text-gray-700 hover:bg-gray-200
            w-[100%] h-[100%] rounded-lg pt-1">
            < Link href="/users/dashboards/businesses/" className='flex flex-col items-center justify-center'>
              <SolutionOutlined className="text-2xl" />
              <span className="text-sm">Business</span>
            </Link>
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
