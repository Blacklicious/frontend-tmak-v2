
import React, { useState, useEffect } from 'react';
import EventCreatePage from './create/page';
import EventListSection from './list';

const EventManagerPage: React.FC = () => {
  const [locale, setLocale] = useState<string>('en-US');
  return (
    <div className="w-full flex flex-col p-4">
      {/* CreatePage component with dynamic language */}
      <EventCreatePage locale={locale} />

      {/* ListSection component with fetched Events */}
      <EventListSection locale={locale} />
    </div>
  );
};

export default EventManagerPage;