import ArticleManagerPage from '../professionals/articles/page'
import React from 'react'
import NavbarProfile from '../navbarProfiles'

const EmployeePage = () => {
  return (
    <div>
      <div className='p-4 flex flex-col'>
        <div className="mt-6 p-1 w-[100%] bg-gray-200/30 text-xs py-2 rounded-lg flex overflow-x-auto">
          {/* Example categories, adjust as needed */}
          <div className="min-w-[76px] h-[88px] shadow-lg border-[1px] flex flex-col items-center justify-between p-[4px] rounded mx-2">
            <div className="h-[60px] w-[100%] bg-gray-200 rounded"></div> articles
          </div>
          <div className="min-w-[76px] h-[88px] shadow-lg border-[1px] flex flex-col items-center justify-between p-[4px] rounded mx-2">
            <div className="h-[60px] w-[100%] bg-gray-200 rounded"></div> Magazines
          </div>
          <div className="min-w-[76px] h-[88px] shadow-lg border-[1px] flex flex-col items-center justify-between p-[4px] rounded mx-2">
            <div className="h-[60px] w-[100%] bg-gray-200 rounded"></div> podcasts
          </div>
          <div className="min-w-[76px] h-[88px] shadow-lg border-[1px] flex flex-col items-center justify-between p-[4px] rounded mx-2">
            <div className="h-[60px] w-[100%] bg-gray-200 rounded"></div> Emmissions
          </div>
          <div className="min-w-[76px] h-[88px] shadow-lg border-[1px] flex flex-col items-center justify-between p-[4px] rounded mx-2">
            <div className="h-[60px] w-[100%] bg-gray-200 rounded"></div> Events
          </div>
          {/* Add more categories as needed */}
        </div>
      </div>
      <NavbarProfile />
      <ArticleManagerPage />
    </div>
  )
}

export default EmployeePage