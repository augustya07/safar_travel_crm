'use client'

import { useState } from 'react'
import Image from 'next/image'
import { HiSearch, HiPlus, HiQuestionMarkCircle, HiBell, HiChat } from 'react-icons/hi'

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <header className="fixed top-0 right-0 left-0 md:left-64 h-16 bg-white border-b border-gray-200 px-4 flex items-center justify-between z-10">
      <div className="flex items-center flex-1 max-w-2xl">
        {/* Mobile Menu Button */}
        <button className="md:hidden mr-4">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Search Bar */}
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <HiSearch className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg 
                     focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Add New Button */}
        <button className="ml-4 p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          <HiPlus className="h-5 w-5" />
        </button>
      </div>

      {/* Right Side Icons */}
      <div className="flex items-center gap-4 ml-4">
        {/* Help */}
        <button className="p-2 text-gray-500 hover:text-gray-700">
          <div className="flex items-center gap-1">
            <HiQuestionMarkCircle className="h-5 w-5" />
            <span className="hidden md:inline">Help</span>
          </div>
        </button>

        {/* Notifications */}
        <button className="p-2 text-gray-500 hover:text-gray-700 relative">
          <HiBell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Messages */}
        <button className="p-2 text-gray-500 hover:text-gray-700">
          <HiChat className="h-5 w-5" />
        </button>

        {/* Profile */}
        <button className="flex items-center gap-2">
          <div className="relative w-8 h-8 rounded-full overflow-hidden">
            <Image
              src="/avatar.jpg" // Make sure to add your avatar image
              alt="Profile"
              fill
              className="object-cover"
            />
          </div>
          <span className="hidden md:inline text-sm font-medium">My Account</span>
        </button>
      </div>
    </header>
  )
}

export default Header