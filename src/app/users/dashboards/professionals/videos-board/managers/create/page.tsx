import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
import VideoForm from './VideoForm'; // Updated form for Video


interface VideoFormProps {
  locale: string;  // Automatically selected language from props
}

const VideoCreatePage:React.FC<VideoFormProps> = ({ locale }) => {
  // State to manage drawer visibility
  const [visible, setVisible] = useState(false);

  // Function to open the drawer
  const showDrawer = () => {
    setVisible(true);
  };

  // Function to close the drawer
  const onClose = () => {
    setVisible(false);
    window.location.reload(); // Reload the page after closing the drawer
  };

  return (
    <div>
      {/* Button to trigger the drawer */}
      <div className="flex flex-col justify-center items-center sm:items-end">
        <Button
          type="primary"
          onClick={showDrawer}
          style={{ marginBottom: 16 }}
          className="w-[90%] lg:w-[400px] bg-yellow-500 border-black border-[1px] text-black"
        >
          Create Video
        </Button>
      </div>

      {/* Drawer with VideoForm inside */}
      <Drawer
        title="Create a New Video"
        placement="right"
        onClose={onClose}
        open={visible}
        width={800}
      >
        <VideoForm language={locale} onClose={onClose} />
      </Drawer>
    </div>
  );
};

export default VideoCreatePage;