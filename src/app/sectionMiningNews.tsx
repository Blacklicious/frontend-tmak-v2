import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { Carousel } from "antd";  // Import Carousel from antd


const MiningNewsSection = () => {
  return (
    <div>
        {/* Minings News Section */}
        <div id="mining-news-section" className="w-[100%] h-[100%] flex flex-col justify-center
         items-center p-4  bg-white text-black">
          <h1 className="text-[44px] md:text-6xl font-extrabold mt-4 ">MINING NEWS</h1>
          <p className="text-sm md:text-xl mb-5 px-4 md:px-[14vw] mt-4 ">
            Vous recherchez les informations les plus fiables et récentes sur l&apos;industrie minière en Afrique ?
            Chez T-MAK Corporation, nous sommes la référence en matière de couverture des actualités minières à travers 
            tout le continent africain.
          </p>
          {/* Hero Section with Ant Design Carousel */}
          <div className="my-3 w-[100%]  rounded-lg  bg-black/20
            lg:hidden">
            <Carousel autoplay className='h-[500px] shadow-md'>
              <div className='h-[100%]'>
                <Link href="/news/"className='w-[50%] md:w-[200px] lg:w-[250px]'>
                  <div className=" hover:shadow-lg bg-gray-100 transition-shadow rounded-lg duration-300 ease-in-out  m-2 text-xs">
                    <div className="relative bg-black/90 p-8 rounded-t-lg">
                      <Image width={300} height={500} className='  ' src="/images/mining-news-button/maliminingnews.PNG" alt="Mali News" />
                    </div>
                    <div className="p-2">
                      <h3 className="font-bold">MALI MINING NEWS</h3>
                    </div>
                  </div>
                </Link>
                <div className=" flex lg:flex-wrap justify-between px-2 w-[100%] "> 
                  <div className='w-[23%] h-[80px]'>
                    <Link href="/news/ci" className='w-[100%] md:w-[200px] lg:w-[250px]'>
                      <div className=" hover:shadow-lg bg-gray-100 transition-shadow rounded-lg
                         duration-300 ease-in-out  text-xs w-[100%]">
                        <div className="relative bg-black/90 p-1 rounded-lg">
                          <Image width={300} height={500} className=' h-[100%] w-[100%]' src="/images/mining-news-button/ciminingnews.PNG" alt="Cote Ivoire Mining News" />
                        </div>
                      </div>
                    </Link>
                  </div> 
                  <div className='w-[23%] h-[50px]'>
                      <Link href="/news/gn" className='w-[100%] md:w-[200px] lg:w-[250px]'>  
                      <div className=" hover:shadow-lg bg-gray-100 transition-shadow rounded-lg
                        w-[100%] duration-300 ease-in-out  text-xs">
                        <div className="relative bg-black/90 p-1 rounded-lg">
                          <Image width={300} height={500} className=' w-[100%] h-[100%]' src="/images/mining-news-button/guineaminingnews.PNG" alt="Guinea Mining News" />
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className='w-[23%] h-[50px]'>
                      <Link href="/news/bf" className='w-[100%] md:w-[200px] lg:w-[250px]'>
                      <div className=" hover:shadow-lg bg-gray-100 transition-shadow rounded-lg
                        w-[100%] duration-300 ease-in-out text-xs">
                        <div className="relative bg-black/90 p-1 rounded-md">
                          <Image width={300} height={500} className=' w-[100%] h-[100%] ' src="/images/mining-news-button/bkminingnews.PNG" alt="Burkina Faso Mining News" />
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className='w-[23%] h-[50px]'>
                      <Link href="/news/ne" className='w-[100%] md:w-[200px] lg:w-[250px]'>  
                      <div className=" hover:shadow-lg bg-gray-100 transition-shadow rounded-lg
                        w-[100%] duration-300 ease-in-out text-xs">
                        <div className="relative bg-black/90 p-1 rounded-md">
                          <Image width={300} height={500} className=' w-[100%] h-[100%] ' src="/images/mining-news-button/nigerminingnews.png" alt="Niger Mining News" />
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
              <div>
                <Link href="/news/ci" className='w-[50%] md:w-[200px] lg:w-[250px]'>
                  <div className=" hover:shadow-lg bg-gray-100 transition-shadow rounded-lg duration-300 ease-in-out  m-2 text-xs">
                    <div className="relative bg-black/90 p-8 rounded-t-lg">
                      <Image width={300} height={500} className='  ' src="/images/mining-news-button/ciminingnews.PNG" alt="Cote Ivoire Mining News" />
                    </div>
                    <div className="p-2">
                      <h3 className="font-bold">COTE D&apos;IVOIRE MINING NEWS</h3>
                    
                    </div>
                  </div>
                </Link>
                <div className=" flex lg:flex-wrap justify-between px-2 w-[100%] "> 
                  <div className='w-[23%] h-[50px]'>
                      <Link href="/news/gn" className='w-[100%] md:w-[200px] lg:w-[250px]'>  
                      <div className=" hover:shadow-lg bg-gray-100 transition-shadow rounded-lg
                        w-[100%] duration-300 ease-in-out  text-xs">
                        <div className="relative bg-black/90 p-1 rounded-lg">
                          <Image width={300} height={500} className=' w-[100%] h-[100%]' src="/images/mining-news-button/guineaminingnews.PNG" alt="Guinea Mining News" />
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className='w-[23%] h-[50px]'>
                      <Link href="/news/bf" className='w-[100%] md:w-[200px] lg:w-[250px]'>
                      <div className=" hover:shadow-lg bg-gray-100 transition-shadow rounded-lg
                        w-[100%] duration-300 ease-in-out text-xs">
                        <div className="relative bg-black/90 p-1 rounded-md">
                          <Image width={300} height={500} className=' w-[100%] h-[100%] ' src="/images/mining-news-button/bkminingnews.PNG" alt="Burkina Faso Mining News" />
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className='w-[23%] h-[50px]'>
                      <Link href="/news/ne" className='w-[100%] md:w-[200px] lg:w-[250px]'>  
                      <div className=" hover:shadow-lg bg-gray-100 transition-shadow rounded-lg
                        w-[100%] duration-300 ease-in-out text-xs">
                        <div className="relative bg-black/90 p-1 rounded-md">
                          <Image width={300} height={500} className=' w-[100%] h-[100%] ' src="/images/mining-news-button/nigerminingnews.png" alt="Niger Mining News" />
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className='w-[23%] h-[80px]'>
                    <Link href="/news/ml" className='w-[100%] md:w-[200px] lg:w-[250px]'>
                      <div className=" hover:shadow-lg bg-gray-100 transition-shadow rounded-lg
                         duration-300 ease-in-out  text-xs w-[100%]">
                        <div className="relative bg-black/90 p-1 rounded-lg">
                          <Image width={300} height={500} className=' h-[100%] w-[100%]' src="/images/mining-news-button/maliminingnews.PNG" alt="Cote Ivoire Mining News" />
                        </div>
                      </div>
                    </Link>
                  </div> 
                </div>
              </div> 
              <div>
                <Link href="/news/gn" className='w-[50%] md:w-[200px] lg:w-[250px]'>  
                  <div className=" hover:shadow-lg bg-gray-100 transition-shadow rounded-lg duration-300 ease-in-out  m-2 text-xs">
                    <div className="relative bg-black/90 p-8 rounded-t-lg">
                      <Image width={300} height={500} className='  ' src="/images/mining-news-button/guineaminingnews.PNG" alt="Guinea Mining News" />
                    </div>
                    <div className="p-2">
                      <h3 className="font-bold">GUINÉE MINING NEWS</h3>
                    
                    </div>
                  </div>
                </Link>
                <div className=" flex lg:flex-wrap justify-between px-2 w-[100%] "> 
                  
                  <div className='w-[23%] h-[50px]'>
                      <Link href="/news/bf" className='w-[100%] md:w-[200px] lg:w-[250px]'>
                      <div className=" hover:shadow-lg bg-gray-100 transition-shadow rounded-lg
                        w-[100%] duration-300 ease-in-out text-xs">
                        <div className="relative bg-black/90 p-1 rounded-md">
                          <Image width={300} height={500} className=' w-[100%] h-[100%] ' src="/images/mining-news-button/bkminingnews.PNG" alt="Burkina Faso Mining News" />
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className='w-[23%] h-[50px]'>
                      <Link href="/news/ne" className='w-[100%] md:w-[200px] lg:w-[250px]'>  
                      <div className=" hover:shadow-lg bg-gray-100 transition-shadow rounded-lg
                        w-[100%] duration-300 ease-in-out text-xs">
                        <div className="relative bg-black/90 p-1 rounded-md">
                          <Image width={300} height={500} className=' w-[100%] h-[100%] ' src="/images/mining-news-button/nigerminingnews.png" alt="Niger Mining News" />
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className='w-[23%] h-[50px]'>
                      <Link href="/news/ml" className='w-[100%] md:w-[200px] lg:w-[250px]'>  
                      <div className=" hover:shadow-lg bg-gray-100 transition-shadow rounded-lg
                        w-[100%] duration-300 ease-in-out  text-xs">
                        <div className="relative bg-black/90 p-1 rounded-lg">
                          <Image width={300} height={500} className=' w-[100%] h-[100%]' src="/images/mining-news-button/maliminingnews.PNG" alt="Guinea Mining News" />
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className='w-[23%] h-[80px]'>
                    <Link href="/news/ci" className='w-[100%] md:w-[200px] lg:w-[250px]'>
                      <div className=" hover:shadow-lg bg-gray-100 transition-shadow rounded-lg
                         duration-300 ease-in-out  text-xs w-[100%]">
                        <div className="relative bg-black/90 p-1 rounded-lg">
                          <Image width={300} height={500} className=' h-[100%] w-[100%]' src="/images/mining-news-button/ciminingnews.PNG" alt="Cote Ivoire Mining News" />
                        </div>
                      </div>
                    </Link>
                  </div> 
                </div>
              </div>
              <div>
                <Link href="/news/bf" className='w-[50%] md:w-[200px] lg:w-[250px]'>
                  <div className=" hover:shadow-lg bg-gray-100 transition-shadow rounded-lg duration-300 ease-in-out  m-2 text-xs">
                    <div className="relative bg-black/90 p-8 rounded-t-lg">
                      <Image width={300} height={500} className='  ' src="/images/mining-news-button/bkminingnews.PNG" alt="Burkina Faso Mining News" />
                    </div>
                    <div className="p-2">
                      <h3 className="font-bold">BURKINA MINING NEWS</h3>
                    
                    </div>
                  </div>
                </Link>
                <div className=" flex lg:flex-wrap justify-between px-2 w-[100%] "> 
                  <div className='w-[23%] h-[50px]'>
                      <Link href="/news/ne" className='w-[100%] md:w-[200px] lg:w-[250px]'>  
                      <div className=" hover:shadow-lg bg-gray-100 transition-shadow rounded-lg
                        w-[100%] duration-300 ease-in-out text-xs">
                        <div className="relative bg-black/90 p-1 rounded-md">
                          <Image width={300} height={500} className=' w-[100%] h-[100%] ' src="/images/mining-news-button/nigerminingnews.png" alt="Niger Mining News" />
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className='w-[23%] h-[80px]'>
                    <Link href="/news/ci" className='w-[100%] md:w-[200px] lg:w-[250px]'>
                      <div className=" hover:shadow-lg bg-gray-100 transition-shadow rounded-lg
                         duration-300 ease-in-out  text-xs w-[100%]">
                        <div className="relative bg-black/90 p-1 rounded-lg">
                          <Image width={300} height={500} className=' h-[100%] w-[100%]' src="/images/mining-news-button/ciminingnews.PNG" alt="Cote Ivoire Mining News" />
                        </div>
                      </div>
                    </Link>
                  </div> 
                  <div className='w-[23%] h-[50px]'>
                      <Link href="/news/gn" className='w-[100%] md:w-[200px] lg:w-[250px]'>  
                      <div className=" hover:shadow-lg bg-gray-100 transition-shadow rounded-lg
                        w-[100%] duration-300 ease-in-out  text-xs">
                        <div className="relative bg-black/90 p-1 rounded-lg">
                          <Image width={300} height={500} className=' w-[100%] h-[100%]' src="/images/mining-news-button/guineaminingnews.PNG" alt="Guinea Mining News" />
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className='w-[23%] h-[50px]'>
                      <Link href="/news/ml" className='w-[100%] md:w-[200px] lg:w-[250px]'>
                      <div className=" hover:shadow-lg bg-gray-100 transition-shadow rounded-lg
                        w-[100%] duration-300 ease-in-out text-xs">
                        <div className="relative bg-black/90 p-1 rounded-md">
                          <Image width={300} height={500} className=' w-[100%] h-[100%] ' src="/images/mining-news-button/maliminingnews.PNG" alt="Burkina Faso Mining News" />
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
              <div>
                <Link href="/news/ne" className='w-[50%] md:w-[200px] lg:w-[250px]'>  
                  <div className=" hover:shadow-lg bg-gray-100 transition-shadow rounded-lg duration-300 ease-in-out  m-2 text-xs">
                    <div className="relative bg-black/90 p-8 rounded-t-lg">
                      <Image width={300} height={500} className='  ' src="/images/mining-news-button/nigerminingnews.png" alt="Niger Mining News" />
                    </div>
                    <div className="p-2">
                      <h3 className="font-bold">NIGER MINING NEWS</h3>
                    
                    </div>
                  </div>
                </Link>
                <div className=" flex lg:flex-wrap justify-between px-2 w-[100%] "> 
                  
                  <div className='w-[23%] h-[50px]'>
                      <Link href="/news/ml" className='w-[100%] md:w-[200px] lg:w-[250px]'>  
                      <div className=" hover:shadow-lg bg-gray-100 transition-shadow rounded-lg
                        w-[100%] duration-300 ease-in-out text-xs">
                        <div className="relative bg-black/90 p-1 rounded-md">
                          <Image width={300} height={500} className=' w-[100%] h-[100%] ' src="/images/mining-news-button/maliminingnews.PNG" alt="Niger Mining News" />
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className='w-[23%] h-[80px]'>
                    <Link href="/news/ci" className='w-[100%] md:w-[200px] lg:w-[250px]'>
                      <div className=" hover:shadow-lg bg-gray-100 transition-shadow rounded-lg
                         duration-300 ease-in-out  text-xs w-[100%]">
                        <div className="relative bg-black/90 p-1 rounded-lg">
                          <Image width={300} height={500} className=' h-[100%] w-[100%]' src="/images/mining-news-button/ciminingnews.PNG" alt="Cote Ivoire Mining News" />
                        </div>
                      </div>
                    </Link>
                  </div> 
                  <div className='w-[23%] h-[50px]'>
                      <Link href="/news/gn" className='w-[100%] md:w-[200px] lg:w-[250px]'>  
                      <div className=" hover:shadow-lg bg-gray-100 transition-shadow rounded-lg
                        w-[100%] duration-300 ease-in-out  text-xs">
                        <div className="relative bg-black/90 p-1 rounded-lg">
                          <Image width={300} height={500} className=' w-[100%] h-[100%]' src="/images/mining-news-button/guineaminingnews.PNG" alt="Guinea Mining News" />
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className='w-[23%] h-[50px]'>
                      <Link href="/news/bf" className='w-[100%] md:w-[200px] lg:w-[250px]'>
                      <div className=" hover:shadow-lg bg-gray-100 transition-shadow rounded-lg
                        w-[100%] duration-300 ease-in-out text-xs">
                        <div className="relative bg-black/90 p-1 rounded-md">
                          <Image width={300} height={500} className=' w-[100%] h-[100%] ' src="/images/mining-news-button/bkminingnews.PNG" alt="Burkina Faso Mining News" />
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </Carousel> 
          </div>
          <div className=" lg:flex lg:flex-wrap p-1 justify-between text-sm text-center hidden "> 
            <div><Link href="/news/ml" className='w-[50%] md:w-[200px] lg:w-[250px]'>
              <div className=" hover:shadow-lg bg-gray-100 transition-shadow rounded-lg duration-300 ease-in-out  m-2 text-xs">
                <div className="relative bg-black/90 p-8 rounded-t-lg">
                  <Image width={300} height={500} className='  ' src="/images/mining-news-button/maliminingnews.PNG" alt="Mali News" />
                </div>
                <div className="p-2">
                  <h3 className="font-bold">MALI MINING NEWS</h3>
                 
                </div>
              </div>
            </Link></div>
            <div><Link href="/news/ci" className='w-[50%] md:w-[200px] lg:w-[250px]'>

              <div className=" hover:shadow-lg bg-gray-100 transition-shadow rounded-lg duration-300 ease-in-out  m-2 text-xs">
                <div className="relative bg-black/90 p-8 rounded-t-lg">
                  <Image width={300} height={500} className='  ' src="/images/mining-news-button/ciminingnews.PNG" alt="Cote Ivoire Mining News" />
                </div>
                <div className="p-2">
                  <h3 className="font-bold">COTE D&apos;IVOIRE MINING NEWS</h3>
                 
                </div>
              </div>
            </Link></div> 
            <div><Link href="/news/gn" className='w-[50%] md:w-[200px] lg:w-[250px]'>  
              <div className=" hover:shadow-lg bg-gray-100 transition-shadow rounded-lg duration-300 ease-in-out  m-2 text-xs">
                <div className="relative bg-black/90 p-8 rounded-t-lg">
                  <Image width={300} height={500} className='  ' src="/images/mining-news-button/guineaminingnews.PNG" alt="Guinea Mining News" />
                </div>
                <div className="p-2">
                  <h3 className="font-bold">GUINÉE MINING NEWS</h3>
                 
                </div>
              </div>
            </Link></div>
            <div><Link href="/news/bf" className='w-[50%] md:w-[200px] lg:w-[250px]'>
              <div className=" hover:shadow-lg bg-gray-100 transition-shadow rounded-lg duration-300 ease-in-out  m-2 text-xs">
                <div className="relative bg-black/90 p-8 rounded-t-lg">
                  <Image width={300} height={500} className='  ' src="/images/mining-news-button/bkminingnews.PNG" alt="Burkina Faso Mining News" />
                </div>
                <div className="p-2">
                  <h3 className="font-bold">BURKINA MINING NEWS</h3>
                 
                </div>
              </div>
            </Link></div>
            <div><Link href="/news/ne" className='w-[50%] md:w-[200px] lg:w-[250px]'>  
              <div className=" hover:shadow-lg bg-gray-100 transition-shadow rounded-lg duration-300 ease-in-out  m-2 text-xs">
                <div className="relative bg-black/90 p-8 rounded-t-lg">
                  <Image width={300} height={500} className='  ' src="/images/mining-news-button/nigerminingnews.png" alt="Niger Mining News" />
                </div>
                <div className="p-2">
                  <h3 className="font-bold">NIGER MINING NEWS</h3>
                 
                </div>
              </div>
            </Link></div>
          </div>
        </div>
      </div>
  );
}

export default MiningNewsSection;