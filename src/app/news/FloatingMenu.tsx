import Link from 'next/link';
import React from 'react';

const FloatingMenu: React.FC = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black text-white flex justify-around w-[100%] p-1">
      <Link href="/news/articles/" className="focus:outline-none
        hover:font-bold hover:bg-yellow-500/90 hover:text-black hover:border-[2px] hover:border-black/10  h-[46px] w-[25%] rounded">
      <button
        className=" w-[100%] h-[100%]"
        
      >
        Articles
      </button>
      </Link>
      <Link href="/news/magazines/" className="focus:outline-none
        hover:font-bold hover:bg-yellow-500/90 hover:text-black hover:border-[2px] hover:border-black/10  h-[46px] w-[25%] rounded">
      <button
        className=" w-[100%] h-[100%]"
        
      >
        Magazines
      </button>
      </Link>
      <Link href="/news/videos/" className="focus:outline-none  hover:bg-yellow-500/90 hover:text-black hover:border-[2px] hover:border-black/10 
            hover:font-black h-[46px] w-[25%] rounded">
        <button
          className="focus:outline-none hover:bg-yellow-500/90 hover:text-black hover:border-[2px] hover:border-black/10 
            hover:font-black h-[100%] w-[100%] "
        >
          Videos
        </button>
      </Link>
      <Link href="/news/jobs/" className="focus:outline-none
        hover:font-bold hover:bg-yellow-500/90 hover:text-black hover:border-[2px] hover:border-black/10  h-[46px] w-[25%] rounded">
        <button
          className=" w-[100%] h-[100%]"
          
        >
          Emploi
        </button>
      </Link>
      {/* Floating menu <NewsNavbar />
      */}
    </nav>
  );
};

export default FloatingMenu;