'use client'

import { useState } from 'react'
import Link from 'next/link'
import { navLinks } from './nav-links'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { HiChevronDown, HiChevronUp } from 'react-icons/hi'

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>(['setup'])
  const pathname = usePathname()

  const toggleExpanded = (href: string) => {
    setExpandedItems(prev => 
      prev.includes(href) 
        ? prev.filter(item => item !== href)
        : [...prev, href]
    )
  }

  const isLinkActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/')
  }

  return (
    <>
      <button 
        className="md:hidden fixed top-4 left-4 z-20"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <aside className={`
        fixed left-0 top-0 h-screen w-64 bg-[#1C1C1C] text-gray-300 p-4
        transform transition-transform duration-200 ease-in-out
        md:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center gap-2 mb-8 px-2">
          <Image
            src="/logo.png" 
            alt="Safar Wanderlust"
            width={32}
            height={32}
          />
          <span className="text-white font-semibold">Safar Wanderlust</span>
        </div>

        <nav>
          <ul className="space-y-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                {link.subItems ? (
                  <div>
                    <button
                      onClick={() => toggleExpanded(link.href)}
                      className={`w-full flex items-center justify-between p-2 rounded-lg
                        ${isLinkActive(link.href) ? 'bg-indigo-600 text-white' : 'hover:bg-gray-800'}`}
                    >
                      <div className="flex items-center gap-3">
                        <link.icon className="w-5 h-5" />
                        <span>{link.label}</span>
                      </div>
                      {expandedItems.includes(link.href) ? (
                        <HiChevronUp className="w-5 h-5" />
                      ) : (
                        <HiChevronDown className="w-5 h-5" />
                      )}
                    </button>
                    {expandedItems.includes(link.href) && (
                      <ul className="ml-4 mt-1 space-y-1">
                        {link.subItems.map((subItem) => (
                          <li key={subItem.href}>
                            <Link
                              href={subItem.href}
                              className={`flex items-center gap-3 p-2 rounded-lg
                                ${isLinkActive(subItem.href) ? 'bg-gray-700 text-white' : 'hover:bg-gray-800'}`}
                            >
                              <subItem.icon className="w-5 h-5" />
                              <span>{subItem.label}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    className={`flex items-center gap-3 p-2 rounded-lg
                      ${isLinkActive(link.href) ? 'bg-indigo-600 text-white' : 'hover:bg-gray-800'}`}
                  >
                    <link.icon className="w-5 h-5" />
                    <span>{link.label}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  )
}

export default Sidebar