import React from 'react'
import { Carousel } from "antd";  // Import Carousel from antd
import Image from "next/image";

const ServiceSection = () => {
  return (
    <div>
      <div className="my-3 w-[100%]  rounded-lg  
         lg:hidden">
          {/* Hero Section with Ant Design Carousel */}
          <Carousel autoplay>
            <div className=''>
              
              <Image src="/images/service1.jpg" alt="Service 1" width={1000} height={500}
              className="rounded-t-lg" />
              <div className="h-[28px] w-[100%] bg-yellow-500 rounded-b-lg"></div>
            </div>
            <div className=''>
              
              <Image src="/images/service2.jpg" alt="Service 2" width={1000} height={500} 
              className="rounded-t-lg" />
              <div className="h-[28px] w-[100%] bg-yellow-500 rounded-b-lg"></div>
            </div>
            <div className=''>
              
              <Image src="/images/service3.jpg" alt="Service 3" width={1000} height={500} 
              className="rounded-t-lg" />
              <div className="h-[28px] w-[100%] bg-yellow-500 rounded-b-lg"></div>
            </div>
            <div className=''>
              
              <Image src="/images/service4.jpg" alt="Service 4" width={1000} height={500} 
              className="rounded-t-lg" />
              <div className="h-[28px] w-[100%] bg-yellow-500 rounded-b-lg"></div>
            </div>
            <div className=''>
              
              <Image src="/images/service4.jpg" alt="Service 5" width={1000} height={500} 
              className="rounded-t-lg" />
              <div className="h-[28px] w-[100%] bg-yellow-500 rounded-b-lg"></div>
            </div>
            <div className=''>
              
              <Image src="/images/service4.jpg" alt="Service 6" width={1000} height={500} 
              className="rounded-t-lg" />
              <div className="h-[28px] w-[100%] bg-yellow-500 rounded-b-lg"></div>
            </div>
          </Carousel> 
        </div>
        <div className="my-3 py-2 border-2 border-black bg-gray-200 w-[100%] rounded-xl p-1 hidden
         lg:flex lg:flex-wrap lg:justify-around">
          {/* Hero Section with Ant Design Carousel */}
            <div className="w-[32%] my-2 ">              
              <Image src="/images/service1.jpg" alt="Service 1" width={1000} height={500} 
              className="rounded-t-lg" />
              <div className="h-[28px] w-[100%] bg-yellow-500 rounded-b-lg"></div>
            </div>
            <div className="w-[32%] my-2 ">              
              <Image src="/images/service2.jpg" alt="Service 2" width={1000} height={500} 
              className="rounded-t-lg" />
              <div className="h-[28px] w-[100%] bg-yellow-500 rounded-b-lg"></div>
            </div>
            <div className="w-[32%] my-2 ">              
              <Image src="/images/service3.jpg" alt="Service 3" width={1000} height={500} 
              className="rounded-t-lg" />
              <div className="h-[28px] w-[100%] bg-yellow-500 rounded-b-lg"></div>
            </div>
            <div className="w-[32%] my-2 ">              
              <Image src="/images/service4.jpg" alt="Service 4" width={1000} height={500} 
              className="rounded-t-lg" />
              <div className="h-[28px] w-[100%] bg-yellow-500 rounded-b-lg"></div>
            </div>
            <div className="w-[32%] my-2 ">              
              <Image src="/images/service5.jpg" alt="Service 5" width={1000} height={500} 
              className="rounded-t-lg" />
              <div className="h-[28px] w-[100%] bg-yellow-500 rounded-b-lg"></div>
            </div>
            <div className="w-[32%] my-4 ">              
              <Image src="/images/service6.jpg" alt="Service 6" width={1000} height={500} 
              className="rounded-t-lg" />
              <div className="h-[28px] w-[100%] bg-yellow-500 rounded-b-lg"></div>
            </div>
        </div>
    </div>
  )
}

export default ServiceSection
