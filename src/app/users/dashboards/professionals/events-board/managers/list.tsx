'use client';

import React, { useState, useEffect } from 'react';
import { Button, message, Modal, Card } from 'antd';
import axios from 'axios';
import Image from 'next/image';

interface Event {
  id: number;
  title: string;
  description: string;
  location: string;
  event_date: string;
  tags: string[];
  image: string;
}

interface EventListProps {
  locale: string;
}

const EventList: React.FC<EventListProps> = ({ locale }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  // Fetch events from the API
  const fetchEvents = async () => {
    try {
      const response = await axios.get<Event[]>(`${process.env.NEXT_PUBLIC_API_URL}/events/api/`);
      setEvents(response.data);
      setLoading(false);
    } catch (error) {
      message.error('Failed to fetch events');
    }
  };

  // Handle Event deletion
  const handleDelete = async (id: number) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this event?',
      okText: 'Yes, Delete',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          const token = sessionStorage.getItem('access_token');
          if (!token) {
            message.error('User not authenticated');
            return;
          }

          await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/events/${id}/delete/`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          message.success('Event deleted successfully');
          fetchEvents(); // Refresh the event list
        } catch (error) {
          message.error('Failed to delete event');
        }
      },
    });
  };

  return (
    <div>
      <h2>Event List ({locale})</h2>

      <div className="flex flex-wrap justify-around w-full mb-[60px]">
        {events.map((event) => (
          <div key={event.id} className="bg-white rounded-md shadow-md p-2 w-[48%] sm:w-[31%] md:w-[23%] lg:w-[19%] xl:w-[15%] mt-4">
            <div className="flex justify-between pb-1">
              <Button className="h-[26px]">Edit</Button>
              <Button danger className="h-[26px]" onClick={() => handleDelete(event.id)}>Delete</Button>
            </div>
            <div className="w-full">
              {event.image && (
                <Image src={event.image} alt={event.title || "Event Image"} width={500} height={300} className="rounded-md object-cover" />
              )}
            </div>
            <div className="text-[14px] font-semibold mt-2">{event.title}</div>
            <p className="text-xs">{event.description}</p>
            <p className="text-xs">Location: {event.location}</p>
            <p className="text-xs">Date: {new Date(event.event_date).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;