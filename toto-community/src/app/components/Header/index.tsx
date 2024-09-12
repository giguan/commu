"use client"

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white text-black fixed top-0 left-0 w-full z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* 로고 */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-3xl font-bold text-sub-green">
              # # # #
            </Link>
          </div>

          {/* 네비게이션 링크 (웹용) */}
          <div className="hidden md:flex space-x-6">
            <Link href="/features" className="text-lg font-medium font-semibold text-black hover:text-primary-main">
                #1
            </Link>
            <Link href="/customers" className="text-lg font-medium font-semibold text-black hover:text-primary-main">
                #2
            </Link>
            <Link href="/themes" className="text-lg font-medium font-semibold text-black hover:text-primary-main">
                스포츠분석
            </Link>
            <Link href="/community" className="text-lg font-medium font-semibold text-black hover:text-primary-main">
                커뮤니티
            </Link>
            <Link href="/bookmark" className="text-lg font-medium font-semibold text-black hover:text-primary-main">
                #5
            </Link>
            <Link href="community" className="text-lg font-medium font-semibold text-black hover:text-primary-main">
                #6
            </Link>
            <Link href="/blog" className="text-lg font-medium font-semibold text-black hover:text-primary-main">
                #70
            </Link>
          </div>

          {/* 모바일 메뉴 버튼 */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-black hover:text-primary-main focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-main"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
                />
              </svg>
            </button>
          </div>
        </div>

        {/* 모바일 메뉴 */}
        {isOpen && (
          <div className="md:hidden bg-white text-black shadow-lg">
            <nav className="space-y-1 px-4 py-2">
              <Link href="/features" className="block text-lg font-medium text-black hover:bg-gray-100 rounded-md px-3 py-2">
                #1
              </Link>
              <Link href="/customers" className="block text-lg font-medium text-black hover:bg-gray-100 rounded-md px-3 py-2">
                #2
              </Link>
              <Link href="/themes" className="block text-lg font-medium text-black hover:bg-gray-100 rounded-md px-3 py-2">
                #3
              </Link>
              <Link href="/plugins" className="block text-lg font-medium text-black hover:bg-gray-100 rounded-md px-3 py-2">
                #4
              </Link>
              <Link href="/pricing" className="block text-lg font-medium text-black hover:bg-gray-100 rounded-md px-3 py-2">
                #5
              </Link>
              <Link href="/community" className="block text-lg font-medium text-black hover:bg-gray-100 rounded-md px-3 py-2">
                #6
              </Link>
              <Link href="/blog" className="block text-lg font-medium text-black hover:bg-gray-100 rounded-md px-3 py-2">
                #7
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
