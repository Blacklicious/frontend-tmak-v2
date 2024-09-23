'use client';
import ArticlePage from './articles-board/page'
import React, { useState } from 'react'
import NavbarProfile from '../navbarProfiles'
import ManagersNavbar from './navbarManagers'
import Navbar from '@/components/Navbar'

const EmployeePage = () => {
  const [locale, setLocale] = useState<string>('en')
  return (
    <div className='bg-gray-100'>
      <Navbar locale={locale} setLocale={setLocale} /> {/* Pass locale and setLocale */}
      <div className='p-4 flex flex-col'>
        < ManagersNavbar />
      </div>
      <NavbarProfile />
    </div>
  )
}

export default EmployeePage