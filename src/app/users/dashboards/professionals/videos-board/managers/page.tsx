
import React, { useState, useEffect } from 'react';
import VideoCreatePage from './create/page';
import VideoListSection from './list';

const VideoManagerPage: React.FC = () => {
  const [locale, setLocale] = useState<string>('en-US');
  return (
    <div className="w-full flex flex-col p-4">
      {/* CreatePage component with dynamic language */}
      <VideoCreatePage locale={locale} />

      {/* ListSection component with fetched Videos */}
      <VideoListSection locale={locale} />
    </div>
  );
};

export default VideoManagerPage;