
import React, { useState, useEffect } from 'react';
import MagazineCreatePage from './create/page';
import MagazineListSection from './list';

const MagazineManagerPage: React.FC = () => {
  const [locale, setLocale] = useState<string>('en-US');
  return (
    <div className="w-full flex flex-col p-4">
      {/* CreatePage component with dynamic language */}
      <MagazineCreatePage locale={locale} />

      {/* ListSection component with fetched magazines */}
      <MagazineListSection locale={locale} />
    </div>
  );
};

export default MagazineManagerPage;