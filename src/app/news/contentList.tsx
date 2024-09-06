import React from 'react';
import { ContentItem } from '../utils/contentData';
import { useRouter } from 'next/navigation';

interface ContentListProps {
  content: ContentItem[];
  language: string; // Add language prop to handle multilingual content
}

const ContentList: React.FC<ContentListProps> = ({ content, language }) => {
  const router = useRouter();
  const handleArticleClick = (id: number) => {
    router.push(`/news/${id}`);
  };

  console.log('|----> ContentList.tsx');
  console.log(content);
  console.log(language);
  
  return (
    <>
      {content.map((item) => {
        const titleLength = item.title[language]?.length || item.title['en']?.length || 0;
        const imageContainerClass = titleLength > 85 ? 'w-[100%] h-[220px] mb-2' : 'w-[32%]';
        const infoContainerClass = titleLength > 85 ? 'w-[100%]' : 'w-[67%] pl-2';


        return (
          <div key={item.id} className="p-4 border-b w-[100%] flex flex-wrap justify-between
          cursor-pointer" onClick={() => handleArticleClick(item.id)}>
            <div className={`${imageContainerClass} bg-gray-300 rounded-md p-2`}>
              {/* Placeholder for image */}
              <p>image</p>
            </div>
            <div className={`${infoContainerClass}  p-1`}>
              <h2 className="text-[17px] font-semibold">
                {item.title[language] || item.title['en'] || 'Title not available'}
              </h2>
              <p className='text-sm'>
                {item.content[language]?.slice(0, 100) || item.content['en']?.slice(0, 100) || 'Content not available'}...
              </p> {/* Show a snippet of the content */}
              <p className="text-sm text-gray-500">Date: {item.date} | Views: {item.views}</p>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ContentList;