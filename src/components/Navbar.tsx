'use client';
import React, { useState, useEffect } from "react";
import { Drawer, Button, Avatar, Select } from "antd";
import { MenuOutlined, UserOutlined,PoweroffOutlined } from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";

const { Option } = Select;

interface NavbarProps {
  locale: string;
  setLocale: (locale: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ locale, setLocale }) => {
  const [visible, setVisible] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);


  useEffect(() => {
    // Grab user and profile data from session storage
    const userData = sessionStorage.getItem('user_data');
    const profileData = sessionStorage.getItem('profile_data');
    
    if (userData) {
      setUser(JSON.parse(userData));
      console.log('User data fetched from session storage:', JSON.parse(userData));
    }

    if (profileData) {
      const parsedProfile = JSON.parse(profileData);
      setProfileImage(parsedProfile?.image || null); // Set profile image from session storage
    }
  }, []);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const handleLanguageChange = (value: string) => {
    setLocale(value);  // Update the locale in the parent component
    sessionStorage.setItem('language', value);  // Store the selected language in
  };

  const handleLogout = () => {
    // Clear user data from session storage
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('refresh_token');
    sessionStorage.removeItem('user_data');
    sessionStorage.removeItem('profile_data');
    window.location.reload(); // Reload the page
  }
  return (
    <div className="flex justify-between items-center py-1 pr-3 bg-white border-b rounded-b-md">
      {/* Logo */}
      <Link href="/" passHref>
        <div className="flex items-center rounded-md h-[70px]">
          <Image src="/images/tmak_logo_lg.png" alt="T-MAK Logo" width={80} height={75} />
        </div>
      </Link>

      {/* Menu Button */}
      <div className="w-[42px] bg-black/80 text-white rounded hover:bg-white hover:border-2 hover:text-black mt-1">
        <button className="h-[60px] w-[100%] text-[20px] font-bold" onClick={showDrawer}>
          <MenuOutlined />
        </button>
      </div>

      {/* Drawer for the menu */}
      <Drawer title="Menu" placement="right" onClose={onClose} open={visible} >
        <Link href="/users/dashboards/" passHref>
          <div className="border-[2px] p-1 rounded-lg w-[100%] flex items-center justify-between hover:bg-black/20">
            {profileImage ? (
              // Display user's profile image if available
              <Avatar
                src={profileImage}
                alt="Profile Image"
                size={50}
                className="h-[50px] w-[50px] rounded-md"
              />
            ) : (
              // Fallback to User icon if no profile image is available
              <div
                className="bg-gray-800/50 h-[50px] w-[50px] rounded-md text-3xl text-white flex items-center justify-center"
                onClick={() => alert("Redirect to login")}
              >
                <UserOutlined />
              </div>
            )}
            <div>
              <div className="text-sm">
                {user ? `Bonjour, ${user.first_name} ${user.last_name}` : 'Bonjour'}
              </div>
              <div className="text-[18px] font-bold">
                {user ? "Welcome to your profile" : "Veuillez vous identifier ?"}
              </div>
            </div>
            <div className="bg-gray-400 h-[50px] w-[12%] flex items-center justify-center rounded-md">
              <img src="/images/icons/equity-security.gif" alt="Loading" className="w-[90%]" />
            </div>
          </div>
        </Link>
        < Link href="/" passHref>
          <Button type="text" className="block w-full mb-2 mt-3">
            Acceuil
          </Button>
        </Link>
        <Button type="text" className="block w-full mb-2 mt-3">
          About T-MAK
        </Button>
        <Button type="text" className="block w-full mb-2">
          The Team
        </Button>
        <Link href="/news/articles/" passHref>
          <Button type="text" className="block w-full mb-2">
            Mining News
          </Button>
        </Link>
        <Button type="text" className="block w-full mb-2">
          Events
        </Button>
        <Button type="text" className="block w-full mb-2">
          Contacts
        </Button>
        <div className="mt-2">
          <Select defaultValue={locale} onChange={handleLanguageChange} style={{ width: '100%', height: 40 }}>
            <Option value="en-US">English</Option>
            <Option value="fr-FR">French</Option>
            <Option value="zh-CN">Chinese</Option>
            <Option value="ar-AR">Arabic</Option>
            <Option value="es-ES">Spanish</Option>
            <Option value="ru-RU">Russian</Option>
            <Option value="pt">Portuguese</Option>
            <Option value="ja">Japanese</Option>
            <Option value="hi">Hindi</Option>
            <Option value="de-DE">German</Option>
          </Select>
        </div>
        {user ? <div className="flex justify-end mt-4">
          <button className="flex w-[100%] mb-2 items-center justify-center text-yellow-500
            p-1 rounded-md border-yellow-500 border-[2px] hover:bg-yellow-500/50 hover:text-black"
            onClick={() => { alert("Logging out..."); handleLogout(); }}
          >
              <PoweroffOutlined className="mr-2"/>Logout
          </button>
        </div> : null}
      </Drawer>
    </div>
  );
};

export default Navbar;