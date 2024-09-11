import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
import ArticleForm from './Form';

const CreatePage: React.FC = () => {
  // State to manage drawer visibility
  const [visible, setVisible] = useState(false);

  // Function to open the drawer
  const showDrawer = () => {
    setVisible(true);
  };

  // Function to close the drawer
  const onClose = () => {
    setVisible(false);
    window.location.reload(); // Reload the page
  };

  return (
    <div >
      {/* Button to trigger the drawer */}
      <div className='flex flex-col justify-center items-center sm:items-end'>
        <Button type="primary" onClick={showDrawer} style={{ marginBottom: 16 }}
            className='w-[400px] bg-yellow-500 border-black border-[1px] text-black'>
            Create Article
        </Button>
      </div>

      {/* Drawer with ArticleForm inside */}
      <Drawer
        title="Create a New Article"
        placement="right"
        onClose={onClose}
        open={visible}
        width={800}
      >
        <ArticleForm onClose={onClose} />
      </Drawer>
    </div>
  );
};

export default CreatePage;