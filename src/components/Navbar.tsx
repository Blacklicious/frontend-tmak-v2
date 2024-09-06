'use client';
import React, { useState } from "react";
import { Drawer, Button, Avatar, Select } from "antd";
import { MenuOutlined, UserOutlined } from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";

const { Option } = Select;

interface NavbarProps {
    locale: string;
    setLocale: (locale: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ locale, setLocale }) => {
  const [visible, setVisible] = useState(false);
  const [language, setLanguage] = useState<string>("en");

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const handleLanguageChange = (value: string) => {
    setLocale(value);  // Update the locale in the Home component
  };

  return (
    <div className="flex justify-between items-center p-1 bg-gray-100
     border-b rounded-md">
      {/* Logo */}
      <div className="flex items-center bg-gray-300 rounded-md h-[50px]">
        <Image src="/images/logo.png" alt="T-MAK Logo" width={80} height={40} />
      </div>

      {/* Menu Button */}
      <div className="w-[40px] bg-black/80 rounded-md ">
        <button className="h-[50px] w-[100%] text-[20px] font-bold text-white" onClick={showDrawer}>
            <MenuOutlined />
        </button>
      </div>

      {/* Drawer for the menu */}
      <Drawer title="Menu" placement="right" onClose={onClose} visible={visible}>
        <Link href="users/auths/login/" passHref>
          <div className="border-[2px] p-1 rounded-lg w-[100%] flex items-center justify-between
            hover:bg-black/20">
            <div className="bg-gray-800/50 h-[50px] w-[50px] rounded-md 
              text-3xl text-white flex items-center justify-center"
              onClick={() => alert("Redirect to login")}
            > 
              <UserOutlined />
            </div>
            <div>
              <div className="text-sm "> Bonjour </div>
              <div className="text-[18px] font-bold ">Veulliez vous Identifier ? </div>  
            </div>
            <div className="bg-gray-400 h-[50px] w-[12%] flex items-center justify-center
              rounded-md"
            >
              <img src="/images/icons/equity-security.gif" alt="Loading" className=" w-[90%]" />
            </div>
          </div>
        </Link>
        <Button type="text" className="block w-full mb-2 mt-3">
          About T-MAK
        </Button>
        <Button type="text" className="block w-full mb-2">
          The Team
        </Button>
        <Link href="/news" passHref> {/* Link to the /news/ route */}
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
            <Option value="en">English</Option>
            <Option value="fr">French</Option>
            <Option value="zh-cn">Chinese</Option>
            <Option value="ar">Arabic</Option>
            <Option value="es">Spanish</Option>
            <Option value="ru">Russian</Option>
            <Option value="pt">Portuguese</Option>
            <Option value="ja">Japanese</Option>
            <Option value="hi">Hindi</Option>
            <Option value="de">German</Option>
          </Select>
        </div>
      </Drawer>
    </div>
  );
};

export default Navbar;