import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
import EventForm from './EventFom'; // Updated form for Event


interface EventFormProps {
  locale: string;  // Automatically selected language from props
}

const EventCreatePage:React.FC<EventFormProps> = ({ locale }) => {
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
          Create Event
        </Button>
      </div>

      {/* Drawer with EventForm inside */}
      <Drawer
        title="Create a New Event"
        placement="right"
        onClose={onClose}
        open={visible}
        width={800}
      >
        <EventForm   onClose={onClose} />
      </Drawer>
    </div>
  );
};

export default EventCreatePage;